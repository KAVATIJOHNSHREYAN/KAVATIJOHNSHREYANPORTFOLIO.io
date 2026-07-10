import re

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# We need to replace the truncated "Previous Full-Stack Projects" section with the full version.

full_projects_html = """
            <div class="container">
                <!-- Previous Full-Stack Projects -->
                <div class="section-header" style="margin-top: 5rem;">
                    <span class="section-tag">07.2 // PREVIOUS WORK</span>
                    <h2 class="section-title">Full Stack <span class="text-gradient">Projects</span></h2>
                    <div class="section-line"></div>
                </div>
                
                <div class="projects-grid" style="margin-top: 2rem;">
                    <!-- Project 1: Citizen-Politician -->
                    <div class="project-card" data-category="web">
                        <div class="project-img-wrapper">
                            <img src="./assets/project-citizen-2.png" alt="Citizen-Politician Platform Mockup">
                            <div class="project-overlay">
                                <a href="https://github.com/KAVATIJOHNSHREYAN" target="_blank" rel="noopener noreferrer" aria-label="View Project on GitHub"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="project-tags">
                                <span>HTML/CSS</span>
                                <span>JavaScript</span>
                                <span>Spring Boot</span>
                                <span>MySQL</span>
                            </div>
                            <h3 class="project-title">Citizen-Politician Interaction Platform</h3>
                            <p class="project-desc">
                                A civic collaboration interface designed to bridge the transparency and communication gap between citizens and municipal political representatives.
                            </p>
                            <div class="project-highlights">
                                <strong>Problem Solved:</strong> Addressed community reporting delays by creating a roles-based validation portal enabling citizens to submit issues and representatives to moderate community announcements.
                            </div>
                            <div class="project-impact" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <strong>Technologies:</strong> HTML, CSS, JavaScript (ES6+), Java Spring Boot, MySQL, REST APIs, and RBAC.
                            </div>
                        </div>
                    </div>
                    
                    <!-- Project 2: Extracurricular Management -->
                    <div class="project-card" data-category="web">
                        <div class="project-img-wrapper">
                            <img src="./assets/project-student-1.png" alt="ECA Management Mockup">
                            <div class="project-overlay">
                                <a href="https://github.com/KAVATIJOHNSHREYAN" target="_blank" rel="noopener noreferrer" aria-label="View Project on GitHub"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="project-tags">
                                <span>React.js</span>
                                <span>Spring Boot</span>
                                <span>MySQL</span>
                                <span>PDF-Gen</span>
                            </div>
                            <h3 class="project-title">Student ECA Achievement System</h3>
                            <p class="project-desc">
                                A full-stack extracurricular activity (ECA) logging and validation portal built to manage student certificate verification workflows.
                            </p>
                            <div class="project-highlights">
                                <strong>Problem Solved:</strong> Eliminated manual administration processing bottlenecks by designing a digital dashboard for students to request achievements and admins to approve them.
                            </div>
                            <div class="project-impact font-weight-bold" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <strong>Result & Tech:</strong> Built using React.js, Spring Boot, MySQL. <strong>Features a custom PDF download utility to export a certified student activity report.</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
"""

# Let's find the current truncated section and replace it.
# It should look something like:
# <div class="container">
#                 <!-- Previous Full-Stack Projects -->
#                 <div class="section-header" style="margin-top: 5rem;">
# ...
#             </div>

# Because my regex failed, it might be just:
#             <div class="container">
#                 <!-- Previous Full-Stack Projects -->
#                 <div class="section-header" style="margin-top: 5rem;">
#                     <span class="section-tag">07.2 // PREVIOUS WORK</span>
#                     <h2 class="section-title">Full Stack <span class="text-gradient">Projects</span></h2>
#                     <div class="section-line"></div>
#                 </div>
#             </div>

match = re.search(r'\s*<div class="container">\s*<!-- Previous Full-Stack Projects -->.*?</div>\s*</div>\s*</div>\s*', content, flags=re.DOTALL)
if match:
    content = content.replace(match.group(0), "\n" + full_projects_html + "\n")
else:
    # Just in case it looks a bit different
    match_fallback = re.search(r'\s*<!-- Previous Full-Stack Projects -->.*?(?=</section>)', content, flags=re.DOTALL)
    if match_fallback:
        content = content.replace(match_fallback.group(0), "\n" + full_projects_html + "\n")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated index.html to fix missing projects")
