document.addEventListener('DOMContentLoaded', function () {
    // Initialize animations
    initAnimations();
    
    // Contact form handling
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

            // Send email using EmailJS
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
                
                // Add success animation
                form.classList.add('success');
                setTimeout(() => form.classList.remove('success'), 2000);
                
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
        if (!formMessage) return;
        
        formMessage.textContent = text;
        formMessage.style.color = type === 'success' ? '#2ecc71' : '#e74c3c';
        formMessage.style.backgroundColor = type === 'success' ? 'rgba(46, 204, 113, 0.1)' : 'rgba(231, 76, 60, 0.1)';
        formMessage.style.border = 1px solid ${type === 'success' ? '#2ecc71' : '#e74c3c'};

        // Auto hide message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.style.backgroundColor = 'transparent';
            formMessage.style.border = 'none';
        }, 5000);
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a, .btn[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Close mobile menu if open
                const navUl = document.querySelector('nav ul');
                if (navUl && navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                }

                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            const navUl = document.querySelector('nav ul');
            navUl.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Initialize animations on scroll
    function initAnimations() {
        // Animate elements on scroll
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add delay animations for children
                    const children = entry.target.querySelectorAll('.animate-text, .animate-badge, .animate-card');
                    children.forEach((child, index) => {
                        child.style.animationDelay = ${index * 0.2}s;
                        child.classList.add('animate__animated', 'animate__fadeInUp');
                    });
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        animateElements.forEach(element => {
            observer.observe(element);
        });

        // Animate section titles
        const sectionTitles = document.querySelectorAll('.section-title, .section-subtitle');
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            threshold: 0.5
        });

        sectionTitles.forEach(title => {
            titleObserver.observe(title);
        });

        // Add hover effects to skill boxes
        const skillBoxes = document.querySelectorAll('.skill-box');
        skillBoxes.forEach(box => {
            box.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            box.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Profile badges interaction
        const profileBadges = document.querySelectorAll('.profile-badge');
        profileBadges.forEach(badge => {
            badge.addEventListener('click', function () {
                const iconClass = this.querySelector('i').className;
                let message = '';
                
                if (iconClass.includes('fa-microchip')) {
                    message = 'Hardware Management Specialist';
                } else if (iconClass.includes('fa-server')) {
                    message = 'Server Administration Expert';
                } else if (iconClass.includes('fa-tools')) {
                    message = 'IT Support Professional';
                }
                
                // Create floating notification
                const notification = document.createElement('div');
                notification.className = 'floating-notification';
                notification.textContent = message;
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #3498db;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 5px;
                    z-index: 10000;
                    animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                `;
                
                document.body.appendChild(notification);
                
                // Remove notification after 3 seconds
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            });
        });
    }

    // Add floating particles for hero section
    function addFloatingParticles() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 10 + 2}px;
                height: ${Math.random() * 10 + 2}px;
                background: rgba(255,255,255,${Math.random() * 0.3});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
                z-index: 0;
            `;
            
            heroSection.appendChild(particle);
        }
        
        // Add particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-100px) translateX(100px);
                }
                50% {
                    transform: translateY(-200px) translateX(0);
                }
                75% {
                    transform: translateY(-100px) translateX(-100px);
                }
                100% {
                    transform: translateY(0) translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize particles
    addFloatingParticles();

// Add typing effect to hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero h1');
    if (!heroTitle) return;
    
    // Save original text
    const originalText = heroTitle.textContent || 'IT Executive';
    let index = 0;
    
    // Clear existing text
    heroTitle.textContent = '';
    
    function typeWriter() {
        if (index < originalText.length) {
            heroTitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Start typing
    typeWriter();
}    // Start typing effect
    setTimeout(initTypingEffect, 1000);
});
