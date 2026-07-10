import re

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix the Full Stack Projects section by wrapping it in a <div class="container">
# Let's find the section header for "Previous Work"
old_work_start = """                <!-- Previous Full-Stack Projects -->
                <div class="section-header" style="margin-top: 5rem;">
                    <span class="section-tag">07.2 // PREVIOUS WORK</span>"""

# If it's missing the container, let's wrap it properly.
# The previous script just injected it before 7.5. Let's find exactly what was injected.
# We will use regex to extract everything from "Previous Full-Stack Projects" to the end of its projects-grid.
match = re.search(r'(\s*<!-- Previous Full-Stack Projects -->.*?</div>\s*</div>\s*)<!-- 7\.5\. AI with Computational Intelligence Projects -->', content, flags=re.DOTALL)
if match:
    old_projects_block = match.group(1)
    # Wrap it in container if not already
    if '<div class="container">' not in old_projects_block:
        fixed_old_projects = '\n            <div class="container">\n' + old_projects_block.strip() + '\n            </div>\n        '
        content = content.replace(old_projects_block, fixed_old_projects)

# 2. Re-write the entire AI Projects section (removing 7 and 7.5 and combining them)
# Find from section 7 to 7.5's end
match_ai = re.search(r'<!-- 7\. Projects Portfolio Section -->.*?<!-- GitHub Stats Section -->', content, flags=re.DOTALL)
if match_ai:
    new_ai_section = """<!-- 7. Projects Portfolio Section -->
        <section id="projects" class="projects-section section-padding">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">07 // COMPUTATIONAL INTELLIGENCE</span>
                    <h2 class="section-title">AI with Computational Intelligence <span class="text-gradient">Projects</span></h2>
                    <div class="section-line"></div>
                </div>
                
                <div class="projects-grid">
                    <!-- Project 1: SAMRAT -->
                    <div class="project-card" data-category="ai">
                        <div class="project-img-wrapper">
                            <img src="./assets/project-samrat.png" alt="SAMRAT AETHERMIND V2 Dashboard">
                            <div class="project-overlay">
                                <a href="https://github.com/KAVATIJOHNSHREYAN/SAMRAT_AETHERMIND_V2" target="_blank" rel="noopener noreferrer" aria-label="View Project on GitHub"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="project-tags">
                                <span>Next.js</span>
                                <span>Python</span>
                                <span>FastAPI</span>
                                <span>LLMs</span>
                                <span>RAG</span>
                            </div>
                            <h3 class="project-title">SAMRAT AETHERMIND V2</h3>
                            <div style="margin-bottom: 1rem;"><span class="status-badge ready"><i class="fa-solid fa-circle-check"></i> Production Ready</span></div>
                            <p class="project-desc">
                                Advanced multi-LLM AI ecosystem featuring voice intelligence, Retrieval-Augmented Generation, intelligent document understanding, custom backend architecture, and production-ready AI workflows.
                            </p>
                            <div class="project-highlights">
                                <strong>Problem Solved:</strong> Addressed standard API limitations by building a scalable custom backend, providing seamless switching between Gemini, Cohere, and OpenAI models.
                            </div>
                            <div class="project-impact" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <strong>Technologies:</strong> TypeScript, Zustand, SQLite, Vercel, Render.
                            </div>
                        </div>
                    </div>
                    
                    <!-- Project 2: SRTO -->
                    <div class="project-card" data-category="ai">
                        <div class="project-img-wrapper">
                            <img src="./assets/project-srto.png" alt="Smart Resource & Timetable Optimizer">
                            <div class="project-overlay">
                                <a href="https://github.com/KAVATIJOHNSHREYAN" target="_blank" rel="noopener noreferrer" aria-label="View Project on GitHub"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="project-tags">
                                <span>Python</span>
                                <span>AI</span>
                                <span>Optimization</span>
                                <span>Algorithms</span>
                            </div>
                            <h3 class="project-title">Smart Resource & Timetable Optimizer (SRTO)</h3>
                            <div style="margin-bottom: 1rem;"><span class="status-badge dev"><i class="fa-solid fa-person-digging"></i> Under Development</span></div>
                            <p class="project-desc">
                                An AI with Computational Intelligence project focused on solving academic scheduling and resource allocation problems using intelligent optimization techniques.
                            </p>
                            <div class="project-highlights">
                                <strong>Problem Solved:</strong> Automatically generates conflict-free timetables by considering faculty availability, classrooms, and institutional constraints to maximize resource utilization.
                            </div>
                            <div class="project-impact font-weight-bold" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <strong>Result & Tech:</strong> Built using Python, Constraint Satisfaction, and Computational Intelligence algorithms.
                            </div>
                        </div>
                    </div>
                </div>

"""
    
    # Let's extract the previous work block so we don't overwrite it, but actually, match_ai will capture it if it's inside between 7 and GitHub section.
    # We should just make sure we capture EVERYTHING and then put it all together properly.
    
    # Actually, let's just do a manual rebuild of the sections between Section 7 and Section 8.
    
    full_match = re.search(r'(<!-- 7\. Projects Portfolio Section -->.*?)<!-- GitHub Stats Section -->', content, flags=re.DOTALL)
    if full_match:
        old_full = full_match.group(1)
        
        # Extract the old projects manually so we keep them intact but just wrapped in container.
        old_projects_match = re.search(r'(<!-- Previous Full-Stack Projects -->.*?</div>\s*</div>)', old_full, flags=re.DOTALL)
        
        old_projects_code = ""
        if old_projects_match:
            old_projects_code = old_projects_match.group(1)
            # Wrap in container
            if '<div class="container">' not in old_projects_code:
                old_projects_code = '\n            <div class="container">\n' + old_projects_code + '\n            </div>\n'
                
        # Now construct the complete replacement
        complete_replacement = new_ai_section + old_projects_code + "\n        </section>\n\n        <!-- GitHub Stats Section -->"
        
        content = content.replace(full_match.group(0), complete_replacement)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated index.html to fix layout and combine AI projects")
