document.addEventListener('DOMContentLoaded', () => {
    initTypeTester();
    initLayoutAnimation();
    initSpeedIndicator();
    initSecurityShields();
});

// 1. Type Tester Animation (Scale AI text)
function initTypeTester() {
    const element = document.getElementById('type-tester-text');
    if (!element) return;

    // Scale toggle every 2s
    setInterval(() => {
        element.classList.toggle('scale-up');
    }, 2000);
}

// 2. Layout Animation (Switch grid columns)
function initLayoutAnimation() {
    const container = document.getElementById('layout-anim-grid');
    if (!container) return;

    const layouts = ['grid-cols-2', 'grid-cols-3', 'grid-cols-1'];
    let currentLayout = 0;

    setInterval(() => {
        // Remove current
        container.classList.remove(layouts[currentLayout]);

        // Next
        currentLayout = (currentLayout + 1) % layouts.length;

        // Add next
        container.classList.add(layouts[currentLayout]);
    }, 2500);
}

// 3. Speed Indicator (Load simulation)
function initSpeedIndicator() {
    const loader = document.getElementById('speed-loader');
    const text = document.getElementById('speed-text');
    const bar = document.getElementById('speed-bar-fill');

    if (!loader || !text || !bar) return;

    // Initial state
    let loading = true;

    // Show loader, hide text, bar 0
    function reset() {
        loading = true;
        loader.style.display = 'block';
        text.style.display = 'none';
        bar.style.width = '0%';

        // After 500ms, "load"
        setTimeout(() => {
            loading = false;
            loader.style.display = 'none';
            text.style.display = 'block';

            // Animate text appearance
            text.style.opacity = '0';
            text.style.transform = 'translateY(20px)';
            text.style.filter = 'blur(5px)';

            requestAnimationFrame(() => {
                text.style.transition = 'all 0.5s ease';
                text.style.opacity = '1';
                text.style.transform = 'translateY(0)';
                text.style.filter = 'blur(0)';
                bar.style.width = '100%';
            });

        }, 1500); // Wait 1.5s before loading
    }

    // Loop the demonstration
    reset();
    setInterval(() => {
        // Reset and play again for demo purposes every 4s
        text.style.opacity = '0'; // fade out
        setTimeout(reset, 500);
    }, 5000);
}

// 4. Security Shields (Random activation)
function initSecurityShields() {
    const shields = document.querySelectorAll('.shield-box');
    if (shields.length === 0) return;

    setInterval(() => {
        // Find inactive shields
        const inactive = Array.from(shields).filter(s => !s.classList.contains('active'));

        if (inactive.length === 0) {
            // All active, reset all random? Or just one?
            // React code: "if nextIndex -1, reset all".
            shields.forEach(s => s.classList.remove('active'));
        } else {
            // Activate first inactive (or random)
            // React code activates sequential "nextIndex".
            inactive[0].classList.add('active');
        }
    }, 800);
}
