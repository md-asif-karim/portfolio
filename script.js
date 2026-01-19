// Simple form handling
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
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
            
            // Show loading
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending
            setTimeout(() => {
                // In real use, connect to email service here
                console.log('Contact Form Data:', formData);
                console.log('mdasifkarim28th@gmail.com');
                
                // Show success
                showMessage('Message sent successfully! I will respond soon.', 'success');
                
                // Reset form
                form.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
            }, 2000);
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
        link.addEventListener('click', function(e) {
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

