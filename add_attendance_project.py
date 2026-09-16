import os

# 1. Update index.html
file_path_index = "index.html"
with open(file_path_index, "r", encoding="utf-8") as f:
    content_index = f.read()

target_index = """                    </div>
                </div>

            <div class="container">"""

replacement_index = """                    </div>
                    
                    <!-- Project 3: KL Attendance Calculator -->
                    <div class="project-card" data-category="web">
                        <div class="project-img-wrapper">
                            <img src="./assets/project-attendance.png" alt="KL University Attendance Calculator">
                            <div class="project-overlay">
                                <a href="https://github.com/KAVATIJOHNSHREYAN/LTPS_ATTENDANCE_CALCULATOR" target="_blank" rel="noopener noreferrer" aria-label="View Project on GitHub"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="project-tags">
                                <span>React</span>
                                <span>Next.js</span>
                                <span>Tailwind CSS</span>
                                <span>UI/UX</span>
                            </div>
                            <h3 class="project-title">KL University Attendance Calculator</h3>
                            <div style="margin-bottom: 1rem;"><span class="status-badge ready"><i class="fa-solid fa-circle-check"></i> Completed (Live)</span></div>
                            <p class="project-desc">
                                Enhanced the user experience and interface of an open-source attendance calculator, making the application cleaner, more intuitive, and fully responsive for students.
                            </p>
                            <div class="project-highlights">
                                <strong>Contribution:</strong> Focused on UI/UX improvements, responsive design enhancements, and layout refinements to incrementally improve an existing codebase.
                            </div>
                            <div class="project-impact font-weight-bold" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <span><strong>Live Demo:</strong> <a href="https://ltps-attendance-calculator.vercel.app" target="_blank" style="color: inherit; text-decoration: underline;">View Project</a></span>
                            </div>
                        </div>
                    </div>
                </div>

            <div class="container">"""

if target_index in content_index:
    content_index = content_index.replace(target_index, replacement_index, 1)
    with open(file_path_index, "w", encoding="utf-8") as f:
        f.write(content_index)
    print("Updated index.html")
else:
    print("Target not found in index.html")


# 2. Update resume.html
file_path_resume = "resume.html"
with open(file_path_resume, "r", encoding="utf-8") as f:
    content_resume = f.read()

target_resume = """            <div class="item-row">
                <div class="item-header">
                    <span>AetherMind EDU</span>"""

replacement_resume = """            <div class="item-row">
                <div class="item-header">
                    <span>KL University Attendance Calculator</span>
                    <span>React, Next.js, Tailwind CSS, UI/UX</span>
                </div>
                <div class="item-subheader">
                    <span>Open-Source Frontend Contribution</span>
                    <span>Completed (Live)</span>
                </div>
                <ul class="item-bullets">
                    <li>Contributed to an open-source student attendance calculator to significantly enhance the user experience.</li>
                    <li>Redesigned and refined the interface for a cleaner, more intuitive layout and user flow.</li>
                    <li>Implemented comprehensive responsive design enhancements for seamless mobile and desktop usage.</li>
                    <li>Strengthened frontend development skills by incrementally improving an existing production codebase.</li>
                </ul>
            </div>

            <div class="item-row">
                <div class="item-header">
                    <span>AetherMind EDU</span>"""

if target_resume in content_resume:
    content_resume = content_resume.replace(target_resume, replacement_resume, 1)
    with open(file_path_resume, "w", encoding="utf-8") as f:
        f.write(content_resume)
    print("Updated resume.html")
else:
    print("Target not found in resume.html")
