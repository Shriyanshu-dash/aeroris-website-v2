document.addEventListener('DOMContentLoaded', () => {
    initInfiniteMarquee();
});

function initInfiniteMarquee() {
    const marqueeRows = document.querySelectorAll('.moving-row-wrapper');
    if (!marqueeRows.length) return;

    // --- Interactive Icons Logic (Magnetic Effect) ---
    const icons = document.querySelectorAll('.interactive-icon-wrapper');

    icons.forEach(wrapper => {
        const iconBox = wrapper.querySelector('.icon-box');

        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Reduced divisor for stronger effect (was /8)
            const deltaX = (e.clientX - centerX) / 5;
            const deltaY = (e.clientY - centerY) / 5;

            // Apply Transform
            iconBox.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.15) rotate(${deltaX > 0 ? 5 : -5}deg)`;
            iconBox.classList.add('hovered');
        });

        wrapper.addEventListener('mouseleave', () => {
            iconBox.style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
            iconBox.classList.remove('hovered');
        });
    });

    // --- Marquee Scrolling Logic ---
    marqueeRows.forEach((rowWrapper) => {
        const row = rowWrapper.querySelector('.moving-row');
        if (!row) return;

        const speed = parseFloat(rowWrapper.dataset.speed) || 20;
        const direction = rowWrapper.dataset.direction || 'left';

        let offset = 0;
        const pixelsPerSecond = 50; // Base speed factor

        let lastTime = performance.now();

        function animate(currentTime) {
            const delta = (currentTime - lastTime) / 1000;
            lastTime = currentTime;

            const movement = delta * speed;

            if (direction === 'right') {
                offset += movement;
            } else {
                offset -= movement;
            }

            // Infinite Loop Logic
            // We need to know the width of one "set" of icons.
            // Since we duplicate the content in JS, we should measure nicely.
            // Simplified: The content is duplicated 4-8 times. 
            // We reset when we have scrolled past 1/Nth of the width if all sets are equal.
            // A safer generic way for arbitrary width:

            const scrollWidth = row.scrollWidth;
            const clientWidth = rowWrapper.clientWidth;

            // If movement is Left (negative offset)
            if (direction === 'left') {
                // If we have scrolled more than half (assuming 2 sets), reset.
                // The prompt logic: Reset when one full set passed. 
                // We will assume the HTML structure has enough duplicates.
                // Let's reset when offset is < -1 * singleSetWidth. 
                // But without explicit "single set" marker, we can rely on total width.
                // Let's rely on the fact we will duplicate content heavily.
                if (Math.abs(offset) >= scrollWidth / 2) {
                    offset = 0;
                }
            } else {
                if (offset >= 0) {
                    offset = -scrollWidth / 2;
                }
            }

            row.style.transform = `translateX(${offset}px)`;

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    });
}
