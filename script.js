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

// Force page to load at top on refresh
window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

// Scroll to top on page load
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

// Add scroll animation for sections
const sections = document.querySelectorAll('section');

const checkSectionVisibility = () => {
    const triggerBottom = window.innerHeight * 0.85;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
            section.classList.add('visible');
        }
    });
};

// Check on scroll and on load
window.addEventListener('scroll', checkSectionVisibility);
window.addEventListener('load', checkSectionVisibility);

// Make hero section immediately visible
document.querySelector('.hero').classList.add('visible');

// Add scroll animation to header
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        header.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScroll) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    }
    
    lastScroll = currentScroll;
});
// Replace the loading button part with this
submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';
submitBtn.style.animation = 'spin 1s linear infinite';
submitBtn.disabled = true;

// In the success callback, add:
submitBtn.style.animation = 'none';
submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
submitBtn.style.background = '#2ecc71';

setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = '';
    submitBtn.disabled = false;
}, 3000);



