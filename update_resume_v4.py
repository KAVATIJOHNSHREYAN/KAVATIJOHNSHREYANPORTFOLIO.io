import os
import re

file_path = "resume.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Professional Summary
old_summary = """<p class="summary-text">
                Computer Science Engineering student at KL University specializing in AI with Computational Intelligence. Highly motivated to secure a challenging software engineering role, leveraging hands-on experience in full-stack architecture design, machine learning models development, and robust data workflows. Demonstrated success in building scalable web applications and collaborating within professional data science environments.
            </p>"""
new_summary = """<p class="summary-text">
                Results-driven AI & Full Stack Software Engineer specializing in Artificial Intelligence, Computational Intelligence, and scalable backend architecture. Proven expertise in building production-ready Large Language Model (LLM) applications, Retrieval-Augmented Generation (RAG) pipelines, and intelligent AI workflows. Adept at leveraging robust Computer Science fundamentals to design scalable software solutions, develop custom REST APIs, and integrate advanced GenAI capabilities into modern web applications.
            </p>"""
content = content.replace(old_summary, new_summary)


# 2. Update Projects Section completely
old_projects_start = content.find("<h2>Projects</h2>")
old_projects_end = content.find("<h2>Skills</h2>", old_projects_start)
if old_projects_start != -1 and old_projects_end != -1:
    new_projects_html = """<h2>Projects</h2>
            
            <div class="item-row">
                <div class="item-header">
                    <span>SAMRAT AETHERMIND V2</span>
                    <span>Next.js, TypeScript, FastAPI, Python, SQLite, Vercel, Render</span>
                </div>
                <div class="item-subheader">
                    <span>Advanced Multi-LLM AI Assistant Platform</span>
                    <span>Completed (Live)</span>
                </div>
                <ul class="item-bullets">
                    <li>Built a production-ready multi-LLM AI assistant integrating Gemini, OpenAI, and Cohere models.</li>
                    <li>Implemented Retrieval-Augmented Generation (RAG) for intelligent document question answering.</li>
                    <li>Developed custom API routing, model switching, session management, and conversation history.</li>
                    <li>Added multilingual support, voice interaction, responsive UI, and customizable themes.</li>
                    <li>Designed scalable backend architecture using FastAPI with deployment on Render and frontend deployment on Vercel.</li>
                </ul>
            </div>

            <div class="item-row">
                <div class="item-header">
                    <span>Smart Resource & Timetable Optimizer</span>
                    <span>React, TypeScript, FastAPI, Python, SQLite, JWT</span>
                </div>
                <div class="item-subheader">
                    <span>AI-Assisted University Resource Platform</span>
                    <span>Completed (Live)</span>
                </div>
                <ul class="item-bullets">
                    <li>Designed and developed a full-stack academic management platform for timetable optimization.</li>
                    <li>Implemented secure authentication, role-based access control, and scalable REST APIs.</li>
                    <li>Built dashboards for departments, faculty, classrooms, students, reports, and institutional analytics.</li>
                    <li>Developed timetable validation, reporting, notification, and scheduling workflows using modern backend architecture.</li>
                    <li>Deployed frontend on Vercel and backend on Render.</li>
                </ul>
            </div>

            <div class="item-row">
                <div class="item-header">
                    <span>AetherMind EDU</span>
                    <span>Next.js, React, TypeScript, FastAPI, Python, LLMs, RAG</span>
                </div>
                <div class="item-subheader">
                    <span>AI-Powered Personalized Education Platform</span>
                    <span>Currently Under Development</span>
                </div>
                <ul class="item-bullets">
                    <li>Designing scalable AI education architecture.</li>
                    <li>Building personalized learning workflows using modern LLM technologies.</li>
                    <li>Developing modular AI services for future intelligent educational systems.</li>
                </ul>
            </div>
        </section>

        <!-- 6. Technical Skills Section -->
        <section class="resume-section">
"""
    content = content[:old_projects_start] + new_projects_html + content[old_projects_end + len('        <section class="resume-section">\n'):]

# 3. Update Skills Section
old_skills = """<div class="skills-table">
                <div class="skills-category">Core Expertise</div>
                <div class="skills-list">Artificial Intelligence, Computational Intelligence, Large Language Models (LLMs), Prompt Engineering, RAG</div>
                
                <div class="skills-category">Programming & Languages</div>
                <div class="skills-list">Python, TypeScript, JavaScript, SQL</div>
                
                <div class="skills-category">Frameworks & Libraries</div>
                <div class="skills-list">FastAPI, Next.js, React, Zustand, REST APIs</div>
                
                <div class="skills-category">Databases & Infrastructure</div>
                <div class="skills-list">SQLite, Vercel, Render, Git, GitHub</div>
            </div>"""

new_skills = """<div class="skills-table">
                <div class="skills-category">Artificial Intelligence</div>
                <div class="skills-list">Large Language Models (LLMs), Generative AI, Retrieval-Augmented Generation (RAG), Computational Intelligence, AI Applications, Machine Learning, Prompt Engineering</div>
                
                <div class="skills-category">Languages & Backend</div>
                <div class="skills-list">Python, Java, TypeScript, FastAPI, Spring Boot, REST APIs, JWT Authentication, Backend Development</div>
                
                <div class="skills-category">Frontend & Full Stack</div>
                <div class="skills-list">React, Next.js, Full Stack Development, API Integration, Problem Solving, Scalable Architecture, Software Engineering</div>
                
                <div class="skills-category">Database & Cloud</div>
                <div class="skills-list">SQLite, MySQL, Cloud Deployment, Vercel, Render, Git, GitHub</div>
            </div>"""
content = content.replace(old_skills, new_skills)

# 4. Update Certifications
old_azure_cert = """<span class="cert-name">Microsoft Certified: Azure Fundamentals (AZ-900)</span>
                    <span class="cert-org">— Microsoft</span>"""
new_azure_cert = """<span class="cert-name">Microsoft Certified Azure Fundamentals</span>
                    <span class="cert-org">— Microsoft</span>"""
content = content.replace(old_azure_cert, new_azure_cert)

# 5. Update Achievements / Hackathons
old_achievements = """<ul class="item-bullets">
                <li>Participated in university hackathons specializing in rapid frontend mocks and collaborative full-stack implementations.</li>
                <li>Active member of KL University Technical and Coding Clubs, supporting student community events.</li>
                <li>Consistently engaged in personal full-stack software development projects.</li>
            </ul>"""
new_achievements = """<ul class="item-bullets">
                <li>Demonstrated rapid development capabilities in high-pressure hackathons, specializing in robust frontend engineering and seamless API integration.</li>
                <li>Led full stack collaboration efforts, resolving critical architectural roadblocks through effective team collaboration and problem solving.</li>
                <li>Actively engaged in building scalable personal software projects to master modern cloud deployment and AI engineering patterns.</li>
            </ul>"""
content = content.replace(old_achievements, new_achievements)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated resume.html")
