/**
 * Aceternity Lamp Effect
 * Ported from aceternity/lamp (React) to Vanilla JS
 * 
 * Usage:
 * const lamp = new LampEffect('#target-container');
 * lamp.init();
 */

class LampEffect {
    constructor(containerId, options = {}) {
        this.container = document.querySelector(containerId);
        this.options = {
            color: options.color || 'cyan', // 'cyan' or custom hex? (Implementing cyan/indigo classes)
            ...options
        };
    }

    init() {
        if (!this.container) {
            console.error('LampEffect: Container not found');
            return;
        }

        // Add class to container
        this.container.classList.add('lamp-container');

        // create the lamp structure
        const lampWrapper = document.createElement('div');
        lampWrapper.className = 'lamp-wrapper';

        lampWrapper.innerHTML = `
            <div class="lamp-beams-container">
                <!-- Left Beam -->
                <div class="lamp-beam left">
                    <div class="lamp-mask-bottom"></div>
                    <div class="lamp-mask-side"></div>
                </div>
                
                <!-- Right Beam -->
                <div class="lamp-beam right">
                    <div class="lamp-mask-bottom"></div>
                    <div class="lamp-mask-side"></div>
                </div>

                <!-- Glows and Blurs -->
                <div class="lamp-glow-top"></div>
                <div class="lamp-glow-overlay"></div>
                <div class="lamp-glow-orb"></div>
                <div class="lamp-glow-bar-small"></div>
                <div class="lamp-glow-bar-large"></div>
                
                <!-- Dark Overlay/Mask -->
                <div class="lamp-dark-mask"></div>
            </div>
            
            <div class="lamp-content">
                <!-- Content will satisfy children -->
            </div>
        `;

        // Move existing content into lamp-content?
        // Or just prepend lampWrapper?
        // The React component wraps children. 
        // Strategy: Prepend wrapper, and let it sit behind content with z-index.

        this.container.prepend(lampWrapper);

        // Find existing content and ensure it's above?
        // In this implementation, 'lamp-wrapper' is the background.
        // 'lamp-content' allows placing items inside if needed, but for Hero section integration,
        // we likely just want the background effect.
    }
}

// Expose to window
window.LampEffect = LampEffect;
