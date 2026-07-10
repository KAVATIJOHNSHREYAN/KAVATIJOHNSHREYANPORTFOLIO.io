import os

file_path = "style.css"
with open(file_path, "a", encoding="utf-8") as f:
    f.write("""

/* ==========================================================================
   VERSION 3 UPDATES (PREMIUM UI, BADGES, AND AI CARDS)
   ========================================================================== */

/* Premium Tech Badges */
.skill-badge {
    padding: 0.6rem 1.25rem;
    background: rgba(255, 60, 0, 0.05);
    border: 1px solid var(--accent-orange-glow);
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
    backdrop-filter: blur(5px);
    transition: all var(--transition-medium);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    cursor: default;
}

.skill-badge:hover {
    transform: translateY(-3px) scale(1.05);
    background: var(--accent-orange-alpha);
    border-color: var(--accent-orange);
    box-shadow: 0 8px 20px var(--accent-orange-glow);
    color: var(--accent-orange);
}

.skill-badge.highlight {
    background: linear-gradient(135deg, rgba(255, 60, 0, 0.1) 0%, rgba(255, 123, 0, 0.05) 100%);
    border-color: rgba(255, 60, 0, 0.4);
}

.tech-badge {
    padding: 0.4rem 0.8rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: all var(--transition-fast);
}

.tech-badge:hover {
    color: var(--accent-orange);
    border-color: var(--accent-orange-glow);
}

/* Featured Project Card */
.featured-project-card {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    backdrop-filter: blur(10px);
    transition: transform var(--transition-slow), box-shadow var(--transition-slow);
    position: relative;
}

.featured-project-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent-orange), #ff7b00);
}

.featured-project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px -15px rgba(255, 60, 0, 0.2);
}

/* AI Project Cards */
.ai-card {
    background: var(--bg-primary);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 2rem;
    transition: all var(--transition-medium);
    height: 100%;
}

.ai-card:hover {
    border-color: var(--accent-orange);
    transform: translateY(-8px);
    box-shadow: 0 15px 30px -10px rgba(255, 60, 0, 0.15);
}

/* Status Badges */
.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.3rem 0.8rem;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 700;
}

.status-badge.ready {
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    border: 1px solid rgba(16, 185, 129, 0.2);
}

.status-badge.dev {
    background: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.2);
}

/* Improved Glassmorphism */
.header, .featured-project-card, .controls {
    background: var(--glass-bg);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--glass-border);
}

/* Refined typography and spacing tweaks */
.project-desc {
    color: var(--text-secondary);
    line-height: 1.7;
}

.section-padding {
    padding: 8rem 0; /* Slightly increased padding for premium feel */
}
""")
print("Appended V3 styles to style.css")
