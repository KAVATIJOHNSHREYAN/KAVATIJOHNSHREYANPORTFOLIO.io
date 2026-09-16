import os
import re

file_path = "resume.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix the broken skills section
broken_section = """        <!-- 6. Technical Skills Section -->
        <section class="resume-section">
kills-table">
                <div class="skills-category">Core Expertise</div>
                <div class="skills-list">Artificial Intelligence, Computational Intelligence, Large Language Models (LLMs), Prompt Engineering, RAG</div>
                
                <div class="skills-category">Programming & Languages</div>
                <div class="skills-list">Python, TypeScript, JavaScript, SQL</div>
                
                <div class="skills-category">Frameworks & Libraries</div>
                <div class="skills-list">FastAPI, Next.js, React, Zustand, REST APIs</div>
                
                <div class="skills-category">Databases & Infrastructure</div>
                <div class="skills-list">SQLite, Vercel, Render, Git, GitHub</div>
            </div>
        </section>"""

fixed_section = """        <!-- 6. Technical Skills Section -->
        <section class="resume-section">
            <h2>Technical Skills</h2>
            <div class="skills-table">
                <div class="skills-category">Artificial Intelligence</div>
                <div class="skills-list">Large Language Models (LLMs), Generative AI, Retrieval-Augmented Generation (RAG), Computational Intelligence, AI Applications, Machine Learning, Prompt Engineering</div>
                
                <div class="skills-category">Languages & Backend</div>
                <div class="skills-list">Python, Java, TypeScript, FastAPI, Spring Boot, REST APIs, JWT Authentication, Backend Development</div>
                
                <div class="skills-category">Frontend & Full Stack</div>
                <div class="skills-list">React, Next.js, Full Stack Development, API Integration, Problem Solving, Scalable Architecture, Software Engineering</div>
                
                <div class="skills-category">Database & Cloud</div>
                <div class="skills-list">SQLite, MySQL, Cloud Deployment, Vercel, Render, Git, GitHub</div>
            </div>
        </section>"""

content = content.replace(broken_section, fixed_section)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Fixed skills section in resume.html")
