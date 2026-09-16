import re

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Hero Description (lines ~154-156)
old_hero_desc = """<p class="hero-desc">
                        Computer Science Engineering student at KL University specializing in AI with Computational Intelligence. Passionate about building robust full-stack web architectures, optimizing data science models, and implementing intelligent AI workflows.
                    </p>"""
new_hero_desc = """<p class="hero-desc">
                        Results-driven AI Engineer and Full Stack Architect specializing in large language models, retrieval-augmented generation (RAG), and scalable backend architectures. Proven expertise in building production-ready AI workflows and highly optimized web platforms.
                    </p>"""
content = content.replace(old_hero_desc, new_hero_desc)

# 2. Update About Me text (lines ~220-224)
old_about = """<p class="about-text">
                            I am a highly motivated Computer Science Engineering student specializing in AI with Computational Intelligence. My focus revolves around building intelligent, production-ready AI applications, leveraging Large Language Models, and implementing optimization algorithms.
                        </p>
                        <p class="about-text">
                            Continuously experimenting with modern Full-Stack AI workflows, Retrieval-Augmented Generation (RAG), and custom backend architectures, I aim to create scalable systems that solve complex, real-world problems.
                        </p>"""
new_about = """<p class="about-text">
                            I am an Elite FAANG-level Portfolio Architect and Software Engineer specializing in Artificial Intelligence and Computational Intelligence. My professional expertise centers around engineering scalable backend systems, leveraging Generative AI, and deploying production-ready Large Language Model applications.
                        </p>
                        <p class="about-text">
                            With a strong foundation in complex problem solving and full-stack AI development, I architect intelligent solutions that bridge the gap between advanced RAG workflows and robust enterprise software architectures.
                        </p>"""
content = content.replace(old_about, new_about)

# 3. Update Career Objective (lines ~230-231)
old_objective = """<p>
                                To secure a challenging engineering role specializing in AI pipelines and Full Stack architectures, leveraging strong theoretical and practical computer science foundations to design smart, scalable software solutions.
                            </p>"""
new_objective = """<p>
                                To secure a high-impact engineering role as a Software Engineer, AI Engineer, Machine Learning Engineer, GenAI Engineer, Backend Engineer, or Full Stack Developer, architecting scalable, data-driven systems and intelligent software solutions.
                            </p>"""
content = content.replace(old_objective, new_objective)

# 4. Update Stats Section (lines ~248-264)
old_stats = """<div class="about-stats">
                        <div class="stat-card">
                            <span class="stat-num" data-val="2">+</span>
                            <span class="stat-label">Projects</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-num" data-val="20">+</span>
                            <span class="stat-label">Technologies</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-num" data-val="3">0</span>
                            <span class="stat-label">LLM Providers</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-num" data-val="2">0</span>
                            <span class="stat-label">Current AI Systems</span>
                        </div>
                    </div>"""
new_stats = """<div class="about-stats">
                        <div class="stat-card">
                            <span class="stat-num" data-val="3">+</span>
                            <span class="stat-label">Featured Projects</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-num" data-val="20">+</span>
                            <span class="stat-label">Technologies</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-num" data-val="3">0</span>
                            <span class="stat-label">LLM Providers</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-num" data-val="2">0</span>
                            <span class="stat-label">Live AI Platforms</span>
                        </div>
                    </div>"""
content = content.replace(old_stats, new_stats)

# 5. Update Tech Stack (Skills Grid) (lines ~333-354)
old_skills_grid = """<div class="skills-grid" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
                    <span class="skill-badge">Artificial Intelligence</span>
                    <span class="skill-badge">Computational Intelligence</span>
                    <span class="skill-badge">Large Language Models</span>
                    <span class="skill-badge">Prompt Engineering</span>
                    <span class="skill-badge">Retrieval-Augmented Generation</span>
                    <span class="skill-badge">Natural Language Processing</span>
                    <span class="skill-badge">AI Agents</span>
                    <span class="skill-badge">Python</span>
                    <span class="skill-badge">FastAPI</span>
                    <span class="skill-badge">Next.js</span>
                    <span class="skill-badge">TypeScript</span>
                    <span class="skill-badge">React</span>
                    <span class="skill-badge">Zustand</span>
                    <span class="skill-badge">SQLite</span>
                    <span class="skill-badge">REST APIs</span>
                    <span class="skill-badge">Git</span>
                    <span class="skill-badge">GitHub</span>
                    <span class="skill-badge">Vercel</span>
                    <span class="skill-badge">Render</span>
                    <span class="skill-badge">Responsive UI Development</span>
                </div>"""
new_skills_grid = """<div class="skills-grid" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
                    <span class="skill-badge">Artificial Intelligence</span>
                    <span class="skill-badge">Python</span>
                    <span class="skill-badge">LLMs</span>
                    <span class="skill-badge">RAG</span>
                    <span class="skill-badge">FastAPI</span>
                    <span class="skill-badge">Next.js</span>
                    <span class="skill-badge">TypeScript</span>
                    <span class="skill-badge">React</span>
                    <span class="skill-badge">Spring Boot</span>
                    <span class="skill-badge">Java</span>
                    <span class="skill-badge">REST APIs</span>
                    <span class="skill-badge">JWT</span>
                    <span class="skill-badge">SQLite</span>
                    <span class="skill-badge">MySQL</span>
                    <span class="skill-badge">Git</span>
                    <span class="skill-badge">GitHub</span>
                    <span class="skill-badge">Vercel</span>
                    <span class="skill-badge">Render</span>
                </div>"""
content = content.replace(old_skills_grid, new_skills_grid)

# 6. Update Azure Certification wording (lines ~423-436)
old_azure_cert_title = '<h3 class="cert-title">Azure Fundamentals (AZ-900)</h3>'
new_azure_cert_title = '<h3 class="cert-title">Microsoft Certified Azure Fundamentals</h3>'
content = content.replace(old_azure_cert_title, new_azure_cert_title)

old_azure_cert_verified = '<span class="cert-status verified"><i class="fa-solid fa-circle-check"></i> Verified (Score Report)</span>'
new_azure_cert_verified = '<span class="cert-status verified"><i class="fa-solid fa-circle-check"></i> Verified Certificate</span>'
content = content.replace(old_azure_cert_verified, new_azure_cert_verified)

old_azure_cert_img_alt = 'alt="Microsoft Azure Fundamentals AZ-900 Score Report"'
new_azure_cert_img_alt = 'alt="Microsoft Certified Azure Fundamentals"'
content = content.replace(old_azure_cert_img_alt, new_azure_cert_img_alt)

# 7. Update Hackathons wording (lines ~457-478)
old_hack_intro = """<p>
                            Participating in collaborative development hackathons has shaped my abilities to design functional product skeletons rapidly, work under tight deadlines, and align technologies dynamically.
                        </p>"""
new_hack_intro = """<p>
                            Leveraging rapid development and problem-solving skills to engineer highly functional, full-stack prototypes under tight deadlines, with a strong focus on seamless API integration and scalable architecture.
                        </p>"""
content = content.replace(old_hack_intro, new_hack_intro)

old_hack_card_1 = """<p>Created highly responsive, accessible user interfaces within short intervals, enabling teams to present working interactive mockups to juries.</p>"""
new_hack_card_1 = """<p>Engineered highly responsive, component-driven user interfaces at high velocity, ensuring exceptional frontend engineering standards and robust client-side performance.</p>"""
content = content.replace(old_hack_card_1, new_hack_card_1)

old_hack_card_2 = """<p>Integrated APIs, databases, and UI layouts under speed runs, ensuring clean server-to-client operations and presentation readiness.</p>"""
new_hack_card_2 = """<p>Spearheaded full stack collaboration efforts, effectively integrating complex REST APIs, database schemas, and frontend layouts into cohesive, production-ready prototypes.</p>"""
content = content.replace(old_hack_card_2, new_hack_card_2)

# 8. Update Projects section completely (lines ~494 to 620)
# We will use regex or find to replace the whole projects grid
projects_grid_start = content.find('<div class="projects-grid">')
projects_grid_end = content.find('<!-- GitHub Stats Section -->')
if projects_grid_start != -1 and projects_grid_end != -1:
    new_projects_section_html = """<div class="projects-grid">
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
                                <span>TypeScript</span>
                                <span>FastAPI</span>
                                <span>Python</span>
                                <span>RAG</span>
                            </div>
                            <h3 class="project-title">SAMRAT AETHERMIND V2</h3>
                            <div style="margin-bottom: 1rem;"><span class="status-badge ready"><i class="fa-solid fa-circle-check"></i> Completed (Live)</span></div>
                            <p class="project-desc">
                                An advanced AI-powered multi-LLM productivity assistant supporting intelligent conversations, document understanding, Retrieval-Augmented Generation (RAG), voice interaction, and modern AI workflows.
                            </p>
                            <div class="project-highlights">
                                <strong>Architecture:</strong> Engineered a highly scalable custom backend using FastAPI, providing robust session management and seamless model switching between Gemini, OpenAI, and Cohere architectures.
                            </div>
                            <div class="project-impact" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <span><strong>Technologies:</strong> Next.js, TypeScript, FastAPI, Python, SQLite, Zustand, Vercel, Render.</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Project 2: SRTO -->
                    <div class="project-card" data-category="web">
                        <div class="project-img-wrapper">
                            <img src="./assets/project-srto.png" alt="Smart Resource & Timetable Optimizer">
                            <div class="project-overlay">
                                <a href="https://github.com/KAVATIJOHNSHREYAN" target="_blank" rel="noopener noreferrer" aria-label="View Project on GitHub"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="project-tags">
                                <span>React</span>
                                <span>TypeScript</span>
                                <span>FastAPI</span>
                                <span>Python</span>
                                <span>SQLite</span>
                            </div>
                            <h3 class="project-title">Smart Resource & Timetable Optimizer</h3>
                            <div style="margin-bottom: 1rem;"><span class="status-badge ready"><i class="fa-solid fa-circle-check"></i> Completed (Live)</span></div>
                            <p class="project-desc">
                                An AI-assisted university resource and timetable optimization platform designed to automate timetable generation, faculty allocation, classroom management, and institutional scheduling workflows.
                            </p>
                            <div class="project-highlights">
                                <strong>Problem Solved:</strong> Replaces manual academic scheduling by deploying automated timetable validation, advanced reporting, and conflict-free institutional administration dashboards via secure REST APIs.
                            </div>
                            <div class="project-impact font-weight-bold" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <span><strong>Result & Tech:</strong> React, TypeScript, FastAPI, Python, SQLite, JWT Authentication. Deployed on Vercel and Render.</span>
                            </div>
                        </div>
                    </div>
                </div>

            <div class="container">
                <!-- Additional AI Projects -->
                <div class="section-header" style="margin-top: 5rem;">
                    <span class="section-tag">07.2 // EDUCATION AI</span>
                    <h2 class="section-title">In-Development <span class="text-gradient">Projects</span></h2>
                    <div class="section-line"></div>
                </div>
                
                <div class="projects-grid" style="margin-top: 2rem;">
                    <!-- Project 3: AetherMind EDU -->
                    <div class="project-card" data-category="ai">
                        <div class="project-img-wrapper">
                            <img src="./assets/project-samrat.png" alt="AetherMind EDU Dashboard"> <!-- Using Samrat as placeholder image as instructed by design patterns -->
                            <div class="project-overlay">
                                <a href="https://github.com/KAVATIJOHNSHREYAN" target="_blank" rel="noopener noreferrer" aria-label="View Project on GitHub"><i class="fa-brands fa-github"></i></a>
                            </div>
                        </div>
                        <div class="project-info">
                            <div class="project-tags">
                                <span>Next.js</span>
                                <span>React</span>
                                <span>FastAPI</span>
                                <span>AI Agents</span>
                                <span>LLMs</span>
                            </div>
                            <h3 class="project-title">AetherMind EDU</h3>
                            <div style="margin-bottom: 1rem;"><span class="status-badge dev"><i class="fa-solid fa-person-digging"></i> 🚧 Under Development</span></div>
                            <p class="project-desc">
                                An AI-powered education platform focused on personalized learning, intelligent tutoring, career guidance, document understanding, and adaptive AI-assisted education.
                            </p>
                            <div class="project-highlights">
                                <strong>Architecture:</strong> Designing scalable AI education architecture leveraging modular AI services, intelligent LLM agents, and Retrieval-Augmented Generation workflows.
                            </div>
                            <div class="project-impact font-weight-bold" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <span><strong>Technologies:</strong> Next.js, React, TypeScript, FastAPI, Python, LLMs, RAG, AI Agents, SQLite.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        """
    content = content[:projects_grid_start] + new_projects_section_html + content[projects_grid_end:]

# 9. Update Open Source wording (lines ~637)
old_open_source = """<p>Exploring and contributing to open-source software, building templates, and sharing full-stack academic projects.</p>"""
new_open_source = """<p>Currently focused on building production-ready AI products and preparing selected components for future open-source contributions.</p>"""
content = content.replace(old_open_source, new_open_source)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated index.html")
