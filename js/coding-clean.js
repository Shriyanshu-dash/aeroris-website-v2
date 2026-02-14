/* Clean Coding Animation JS */

document.addEventListener('DOMContentLoaded', () => {
    initCleanCoding();
});

function initCleanCoding() {
    const editorContainer = document.querySelector('.mock-code-editor.big-editor');
    if (!editorContainer) return;

    // Remove old header/body if present to rebuild clean structure
    // We want to preserve the header style if it exists, or rebuild it.
    // The previous structure had .editor-header and .editor-body.
    // We will clear the container content but keep header if we want, 
    // or just rebuild the "Body" part.
    // Let's target the inner content area.

    // Check if we need to restructure
    let contentWrapper = editorContainer.querySelector('.editor-content-wrapper');
    if (!contentWrapper) {
        // If not present, we might need to wrap existing or create new.
        // Let's assume we replace the old .editor-body with our new structure.
        const oldBody = editorContainer.querySelector('.editor-body');
        if (oldBody) oldBody.remove();

        contentWrapper = document.createElement('div');
        contentWrapper.className = 'editor-content-wrapper';

        // Create Layers
        const effectLayer = document.createElement('div');
        effectLayer.className = 'code-effect-layer';
        effectLayer.innerHTML = `
            <div class="scan-line"></div>
            <div class="shimmer-overlay"></div>
        `;

        const textLayer = document.createElement('div');
        textLayer.className = 'code-text-layer';

        contentWrapper.appendChild(effectLayer);
        contentWrapper.appendChild(textLayer);

        editorContainer.appendChild(contentWrapper);
    }

    const textLayer = contentWrapper.querySelector('.code-text-layer');
    textLayer.innerHTML = ''; // Clear

    // Static readable code content
    const codeContent = [
        { ln: 1, html: '<span class="tok-comment">// Definition: API Workflow</span>' },
        { ln: 2, html: '' },
        { ln: 3, html: '<span class="tok-kw">async function</span> <span class="tok-func">generateResponse</span>(prompt) {' },
        { ln: 4, html: '&nbsp;&nbsp;<span class="tok-kw">const</span> config = {' },
        { ln: 5, html: '&nbsp;&nbsp;&nbsp;&nbsp;model: <span class="tok-str">"gpt-4-turbo"</span>,' },
        { ln: 6, html: '&nbsp;&nbsp;&nbsp;&nbsp;temperature: <span class="tok-num">0.7</span>,' },
        { ln: 7, html: '&nbsp;&nbsp;&nbsp;&nbsp;stream: <span class="tok-kw">true</span>' },
        { ln: 8, html: '&nbsp;&nbsp;};' },
        { ln: 9, html: '' },
        { ln: 10, html: '&nbsp;&nbsp;<span class="tok-kw">try</span> {' },
        { ln: 11, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-kw">const</span> response = <span class="tok-kw">await</span> fetch(API_URL, config);' },
        { ln: 12, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-kw">if</span> (!response.ok) <span class="tok-kw">throw</span> <span class="tok-kw">new</span> Error(<span class="tok-str">"Network Error"</span>);' },
        { ln: 13, html: '&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-kw">return</span> <span class="tok-kw">await</span> response.json();' },
        { ln: 14, html: '&nbsp;&nbsp;} <span class="tok-kw">catch</span> (err) {' },
        { ln: 15, html: '&nbsp;&nbsp;&nbsp;&nbsp;console.error(err);' },
        { ln: 16, html: '&nbsp;&nbsp;}' },
        { ln: 17, html: '}' },
        { ln: 18, html: '' },
        { ln: 19, html: '<span class="tok-comment">// Ready for deployment...<span class="typing-cursor"></span></span>' }
    ];

    // Render all lines immediately for readability
    codeContent.forEach(line => {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'code-line';

        const numSpan = document.createElement('span');
        numSpan.className = 'tok-ln';
        numSpan.textContent = line.ln;

        const contentSpan = document.createElement('span');
        contentSpan.innerHTML = line.html || '&nbsp;';

        lineDiv.appendChild(numSpan);
        lineDiv.appendChild(contentSpan);

        textLayer.appendChild(lineDiv);
    });
}
