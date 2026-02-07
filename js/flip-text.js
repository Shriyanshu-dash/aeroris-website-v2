/* FlipText Logic - Vanilla JS Implementation of React Component */
class FlipText {
    constructor(element, options = {}) {
        this.element = element;
        // Defaults from React component
        this.options = {
            duration: 2.2,
            delay: 0,
            loop: true,
            separator: " ",
            ...options
        };
        this.init();
    }

    init() {
        if (!this.element) return;

        const originalText = this.element.textContent.trim();
        const separator = this.options.separator;
        const words = originalText.split(separator);
        const totalChars = originalText.length;

        // Clear element content
        this.element.innerHTML = '';
        this.element.classList.add('flip-text-wrapper');
        this.element.style.display = 'inline-block';
        this.element.style.lineHeight = '1'; // "leading-none"
        this.element.style.perspective = '1000px';

        let globalCharIndex = 0;

        // Helper to calculate char index (in case of complex separators, though global counter is easier here)
        // React code logic:
        /*
        const getCharIndex = (wordIndex: number, charIndex: number) => {
            let index = 0;
            for (let i = 0; i < wordIndex; i++) {
                index += words[i].length + (separator === " " ? 1 : separator.length);
            }
            return index + charIndex;
        };
        */

        // We can just track global index as we iterate
        // But to be EXACT to logic, let's replicate the structure

        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            wordSpan.style.transformStyle = 'preserve-3d';

            const chars = word.split('');
            chars.forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.className = 'flip-char';
                charSpan.dataset.char = char;
                charSpan.textContent = char;
                charSpan.style.display = 'inline-block';
                charSpan.style.position = 'relative';

                // Calculate Index
                // Recalc based on logic to match specific indexing?
                // The React code counts separator length.
                // My globalCharIndex needs to include separator length.

                // Let's use strict calculation
                let currentGlobalIndex = 0;
                for (let i = 0; i < wordIndex; i++) {
                    currentGlobalIndex += words[i].length + (separator === " " ? 1 : separator.length);
                }
                currentGlobalIndex += charIndex;

                const normalizedIndex = currentGlobalIndex / totalChars;
                const sineValue = Math.sin(normalizedIndex * (Math.PI / 2));
                const calculatedDelay = sineValue * (this.options.duration * 0.25) + this.options.delay;

                charSpan.style.setProperty('--flip-duration', `${this.options.duration}s`);
                charSpan.style.setProperty('--flip-delay', `${calculatedDelay}s`);
                // Loop behavior
                if (!this.options.loop) {
                    charSpan.style.animationIterationCount = '1';
                }

                charSpan.style.transformStyle = 'preserve-3d';

                wordSpan.appendChild(charSpan);
            });

            this.element.appendChild(wordSpan);

            // Add Separator
            if (wordIndex < words.length - 1) {
                if (separator === " ") {
                    const spaceSpan = document.createElement('span');
                    spaceSpan.className = 'whitespace';
                    spaceSpan.style.display = 'inline-block';
                    spaceSpan.innerHTML = '&nbsp;';
                    this.element.appendChild(spaceSpan);
                } else {
                    const sepSpan = document.createElement('span');
                    sepSpan.className = 'separator';
                    sepSpan.style.display = 'inline-block';
                    sepSpan.textContent = separator;
                    this.element.appendChild(sepSpan);
                }
            }
        });
    }
}

// Expose globally
window.FlipText = FlipText;
