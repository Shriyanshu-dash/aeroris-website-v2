document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animation for Header
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed if you want it to happen only once
                // observer.unobserve(entry.target); 
            } else {
                // If you want it to toggle in/out like the React code (opacity-0 when out)
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animated-text');
    animatedElements.forEach(el => observer.observe(el));
});
