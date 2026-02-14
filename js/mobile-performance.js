/**
 * MOBILE PERFORMANCE OPTIMIZER - BALANCED VERSION
 * Improves performance without breaking visual design
 */

(function () {
    'use strict';

    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        || window.innerWidth <= 768;

    if (!isMobile) {
        console.log('📱 Desktop detected - Mobile optimizations skipped');
        return;
    }

    console.log('📱 Mobile device detected - Applying balanced optimizations');

    // ===========================================
    // 1. DEBOUNCED SCROLL FOR SMOOTH PERFORMANCE
    // ===========================================

    let scrollTimeout;
    let isScrolling = false;

    const optimizedScroll = () => {
        if (!isScrolling) {
            isScrolling = true;
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 150);
    };

    window.addEventListener('scroll', optimizedScroll, { passive: true });

    // ===========================================
    // 2. THROTTLE RESIZE EVENTS
    // ===========================================

    let resizeTimeout;
    const optimizedResize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            window.dispatchEvent(new Event('optimizedResize'));
        }, 250);
    };

    window.addEventListener('resize', optimizedResize, { passive: true });

    // ===========================================
    // 3. TOUCH DEVICE CLASS
    // ===========================================

    document.addEventListener('touchstart', function () {
        document.body.classList.add('touch-device');
    }, { passive: true, once: true });

    // ===========================================
    // 4. PREVENT DOUBLE-TAP ZOOM ON BUTTONS
    // ===========================================

    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // ===========================================
    // 5. USE CSS CONTAINMENT FOR SECTIONS
    // ===========================================

    document.querySelectorAll('.section, .container').forEach(section => {
        section.style.contain = 'layout style';
    });

    // ===========================================
    // 6. GPU ACCELERATION FOR MOBILE
    // ===========================================

    // Targeted hardware acceleration for smoother sticky elements only
    const stickyElements = document.querySelectorAll('.sticky-card, .navbar');
    stickyElements.forEach(el => {
        el.style.transform = 'translateZ(0)';
        el.style.webkitTransform = 'translateZ(0)';
    });

    console.log('✅ Balanced mobile optimizations applied - Visual design preserved');

})();
