/* Animated Coding Effect */

document.addEventListener('DOMContentLoaded', () => {
    initCodingAnimation();
});

function initCodingAnimation() {
    const editorBody = document.querySelector('#step2 .mock-code-editor .editor-body');

    if (!editorBody) return;

    // Clear existing static content for animation (or keep it if we want to append. Let's clear and re-type)
    // Actually, let's keep the structure but clear the lines
    editorBody.innerHTML = '';

    const codeLines = [
        { type: 'comment', text: '// Build & Implement ->' },
        { type: 'empty' },
        { type: 'code', text: '<span class="kw">async function</span> <span class="func">generateResponse</span>(prompt) {' },
        { type: 'code', indent: 1, text: '<span class="kw">const</span> response = <span class="kw">await</span> fetch(<span class="str">"https://api.openai.com/v1..."</span>, {' },
        { type: 'code', indent: 2, text: 'method: <span class="str">"POST"</span>,' },
        { type: 'code', indent: 2, text: 'headers: {' },
        { type: 'code', indent: 3, text: '<span class="str">"Content-Type"</span>: <span class="str">"application/json"</span>,' },
        { type: 'code', indent: 3, text: '<span class="str">"Authorization"</span>: <span class="str">"Bearer YOUR_KEY"</span>' },
        { type: 'code', indent: 2, text: '},' },
        { type: 'code', indent: 2, text: 'body: JSON.stringify({' },
        { type: 'code', indent: 3, text: 'model: <span class="str">"gpt-4"</span>,' },
        { type: 'code', indent: 3, text: 'input: prompt' },
        { type: 'code', indent: 2, text: '})' },
        { type: 'code', indent: 1, text: '});' },
        { type: 'code', indent: 1, text: '<span class="kw">return</span> response.json();' },
        { type: 'code', text: '}' }
    ];

    let lineIndex = 0;
    let isTyping = false;
    let typeInterval;

    // Intersection Observer to start animation when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTyping) {
                startTyping();
            }
        });
    }, { threshold: 0.5 });

    // Observer specifically for the tab becoming active
    const tab2 = document.getElementById('step2');
    const tabObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active')) {
                resetAndStart();
            }
        });
    });

    if (tab2) {
        tabObserver.observe(tab2, { attributes: true, attributeFilter: ['class'] });
    }

    // Function to Type code
    function startTyping() {
        isTyping = true;
        lineIndex = 0;
        editorBody.innerHTML = '';
        typeNextLine();
    }

    function resetAndStart() {
        isTyping = true;
        lineIndex = 0;
        editorBody.innerHTML = '';
        if (typeInterval) clearTimeout(typeInterval);
        typeNextLine();
    }

    function typeNextLine() {
        if (lineIndex >= codeLines.length) {
            // Loop or stop? Let's stop and wait, or loop.
            // Let's loop after a delay
            typeInterval = setTimeout(startTyping, 5000);
            return;
        }

        const lineData = codeLines[lineIndex];
        const lineEl = document.createElement('div');
        lineEl.classList.add('line');

        // Line Number
        const ln = document.createElement('span');
        ln.classList.add('ln');
        ln.textContent = lineIndex + 1;
        lineEl.appendChild(ln);

        // Content placeholder
        const contentSpan = document.createElement('span');

        // Indentation
        if (lineData.indent) {
            contentSpan.style.paddingLeft = `${lineData.indent * 20}px`;
        }

        if (lineData.type === 'empty') {
            contentSpan.innerHTML = '&nbsp;';
            lineEl.appendChild(contentSpan);
            editorBody.appendChild(lineEl);
            lineIndex++;
            typeInterval = setTimeout(typeNextLine, 100); // Fast for empty lines
        } else {
            // For simplicity in Vanilla JS with HTML highlighting, we will just fade the line in 
            // rather than char-by-char typing which breaks HTML tags.
            // Or we can do a simple "typing" effect by appending the full HTML instantly 
            // but identifying it as the "current line" with a cursor.

            contentSpan.innerHTML = lineData.text; // Use innerHTML to parse the color spans
            lineEl.appendChild(contentSpan);

            // Initial style hidden
            lineEl.style.opacity = '0';
            lineEl.style.transform = 'translateX(-10px)';
            lineEl.style.transition = 'all 0.2s ease';

            editorBody.appendChild(lineEl);

            // Trigger reflow
            void lineEl.offsetWidth;

            lineEl.style.opacity = '1';
            lineEl.style.transform = 'translateX(0)';

            lineIndex++;
            typeInterval = setTimeout(typeNextLine, 300); // Speed of lines appearing
        }

        // Auto scroll
        editorBody.scrollTop = editorBody.scrollHeight;
    }
}
