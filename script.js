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
// CAROUSEL FUNCTIONALITY WITH SLIDER
// ===========================
class CarouselSlider {
    constructor(carouselSelector) {
        this.carousel = document.querySelector(carouselSelector);
        this.isMobile = window.innerWidth <= 768;
        this.init();
    }

    init() {
        if (!this.carousel) return;

        // Add touch swipe functionality for mobile
        if (this.isMobile) {
            let touchStartX = 0;
            let touchEndX = 0;

            this.carousel.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, false);

            this.carousel.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe(touchStartX, touchEndX);
            }, false);
        }

        // Handle resize
        window.addEventListener('resize', () => {
            this.isMobile = window.innerWidth <= 768;
        });
    }

    handleSwipe(startX, endX) {
        const diff = startX - endX;
        const threshold = 50;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                // Swipe left - scroll right
                this.carousel.scrollBy({
                    left: 300,
                    behavior: 'smooth'
                });
            } else {
                // Swipe right - scroll left
                this.carousel.scrollBy({
                    left: -300,
                    behavior: 'smooth'
                });
            }
        }
    }
}

// Initialize carousels with slider
new CarouselSlider('.testimonial-carousel');
new CarouselSlider('.wisdom-carousel');

// ===========================
// VIDEO TESTIMONIAL SLIDER
// ===========================
class VideoSlider {
    constructor(carouselSelector, prevBtnSelector, nextBtnSelector, dotsContainerSelector) {
        this.carousel = document.querySelector(carouselSelector);
        this.prevBtn = document.querySelector(prevBtnSelector);
        this.nextBtn = document.querySelector(nextBtnSelector);
        this.dotsContainer = document.querySelector(dotsContainerSelector);
        this.currentIndex = 0;
        
        console.log("[v0] VideoSlider initializing...");
        console.log("[v0] Carousel found:", !!this.carousel);
        console.log("[v0] Prev button found:", !!this.prevBtn);
        console.log("[v0] Next button found:", !!this.nextBtn);
        console.log("[v0] Dots container found:", !!this.dotsContainer);
        
        if (!this.carousel) {
            console.log("[v0] Carousel not found!");
            return;
        }
        
        this.items = this.carousel.querySelectorAll('.testimonial-item');
        this.itemCount = this.items.length;
        console.log("[v0] Found", this.itemCount, "testimonial items");
        this.init();
    }

    init() {
        // Create dots
        this.createDots();
        console.log("[v0] Dots created:", this.dots?.length);
        
        // Add event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                console.log("[v0] Previous button clicked");
                this.previousSlide();
            });
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                console.log("[v0] Next button clicked");
                this.nextSlide();
            });
        }
        
        // Update active dot on scroll
        this.carousel.addEventListener('scroll', () => this.updateActiveDot());
        
        // Set initial active dot
        this.updateActiveDot();
        console.log("[v0] VideoSlider initialized successfully");
    }

    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.itemCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
        this.dots = this.dotsContainer.querySelectorAll('.dot');
    }

    nextSlide() {
        const itemWidth = this.items[0].offsetWidth + 32; // width + gap
        this.carousel.scrollBy({
            left: itemWidth,
            behavior: 'smooth'
        });
    }

    previousSlide() {
        const itemWidth = this.items[0].offsetWidth + 32; // width + gap
        this.carousel.scrollBy({
            left: -itemWidth,
            behavior: 'smooth'
        });
    }

    goToSlide(index) {
        if (index < 0 || index >= this.itemCount) return;
        const itemWidth = this.items[0].offsetWidth + 32; // width + gap
        this.carousel.scrollLeft = index * itemWidth;
    }

    updateActiveDot() {
        const itemWidth = this.items[0].offsetWidth + 32;
        const scrollLeft = this.carousel.scrollLeft;
        this.currentIndex = Math.round(scrollLeft / itemWidth);
        
        if (this.currentIndex >= this.itemCount) {
            this.currentIndex = this.itemCount - 1;
        }
        
        if (this.dots) {
            this.dots.forEach(dot => dot.classList.remove('active'));
            if (this.dots[this.currentIndex]) {
                this.dots[this.currentIndex].classList.add('active');
            }
        }
    }
}

// Initialize video sliders
new VideoSlider('#testimonialCarousel', '#prevBtn', '#nextBtn', '#sliderDots');
new VideoSlider('#wisdomCarousel', '#prevWisdomBtn', '#nextWisdomBtn', '#wisdomSliderDots');

// ===========================
// IMAGE TESTIMONIALS SLIDER
// ===========================
class ImageSlider {
    constructor(carouselSelector, prevBtnSelector, nextBtnSelector, dotsContainerSelector) {
        this.carousel = document.querySelector(carouselSelector);
        this.prevBtn = document.querySelector(prevBtnSelector);
        this.nextBtn = document.querySelector(nextBtnSelector);
        this.dotsContainer = document.querySelector(dotsContainerSelector);
        this.currentIndex = 0;
        
        if (!this.carousel) return;
        
        this.items = this.carousel.querySelectorAll('.image-testimonial-item');
        this.itemCount = this.items.length;
        this.init();
    }

    init() {
        // Create dots
        this.createDots();
        
        // Add event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Update active dot on scroll
        this.carousel.addEventListener('scroll', () => this.updateActiveDot());
        
        // Set initial active dot
        this.updateActiveDot();
    }

    createDots() {
        if (!this.dotsContainer) return;
        
        this.dotsContainer.innerHTML = '';
        for (let i = 0; i < this.itemCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            this.dotsContainer.appendChild(dot);
        }
        this.dots = this.dotsContainer.querySelectorAll('.dot');
    }

    nextSlide() {
        const itemWidth = this.items[0].offsetWidth + 32; // width + gap
        this.carousel.scrollBy({
            left: itemWidth,
            behavior: 'smooth'
        });
    }

    previousSlide() {
        const itemWidth = this.items[0].offsetWidth + 32; // width + gap
        this.carousel.scrollBy({
            left: -itemWidth,
            behavior: 'smooth'
        });
    }

    goToSlide(index) {
        if (index < 0 || index >= this.itemCount) return;
        const itemWidth = this.items[0].offsetWidth + 32; // width + gap
        this.carousel.scrollLeft = index * itemWidth;
    }

    updateActiveDot() {
        const itemWidth = this.items[0].offsetWidth + 32;
        const scrollLeft = this.carousel.scrollLeft;
        this.currentIndex = Math.round(scrollLeft / itemWidth);
        
        if (this.currentIndex >= this.itemCount) {
            this.currentIndex = this.itemCount - 1;
        }
        
        if (this.dots) {
            this.dots.forEach(dot => dot.classList.remove('active'));
            if (this.dots[this.currentIndex]) {
                this.dots[this.currentIndex].classList.add('active');
            }
        }
    }
}

// Initialize image slider
new ImageSlider('#imageTestimonialCarousel', '#prevImageBtn', '#nextImageBtn', '#imageSliderDots');

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
// FAQs ACCORDION
// ===========================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        // Close other open FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current FAQ
        item.classList.toggle('active');
    });
});

// ===========================
// INITIALIZATION
// ===========================
console.log('[Balaji Dental Clinic] Website loaded successfully');
