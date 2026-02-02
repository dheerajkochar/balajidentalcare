// ===========================
// MOBILE MENU TOGGLE
// ===========================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===========================
// SMOOTH SCROLLING & ACTIVE NAV
// ===========================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===========================
// CONTACT FORM HANDLING
// ===========================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Validate
        if (!name || !email || !message) {
            alert('Please fill in all required fields');
            return;
        }

        // Success message
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// ===========================
// CTA BUTTON SCROLL
// ===========================
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        if (button.textContent.includes('Appointment')) {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===========================
// LAZY LOADING IMAGES
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// CAROUSEL FUNCTIONALITY
// ===========================
class SimpleCarousel {
    constructor(carouselClass) {
        this.carousel = document.querySelector(carouselClass);
        this.items = this.carousel?.querySelectorAll('.testimonial-item, .wisdom-item');
        this.currentIndex = 0;
        this.init();
    }

    init() {
        if (!this.items || this.items.length === 0) return;

        // Hide all but first item on mobile
        if (window.innerWidth <= 768) {
            this.items.forEach((item, index) => {
                item.style.display = index === 0 ? 'block' : 'none';
            });
        }

        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.items.forEach(item => item.style.display = 'block');
            }
        });
    }
}

// Initialize carousels
new SimpleCarousel('.testimonial-carousel');
new SimpleCarousel('.wisdom-carousel');

// ===========================
// ANIMATION ON SCROLL
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .blog-card, .team-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
// Defer non-critical loads
document.addEventListener('DOMContentLoaded', () => {
    // Preload critical images
    const criticalImages = document.querySelectorAll('img[data-critical]');
    criticalImages.forEach(img => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = img.src;
        document.head.appendChild(link);
    });
});

// ===========================
// ACCESSIBILITY
// ===========================
// Keyboard navigation for modals/dialogs
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
    }
});

// ===========================
// FORM VALIDATION
// ===========================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add real-time validation
const emailInput = document.querySelector('input[type="email"]');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        if (emailInput.value && !validateEmail(emailInput.value)) {
            emailInput.style.borderColor = 'red';
        } else {
            emailInput.style.borderColor = 'inherit';
        }
    });
}

// ===========================
// SERVICE COUNTER
// ===========================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===========================
// PRINT OPTIMIZATION
// ===========================
const style = document.createElement('style');
style.textContent = `
    @media print {
        nav, .contact-form, .cta-button { display: none; }
        section { page-break-inside: avoid; }
    }
`;
document.head.appendChild(style);

// ===========================
// INITIALIZATION
// ===========================
console.log('[Balaji Dental Clinic] Website loaded successfully');
