document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handler (prevent default for demo)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn-submit');
            const originalText = btn.textContent;

            btn.textContent = 'Message Sent';
            btn.style.background = 'linear-gradient(135deg, #10B981, #059669)'; // Success Green

            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.style.background = ''; // Revert to defined CSS
            }, 3000);
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    const animatedElements = document.querySelectorAll('.section-title, .step-card, .service-card, .persona-card, .what-we-do p');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = item.querySelector('.accordion-content');

            // Close other items (Optional: remove this block if you want multiple open)
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current
            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });


});


/* Spotlight Navbar Logic */
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('spotlight-nav');
    if (!nav) return;

    const links = nav.querySelectorAll('.spot-nav-link');
    const spotlightLayer = nav.querySelector('.spotlight-layer');

    // State
    let activeIndex = 0;
    let currentAmbienceX = 0;
    let ambienceRaf;

    // Helper: Position Calculation
    const getTargetPosition = (index) => {
        const link = links[index];
        if (!link) return 0;
        const navRect = nav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        return linkRect.left - navRect.left + linkRect.width / 2;
    };

    // Helper: Animate Ambience (Simple Spring)
    const animateAmbience = (targetX) => {
        if (ambienceRaf) cancelAnimationFrame(ambienceRaf);

        const stiffness = 0.12;
        const damping = 0.75;
        let velocity = 0;

        const loop = () => {
            const diff = targetX - currentAmbienceX;
            const acceleration = diff * stiffness;
            velocity += acceleration;
            velocity *= damping;

            currentAmbienceX += velocity;
            nav.style.setProperty('--ambience-x', `${currentAmbienceX}px`);

            if (Math.abs(diff) > 0.1 || Math.abs(velocity) > 0.1) {
                ambienceRaf = requestAnimationFrame(loop);
            } else {
                currentAmbienceX = targetX;
                nav.style.setProperty('--ambience-x', `${targetX}px`);
            }
        };
        loop();
    };

    // Initialize
    const init = () => {
        // Find if any link has active class initially
        links.forEach((link, idx) => {
            if (link.classList.contains('active')) {
                activeIndex = idx;
            }
        });

        const x = getTargetPosition(activeIndex);
        currentAmbienceX = x;
        nav.style.setProperty('--ambience-x', `${currentAmbienceX}px`);
        links[activeIndex].classList.add('active');
    };

    // Wait for layout
    setTimeout(init, 100);
    window.addEventListener('resize', () => {
        const x = getTargetPosition(activeIndex);
        currentAmbienceX = x;
        nav.style.setProperty('--ambience-x', `${x}px`);
    });

    // Event Listeners
    links.forEach((link, idx) => {
        link.addEventListener('click', (e) => {
            // Update active state
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            activeIndex = idx;

            // Animate
            const x = getTargetPosition(idx);
            animateAmbience(x);
        });
    });

    nav.addEventListener('mousemove', (e) => {
        const navRect = nav.getBoundingClientRect();
        const x = e.clientX - navRect.left;
        nav.style.setProperty('--spotlight-x', `${x}px`);
        if (spotlightLayer) spotlightLayer.style.opacity = '1';
    });

    nav.addEventListener('mouseleave', () => {
        if (spotlightLayer) spotlightLayer.style.opacity = '0';
    });
});



/* FlipText Initialization */
document.addEventListener('DOMContentLoaded', () => {
    const flipTarget = document.getElementById('flipTextTarget');
    if (flipTarget && window.FlipText) {
        new FlipText(flipTarget, {
            duration: 4, // Slower
            delay: 0,
            loop: true
        });
    }
});




/* Lamp Effect Initialization (Hero Only) */
document.addEventListener('DOMContentLoaded', () => {
    if (window.LampEffect) {
        // Initialize strictly on the hero section
        const lamp = new LampEffect('.hero-section');
        lamp.init();
    }
});
