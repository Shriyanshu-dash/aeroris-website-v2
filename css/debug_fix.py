
import os
import sys

style_path = r"c:\Users\ARYAMAN VERMA\OneDrive\Desktop\website\css\style.css"

try:
    with open(style_path, 'rb') as f:
        raw_data = f.read()
    print(f"Read {len(raw_data)} bytes.")

    content = ""
    try:
        content = raw_data.decode('utf-8')
    except:
        print("UTF-8 decode failed, trying ignore")
        content = raw_data.decode('utf-8', errors='ignore')

    marker = "margin-bottom: 40px;"
    idx = content.rfind(marker)
    print(f"Marker index: {idx}")

    if idx != -1:
        # Check braces
        brace1 = content.find("}", idx)
        print(f"Brace1 at: {brace1}")
        
        # We need to construct the new file content
        # Cut after brace1 (closing .faq-cta-card)
        # Add closing brace for media query
        # Add new CSS
        
        good_part = content[:brace1+1]
        
        clean_css = """
}

/* =========================================
   3D Background & Blog Redesign
   ========================================= */

/* Background Canvas */
#bg-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none; /* Let clicks pass through */
    background: radial-gradient(circle at 50% 50%, rgba(20, 20, 40, 0.4), transparent);
}

/* Blog Page Redesign */
.blog-page {
    position: relative;
    /* Ensure z-index context if needed */
}

.blog-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(99, 102, 241, 0.1);
    padding: 8px 16px;
    border-radius: 30px;
    font-size: 0.8rem;
    color: var(--accent-secondary);
    border: 1px solid rgba(139, 92, 246, 0.2);
    margin-bottom: 24px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.blog-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
}

.blog-card {
    background: rgba(14, 14, 31, 0.6); 
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
    height: 100%;
}

.blog-card:hover {
    transform: translateY(-8px);
    border-color: var(--accent-primary);
    box-shadow: 0 20px 40px -10px rgba(99, 102, 241, 0.2);
    background: rgba(14, 14, 31, 0.8);
}

.blog-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
}

.blog-card:hover::before {
    transform: scaleX(1);
}

.card-image-wrapper {
    width: 100%;
    height: 260px;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 24px;
    position: relative;
}

.card-image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.blog-card:hover .card-image-wrapper img {
    transform: scale(1.05);
}

.card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    font-size: 0.85rem;
}

.card-tag {
    background: rgba(255, 255, 255, 0.1);
    padding: 4px 12px;
    border-radius: 6px;
    color: white;
    font-weight: 500;
}

.card-date {
    color: var(--text-tertiary);
    font-family: var(--font-sans);
}

.blog-card h3 {
    font-size: 1.5rem;
    margin-bottom: 12px;
    line-height: 1.3;
    transition: color 0.3s;
}

.blog-card:hover h3 {
    color: var(--accent-secondary);
}

.blog-card p {
    color: var(--text-secondary);
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 24px;
    flex-grow: 1;
}

.blog-read-more {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    margin-top: auto;
}

.blog-read-more i {
    transition: transform 0.3s;
}

.blog-read-more:hover i {
    transform: translateX(4px);
}

@media (max-width: 768px) {
    .blog-grid {
        grid-template-columns: 1fr;
    }
}

/* =========================================
   Live Background (Ported from 404.html)
   ========================================= */

/* Noise Texture */
.noise-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0; /* Behind content but above background color */
}

.spotlight-beams {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    pointer-events: none;
    background:
        linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.03) 45%, transparent 50%),
        linear-gradient(75deg, transparent 40%, rgba(255, 255, 255, 0.03) 55%, transparent 60%);
    filter: blur(5px);
    z-index: -1;
    animation: beam-pulse 8s ease-in-out infinite alternate;
}

/* Particles */
.particles {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    top: 0;
    left: 0;
}

.particle {
    position: absolute;
    background: white;
    border-radius: 50%;
    opacity: 0.3;
    animation: rise var(--duration) linear infinite;
    bottom: -10px;
}

/* Animation Keyframes */
@keyframes beam-pulse {
    0% { opacity: 0.8; }
    100% { opacity: 0.4; }
}

@keyframes rise {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        transform: translateY(-100vh) translateX(20px);
        opacity: 0;
    }
}
"""
        
        with open(style_path, 'w', encoding='utf-8') as f:
            f.write(good_part + clean_css)
        print("Write successful")
        
    else:
        print("Marker NOT found")
        sys.exit(1)

except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)
