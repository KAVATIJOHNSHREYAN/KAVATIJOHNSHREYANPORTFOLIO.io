import re

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Restore the old projects to index.html
old_projects_html = """
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
"""

# Insert it right before the 7.5 AI Projects section
insert_target = '<!-- 7.5. AI with Computational Intelligence Projects -->'
if insert_target in content and old_projects_html not in content:
    content = content.replace(insert_target, old_projects_html + "\n        " + insert_target)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated index.html to restore previous projects")

# Restore old projects to resume.html
resume_path = "resume.html"
with open(resume_path, "r", encoding="utf-8") as f:
    resume_content = f.read()

old_resume_projects = """
            <div class="item-row">
                <div class="item-header">
                    <span>Student ECA Achievement System (STDEXT)</span>
                    <span>Java, React, MySQL, REST APIs</span>
                </div>
                <div class="item-subheader">
                    <span>Full-Stack Extracurricular Management Application</span>
                    <span>April 2026</span>
                </div>
                <ul class="item-bullets">
                    <li>Designed and implemented a React frontend and Spring Boot backend to track and verify student certificates.</li>
                    <li>Solved manual administrative bottlenecks by building real-time approval dashboards for verification personnel.</li>
                    <li>Implemented a custom PDF student report generator to let verified students download official ECA scorecards.</li>
                </ul>
            </div>

            <div class="item-row">
                <div class="item-header">
                    <span>Citizen-Politician Interaction Platform</span>
                    <span>Spring Boot, HTML, CSS, JS, MySQL</span>
                </div>
                <div class="item-subheader">
                    <span>Civic Engagement and Communication Portal</span>
                    <span>March 2026</span>
                </div>
                <ul class="item-bullets">
                    <li>Created a dynamic web portal to bridge transparency gaps between municipal citizens and local political representatives.</li>
                    <li>Built secure, role-based access controls (RBAC) separating representatives, moderators, and general citizens.</li>
                    <li>Enabled real-time issue reporting, tracking, and representatives dashboard verification panels.</li>
                </ul>
            </div>
"""

insert_resume_target = '<!-- 6. Technical Skills Section -->'
if insert_resume_target in resume_content and "Student ECA Achievement System (STDEXT)" not in resume_content:
    resume_content = resume_content.replace(insert_resume_target, old_resume_projects + "\n        " + insert_resume_target)

with open(resume_path, "w", encoding="utf-8") as f:
    f.write(resume_content)
print("Updated resume.html to restore previous projects")
