console.log('🎯 Sticky Features Script Loading...');

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM Loaded - Initializing Sticky Features');

    // Reveal Animation for Header
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animated-text');
    animatedElements.forEach(el => observer.observe(el));
    console.log(`📝 Observing ${animatedElements.length} animated text elements`);

    // Verify sticky cards exist
    const cards = document.querySelectorAll('.sticky-card');
    console.log(`🃏 Found ${cards.length} sticky cards`);

    if (cards.length === 0) {
        console.warn('⚠️ No sticky cards found! Check HTML structure.');
    } else {
        console.log('✨ Sticky scroll uses CSS only - cards should stick automatically!');
        console.log('💡 Each card has position:sticky and top:200px in CSS');
    }
});
