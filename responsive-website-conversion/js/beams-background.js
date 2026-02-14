/**
 * Beams Background
 * Ported from shadcn/ui registry (React) to Vanilla JS
 */

(function () {
    class BeamsBackground {
        constructor(containerId, options = {}) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;

            this.canvas = document.createElement('canvas');
            this.canvas.className = 'beams-canvas';
            this.container.appendChild(this.canvas);
            this.ctx = this.canvas.getContext('2d');

            this.beams = [];
            this.intensity = options.intensity || 'strong';
            this.MINIMUM_BEAMS = 20;
            this.animationFrameId = null;

            this.opacityMap = {
                subtle: 0.7,
                medium: 0.85,
                strong: 1,
            };

            this.init();
        }

        createBeam(width, height) {
            const angle = -35 + Math.random() * 10;
            return {
                x: Math.random() * width * 1.5 - width * 0.25,
                y: Math.random() * height * 1.5 - height * 0.25,
                width: 30 + Math.random() * 60,
                length: height * 2.5,
                angle: angle,
                speed: 0.6 + Math.random() * 1.2,
                opacity: 0.12 + Math.random() * 0.16,
                hue: 190 + Math.random() * 70, // Blue/Cyan/Teal range
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.03,
            };
        }

        resetBeam(beam, index, totalBeams) {
            const width = this.canvas.width;
            const height = this.canvas.height;

            const column = index % 3;
            const spacing = width / 3;

            beam.y = height + 100;
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 0.5 + Math.random() * 0.4;
            beam.hue = 190 + (index * 70) / totalBeams;
            beam.opacity = 0.2 + Math.random() * 0.1;
            return beam;
        }

        drawBeam(ctx, beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            // Calculate pulsing opacity
            const pulsingOpacity =
                beam.opacity *
                (0.8 + Math.sin(beam.pulse) * 0.2) *
                this.opacityMap[this.intensity];

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

            // Enhanced gradient with multiple color stops
            gradient.addColorStop(0, `hsla(${beam.hue}, 85%, 65%, 0)`);
            gradient.addColorStop(
                0.1,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`
            );
            gradient.addColorStop(
                0.4,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`
            );
            gradient.addColorStop(
                0.6,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity})`
            );
            gradient.addColorStop(
                0.9,
                `hsla(${beam.hue}, 85%, 65%, ${pulsingOpacity * 0.5})`
            );
            gradient.addColorStop(1, `hsla(${beam.hue}, 85%, 65%, 0)`);

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        updateCanvasSize() {
            const dpr = window.devicePixelRatio || 1;
            // Use window size for hero background primarily
            // Or use container size if specific
            const width = window.innerWidth;
            const height = window.innerHeight; // Hero is usually full screen or large

            this.canvas.width = width * dpr;
            this.canvas.height = height * dpr;
            this.canvas.style.width = `${width}px`;
            this.canvas.style.height = `${height}px`;
            this.ctx.scale(dpr, dpr);

            const totalBeams = this.MINIMUM_BEAMS * 1.5;
            this.beams = Array.from({ length: totalBeams }, () =>
                this.createBeam(this.canvas.width, this.canvas.height)
            );
        }

        animate() {
            if (!this.canvas || !this.ctx) return;

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // Optional: Draw a background or use CSS
            // ctx.filter = "blur(35px)"; // Canvas filter might be heavy, use CSS if possible
            // The React code uses ctx.filter inside animate loop which can be expensive.
            // But let's keep it to be faithful.
            this.ctx.filter = "blur(35px)";

            const totalBeams = this.beams.length;
            this.beams.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                // Reset beam when it goes off screen (beams go UP, so y becomes negative)
                if (beam.y + beam.length < -100) {
                    this.resetBeam(beam, index, totalBeams);
                }

                this.drawBeam(this.ctx, beam);
            });

            this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
        }

        init() {
            this.updateCanvasSize();
            window.addEventListener("resize", this.updateCanvasSize.bind(this));
            this.animate();
        }
    }

    // Expose to window
    window.BeamsBackground = BeamsBackground;

    // Auto-init for Global Background
    document.addEventListener('DOMContentLoaded', () => {
        // Do not init on 404 page (though script shouldn't be there, extra safety)
        if (document.title.includes('404')) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'beams-fixed-background';
        wrapper.style.position = 'fixed';
        wrapper.style.inset = '0';
        wrapper.style.zIndex = '-1'; // Behind everything
        wrapper.style.pointerEvents = 'none';
        wrapper.style.overflow = 'hidden';
        document.body.prepend(wrapper);

        new BeamsBackground('beams-fixed-background');
    });

})();
