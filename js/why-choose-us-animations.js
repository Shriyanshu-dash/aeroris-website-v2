/* Why Choose Us Animation Logic */
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.wcu-card');

    if (!cards.length) return;

    cards.forEach(card => {
        // Spotlight & Tilt on Mouse Move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set CSS Variables for Spotlight
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            // Calculate Tilt
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Limit rotation to +/- 8deg
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        // Reset on Leave
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // Staggered Entrance Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targets = entry.target.querySelectorAll('.wcu-card');
                targets.forEach((t, index) => {
                    setTimeout(() => {
                        t.classList.add('wcu-visible');
                    }, index * 100); // 100ms stagger
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const grid = document.querySelector('.wcu-grid');
    if (grid) {
        // Initial state
        cards.forEach(c => {
            c.style.opacity = '0';
            c.style.transform = 'translateY(30px)';
            c.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // This transition is overridden by mousemove, handled by class below
        });

        // We need a specific class for the fade-in that doesn't conflict with the tilt
        // Actually, tilt uses inline styles which will override class styles for transform. 
        // We should animate opacity separately or use a wrapper.
        // Better strategy: Animate opacity and Y-translation on the card itself, 
        // but since inline styles for tilt overwrite transform, we'll strip the inline style transition after entrance?
        // Or simply animate opacity.

        // Let's us a keyframe approach for entrance to avoid inline conflict
        // Adding class .wcu-visible to trigger CSS animation

        const style = document.createElement('style');
        style.innerHTML = `
            .wcu-card.wcu-visible {
                animation: wcuFadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            }
            @keyframes wcuFadeUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);

        observer.observe(grid);
    }
});
