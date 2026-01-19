// Simple form handling
document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                subject: this.querySelectorAll('input[type="text"]')[1].value,
                message: this.querySelector('textarea').value
            };

            // Validate
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showMessage('Please fill all required fields', 'error');
                return;
            }

            // Button loading state
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // ✅ REAL EMAIL SENDING USING EMAILJS
            emailjs.send(
                "service_jer260t",
                "template_5ozf4gp",
                {
                    name: formData.name,
                    email: formData.email,
                    subject: formData.subject,
                    message: formData.message
                }
            ).then(() => {
                showMessage('Message sent successfully! I will respond soon.', 'success');
                form.reset();
            }).catch((error) => {
                showMessage('Failed to send message. Please try again.', 'error');
                console.error('EmailJS Error:', error);
            }).finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
        });
    }

    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.style.color = type === 'success' ? 'green' : 'red';

        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    }

    // Smooth scrolling
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

});




