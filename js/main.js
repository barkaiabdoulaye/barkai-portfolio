// js/script.js

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Calculator Logic (Loan Repayment Estimator) ---
    const calculateBtn = document.getElementById('calculate-loan');
    const monthlyPaymentSpan = document.getElementById('monthly-payment');
    const calcError = document.getElementById('calc-error');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            // Get input values
            const amount = parseFloat(document.getElementById('loan-amount').value);
            const annualRate = parseFloat(document.getElementById('interest-rate').value);
            const months = parseInt(document.getElementById('loan-months').value);

            // --- Form Validation ---
            calcError.textContent = ''; // Clear previous errors

            if (isNaN(amount) || amount <= 0) {
                calcError.textContent = 'Please enter a valid loan amount (greater than 0).';
                monthlyPaymentSpan.textContent = '--- RWF';
                return;
            }
            if (isNaN(annualRate) || annualRate < 0) {
                calcError.textContent = 'Please enter a valid annual interest rate (0 or greater).';
                monthlyPaymentSpan.textContent = '--- RWF';
                return;
            }
            if (isNaN(months) || months <= 0) {
                calcError.textContent = 'Please enter a valid loan term in months (greater than 0).';
                monthlyPaymentSpan.textContent = '--- RWF';
                return;
            }

            // --- Calculation ---
            // Convert annual rate to monthly rate (as a decimal)
            const monthlyRate = (annualRate / 100) / 12;

            let monthlyPayment;
            if (monthlyRate === 0) {
                // If interest rate is 0, simple division
                monthlyPayment = amount / months;
            } else {
                // Standard loan payment formula: P * (r * (1 + r)^n) / ((1 + r)^n - 1)
                const factor = Math.pow(1 + monthlyRate, months);
                monthlyPayment = amount * (monthlyRate * factor) / (factor - 1);
            }

            // --- DOM Manipulation ---
            if (isFinite(monthlyPayment)) {
                monthlyPaymentSpan.textContent = monthlyPayment.toFixed(2) + ' RWF';
            } else {
                calcError.textContent = 'Calculation error. Please check your inputs.';
                monthlyPaymentSpan.textContent = '--- RWF';
            }
        });
    }

    // --- 2. Additional Interaction: Dark/Light Mode Toggle ---
    // We'll create a simple button in the corner. Add this button to your HTML if not present.
    // Let's add a floating button to the body via JS for simplicity, or you can add it manually in HTML.
    // I'll add it manually in the HTML structure explanation, but we can also create it here.
    // For now, let's check if one exists. If not, we'll create one.
    let darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) {
        // Create the button if it doesn't exist (optional, but good for demonstration)
        darkModeToggle = document.createElement('button');
        darkModeToggle.id = 'dark-mode-toggle';
        darkModeToggle.innerHTML = '🌙 Dark Mode';
        darkModeToggle.style.position = 'fixed';
        darkModeToggle.style.bottom = '20px';
        darkModeToggle.style.right = '20px';
        darkModeToggle.style.zIndex = '1000';
        darkModeToggle.style.padding = '10px 15px';
        darkModeToggle.style.backgroundColor = '#007bff';
        darkModeToggle.style.color = '#fff';
        darkModeToggle.style.border = 'none';
        darkModeToggle.style.borderRadius = '5px';
        darkModeToggle.style.cursor = 'pointer';
        darkModeToggle.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
        document.body.appendChild(darkModeToggle);
    }

    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        // Change button text based on mode
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '☀️ Light Mode';
        } else {
            darkModeToggle.innerHTML = '🌙 Dark Mode';
        }
    });

    // --- 3. Additional Interaction: Mobile Menu Toggle (Hamburger) ---
    const menuToggle = document.getElementById('mobile-menu');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Optional: Change icon from bars to times
            const icon = menuToggle.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked (for better UX)
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- 4. Additional Interaction: Dynamic Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }

    // --- 5. Download CV Button Simulation ---
    const downloadBtn = document.getElementById('download-cv-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent actual download for now
            // In a real project, you'd have an actual PDF file. Here we'll show an alert.
            // You can replace the href with the actual path to your CV PDF, e.g., "cv/Barkai_Abdoulaye_CV.pdf"
            alert('In a production version, this would download my CV PDF. Please check back later or contact me directly.');
        });
    }

    // --- 6. Contact Form Validation (Simple) using FormSubmit ---
    // FormSubmit handles the backend, but we can add front-end validation.
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Basic validation - browser handles 'required' attribute, but we can add custom checks
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');

            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                alert('Please fill in all fields.');
                event.preventDefault(); // Stop submission if fields are empty (though 'required' should catch it)
                return;
            }

            // Simple email format check (optional)
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value)) {
                alert('Please enter a valid email address.');
                event.preventDefault();
                return;
            }

            // If validation passes, FormSubmit will handle the rest.
            // You can add a custom success message.
            alert('Thank you for your message! (This is a simulation - form is configured with FormSubmit.co)');
            // The form will still submit to FormSubmit.
        });
    }

}); // End DOMContentLoaded
