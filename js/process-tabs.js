document.addEventListener('DOMContentLoaded', () => {
    initProcessTabs();
});

function initProcessTabs() {
    const tabsContainer = document.querySelector('.process-tabs');
    if (!tabsContainer) return;

    const buttons = tabsContainer.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    // Create the pill element
    const pill = document.createElement('div');
    pill.classList.add('tab-pill');
    tabsContainer.appendChild(pill); // Append to container, z-index handles layering

    // Function to move pill
    function movePillTo(btn) {
        if (!btn) return;

        // Calculate relative position
        const containerRect = tabsContainer.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        const offsetLeft = btnRect.left - containerRect.left;

        // Apply styles
        pill.style.width = `${btnRect.width}px`;
        pill.style.transform = `translateX(${offsetLeft}px)`;
    }

    // Function to switch content
    function switchContent(targetId) {
        contents.forEach(content => {
            // If currently active, fade out
            if (content.classList.contains('active') && content.id !== targetId) {
                content.classList.remove('animate-in');
                // Wait for transition to finish before hiding? 
                // Simple approach: remove active immediately for snap, or use timeout.
                // React code uses AnimatePresence which handles exit. 
                // Here we will just swap for simplicity, or we can delay.
                content.classList.remove('active');
            }
        });

        const newContent = document.getElementById(targetId);
        if (newContent) {
            newContent.classList.add('active');

            // Small delay to allow display:block to apply before adding animation class
            requestAnimationFrame(() => {
                newContent.classList.add('animate-in');
            });
        }
    }

    // Event Listeners
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Move pill
            movePillTo(btn);

            // Switch Content
            const targetId = btn.getAttribute('data-tab');
            switchContent(targetId);
        });
    });

    // Initialize state
    const activeBtn = tabsContainer.querySelector('.tab-btn.active') || buttons[0];
    if (activeBtn) {
        // Initial pill position (wait for layout)
        // setTimeout ensures layout is stable
        setTimeout(() => {
            movePillTo(activeBtn);
            // Ensure content is visible
            const targetId = activeBtn.getAttribute('data-tab');
            const content = document.getElementById(targetId);
            if (content) {
                content.classList.add('active', 'animate-in');
            }
        }, 100);
    }

    // Resize observer to adjust pill on window resize
    window.addEventListener('resize', () => {
        const currentActive = tabsContainer.querySelector('.tab-btn.active');
        if (currentActive) movePillTo(currentActive);
    });
}
