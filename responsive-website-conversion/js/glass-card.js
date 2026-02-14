/**
 * Glass Card Injector
 * Wraps the founder section content in a "Apple Glass" style card.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Target the Founder Section Container
    const founderSection = document.querySelector('.founder-section .container');

    if (!founderSection) return;

    // Elements to wrap (Badge, Quote, Profile)
    // We select them specifically to ensure we don't grab random scripts or unintended elements
    const elementsToWrap = [
        founderSection.querySelector('.founder-badge'),
        founderSection.querySelector('.founder-quote'),
        founderSection.querySelector('.founder-profile')
    ].filter(el => el !== null); // Filter out any missing elements

    if (elementsToWrap.length === 0) return;

    // Create the Glass Card Container
    const glassCard = document.createElement('div');
    glassCard.className = 'glass-card';

    // Add Ambience (Glow behind content)
    const ambience = document.createElement('div');
    ambience.className = 'glass-card-ambience';
    glassCard.appendChild(ambience);

    // Initial Parent (Container) - We will need to re-append the card here
    // But first, verify we are moving them correctly.

    // Move elements into the glass card
    elementsToWrap.forEach(el => {
        // Remove from original parent and append to glass card
        // Note: appendChild moves the node, so no need to remove explicitly
        glassCard.appendChild(el);
    });

    // Clear the container (optional, but safer to just append the card now)
    // Since we moved the specific elements, the container might still have whitespace or comments.
    // It's cleaner to append the card to the container.
    founderSection.appendChild(glassCard);

    // Optional: Clean up empty text nodes in founderSection if needed, 
    // but usually CSS handles layout fine.
});
