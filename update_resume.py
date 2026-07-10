import os
import re

file_path = "resume.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Specializations Globally
content = content.replace("Artificial Intelligence and Machine Learning (AI & ML)", "AI with Computational Intelligence")
content = content.replace("Artificial Intelligence and Machine Learning", "AI with Computational Intelligence")
content = content.replace("AI & ML", "AI with Computational Intelligence")
content = content.replace("AI/ML", "AI with Computational Intelligence")

# 2. Update Projects Section
# Replace the whole projects section
projects_old_section = re.search(r'<!-- 5\. Projects Section -->.*?<!-- 6\. Technical Skills Section -->', content, flags=re.DOTALL)

new_projects_html = """<!-- 5. Projects Section -->
        <section class="resume-section">
            <h2>Projects</h2>
            
            <div class="item-row">
                <div class="item-header">
                    <span>SAMRAT AETHERMIND V2</span>
                    <span>Next.js, Python, FastAPI, LLMs, Voice AI</span>
                </div>
                <div class="item-subheader">
                    <span>Advanced Multi-LLM AI Ecosystem</span>
                    <span>Production Ready</span>
                </div>
                <ul class="item-bullets">
                    <li>Developed a custom AI platform integrating Gemini, Cohere, and OpenAI with seamless provider switching and robust API management.</li>
                    <li>Engineered an advanced Retrieval-Augmented Generation (RAG) system for document-based question answering using PDFs and text files.</li>
                    <li>Designed an intelligent voice assistant featuring wake word activation, multiple accents, and continuous conversational modes.</li>
                    <li>Built a custom backend architecture capable of handling 100+ requests per minute for high-scalability production environments.</li>
                </ul>
            </div>

            <div class="item-row">
                <div class="item-header">
                    <span>Smart Resource & Timetable Optimizer (SRTO)</span>
                    <span>Python, Optimization Algorithms, Constraint Satisfaction</span>
                </div>
                <div class="item-subheader">
                    <span>AI with Computational Intelligence Scheduler</span>
                    <span>Under Development</span>
                </div>
                <ul class="item-bullets">
                    <li>Designing an intelligent optimization engine to automatically generate conflict-free academic timetables considering institutional constraints.</li>
                    <li>Implementing constraint satisfaction models to efficiently allocate faculty, classrooms, and student sections for maximum resource utilization.</li>
                    <li>Applying computational intelligence algorithms and data structures to deliver scalable, dynamic scheduling solutions.</li>
                </ul>
            </div>
        </section>

        <!-- 6. Technical Skills Section -->"""

if projects_old_section:
    content = content.replace(projects_old_section.group(0), new_projects_html)

# 3. Update Skills Section
skills_old_section = re.search(r'<!-- 6\. Technical Skills Section -->.*?<!-- 7\. Certifications Section -->', content, flags=re.DOTALL)
new_skills_html = """<!-- 6. Technical Skills Section -->
        <section class="resume-section">
            <h2>Skills</h2>
            <div class="skills-table">
                <div class="skills-category">Core Expertise</div>
                <div class="skills-list">Artificial Intelligence, Computational Intelligence, Large Language Models (LLMs), Prompt Engineering, RAG</div>
                
                <div class="skills-category">Programming & Languages</div>
                <div class="skills-list">Python, TypeScript, JavaScript, SQL</div>
                
                <div class="skills-category">Frameworks & Libraries</div>
                <div class="skills-list">FastAPI, Next.js, React, Zustand, REST APIs</div>
                
                <div class="skills-category">Databases & Infrastructure</div>
                <div class="skills-list">SQLite, Vercel, Render, Git, GitHub</div>
            </div>
        </section>

        <!-- 7. Certifications Section -->"""

if skills_old_section:
    content = content.replace(skills_old_section.group(0), new_skills_html)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated resume.html")
