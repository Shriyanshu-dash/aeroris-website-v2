/**
 * MOBILE GEOMETRIC BACKGROUND INJECTOR
 * Replicates the "HeroGeometric" React component using Vanilla JS
 */

(function () {
    'use strict';

    // Only run if strict mobile view (match CSS media query)
    // We run on load and resize to ensure it handles orientation changes or drastic resizes
    function initMobileBackground() {
        // Check if already exists
        if (document.querySelector('.mobile-geometric-bg-container')) return;

        // Target the body directly
        const bodyValue = document.body;

        // Create Container
        const container = document.createElement('div');
        container.className = 'mobile-geometric-bg-container';

        // Ensure it's behind everything
        container.style.zIndex = '-9999';

        // 1. Background Blur Layer
        const blurLayer = document.createElement('div');
        blurLayer.className = 'geo-bg-gradient';
        container.appendChild(blurLayer);

        // 2. Shapes Layer (Wrapper for overflow hidden)
        const shapesLayer = document.createElement('div');
        shapesLayer.style.position = 'absolute';
        shapesLayer.style.inset = '0';
        shapesLayer.style.overflow = 'hidden';

        // Shape Configurations (from React component)
        const shapesConfig = [
            {
                width: 600, height: 140, rotate: 12, delay: 0.3,
                color: 'rgba(99, 102, 241, 0.15)', // Indigo
                style: 'left: -10%; top: 15%;'
            },
            {
                width: 500, height: 120, rotate: -15, delay: 0.5,
                color: 'rgba(244, 63, 94, 0.15)', // Rose
                style: 'right: -5%; top: 70%;'
            },
            {
                width: 300, height: 80, rotate: -8, delay: 0.4,
                color: 'rgba(139, 92, 246, 0.15)', // Violet
                style: 'left: 5%; bottom: 5%;'
            },
            {
                width: 200, height: 60, rotate: 20, delay: 0.6,
                color: 'rgba(245, 158, 11, 0.15)', // Amber
                style: 'right: 15%; top: 10%;'
            },
            {
                width: 150, height: 40, rotate: -25, delay: 0.7,
                color: 'rgba(6, 182, 212, 0.15)', // Cyan
                style: 'left: 20%; top: 5%;'
            }
        ];

        // Generate Shapes
        shapesConfig.forEach(config => {
            // Wrapper (Position & Entry Animation)
            const wrapper = document.createElement('div');
            wrapper.className = 'geo-shape-wrapper';
            wrapper.style.cssText = config.style; // Apply positions
            wrapper.style.setProperty('--target-rotate', `${config.rotate}deg`);

            // Animation: fadeInRotate 2.4s ease-custom forwards
            // cubic-bezier(0.23, 0.86, 0.39, 0.96)
            wrapper.style.animation = `geoFadeInRotate 2.4s cubic-bezier(0.23, 0.86, 0.39, 0.96) forwards`;
            wrapper.style.animationDelay = `${config.delay}s`;

            // Inner (Float Animation)
            const inner = document.createElement('div');
            inner.className = 'geo-shape-float';
            inner.style.width = `${config.width}px`;
            inner.style.height = `${config.height}px`;

            // Visual
            const visual = document.createElement('div');
            visual.className = 'geo-shape-visual';
            visual.style.setProperty('--shape-color', config.color);

            // Assemble
            inner.appendChild(visual);
            wrapper.appendChild(inner);
            shapesLayer.appendChild(wrapper);
        });

        container.appendChild(shapesLayer);

        // 3. Overlay Gradient
        const overlay = document.createElement('div');
        overlay.className = 'geo-overlay-gradient';
        container.appendChild(overlay);

        // Inject into Body
        if (document.body.firstChild) {
            document.body.insertBefore(container, document.body.firstChild);
        } else {
            document.body.appendChild(container);
        }

        console.log('✨ Mobile Geometric Background Injected');
    }

    // Run on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileBackground);
    } else {
        initMobileBackground();
    }

})();
