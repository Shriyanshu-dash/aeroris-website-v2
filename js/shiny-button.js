/**
 * Shiny Button Adapter
 * Applies the shiny-cta class and structure to specific buttons
 */

document.addEventListener('DOMContentLoaded', () => {
    // Target 1: Hero Section Button ("Book a Free Call")
    // Selector: .hero-content .cta-group a.btn-hero-primary
    const heroBtn = document.querySelector('.hero-content .cta-group a.btn-hero-primary');
    if (heroBtn) {
        applyShinyEffect(heroBtn);
    }

    // Target 2: Contact Section Button ("Book A Free Call")
    // Selector: #contact .contact-cta a.btn-glow
    const contactBtn = document.querySelector('.contact .contact-cta a'); // Generic selector or specific class
    if (contactBtn) {
        applyShinyEffect(contactBtn);
        // Remove conflicting classes if any (btn-glow might have other styles)
        contactBtn.classList.remove('btn-glow');
    }
});

function applyShinyEffect(element) {
    if (!element) return;

    // Add class
    element.classList.add('shiny-cta');

    // Ensure content is wrapped in span (if not already)
    // The CSS expects .shiny-cta span
    // Note: If element has icon, we might need to be careful.
    // InnerHTML: "Book <i...>" -> "<span>Book <i...></span>"

    if (!element.querySelector('span')) {
        const innerContent = element.innerHTML;
        element.innerHTML = `<span>${innerContent}</span>`;
    }
}
