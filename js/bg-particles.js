// Simple Particle System (Ported from 404.html)
document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');

    // Only run if the container exists
    if (!particlesContainer) return;

    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 3 + 1;
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 5;
        const delay = Math.random() * 5;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.setProperty('--duration', `${duration}s`);
        particle.style.animationDelay = `${delay}s`;

        particlesContainer.appendChild(particle);
    }
});
