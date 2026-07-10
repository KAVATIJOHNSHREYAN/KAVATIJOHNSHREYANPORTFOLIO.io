import os
import re

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Title and Meta Tags
content = content.replace("AI/ML Engineer & Full Stack Developer Portfolio", "AI with Computational Intelligence Student | Full-Stack AI Developer")
content = content.replace("AI/ML Engineer", "AI with Computational Intelligence Student")
content = content.replace("AI/ML systems", "AI with Computational Intelligence systems")
content = content.replace("AI/ML & Full Stack Developer", "AI with Computational Intelligence Student | Full-Stack AI Developer")

# 2. Update Specializations Globally
content = content.replace("Artificial Intelligence and Machine Learning (AI & ML)", "AI with Computational Intelligence")
content = content.replace("AI / ML & FULL STACK DEVELOPER", "AI WITH COMPUTATIONAL INTELLIGENCE | FULL STACK DEVELOPER")
content = content.replace("AI/ML & Full Stack Developer", "Full-Stack AI Developer")
content = content.replace("AI/ML Enthusiast", "AI with Computational Intelligence")
content = content.replace("Artificial Intelligence and Machine Learning.", "AI with Computational Intelligence.")
content = content.replace("AI & ML", "AI with Computational Intelligence")
content = content.replace("AI/ML pipelines", "AI pipelines")

# 3. Hero Section
# We need to update the hero text and buttons
hero_text_old = """                    <h1 class="hero-title">
                        KAVATI JOHN <br>
                        <span class="text-gradient font-accent">SHREYAN</span>
                    </h1>
                    
                    <!-- Title Rotator (Text-based Titles) -->
                    <div class="hero-titles-carousel">
                        <span class="active-title"><i class="fa-solid fa-graduation-cap"></i> Computer Science Student | AI/ML & Full Stack Developer</span>
                        <span><i class="fa-solid fa-chart-line"></i> Data Science Learner</span>
                        <span><i class="fa-solid fa-brain"></i> AI/ML Enthusiast</span>
                        <span><i class="fa-solid fa-code"></i> Full Stack Developer</span>
                    </div>"""
hero_text_new = """                    <h1 class="hero-title">
                        KAVATI JOHN <br>
                        <span class="text-gradient font-accent">SHREYAN</span>
                    </h1>
                    
                    <!-- Title Rotator (Text-based Titles) -->
                    <div class="hero-titles-carousel">
                        <span class="active-title"><i class="fa-solid fa-graduation-cap"></i> AI with Computational Intelligence Student</span>
                        <span><i class="fa-solid fa-layer-group"></i> Full-Stack AI Developer</span>
                        <span><i class="fa-solid fa-brain"></i> LLM Application Developer</span>
                    </div>"""
content = content.replace(hero_text_old, hero_text_new)

hero_actions_old = """                    <div class="hero-actions">
                        <a href="./resume.html" target="_blank" class="btn btn-primary">
                            <i class="fa-solid fa-file-invoice"></i> View & Download Resume
                        </a>
                        <a href="#contact" class="btn btn-secondary">
                            Get In Touch
                        </a>
                    </div>"""
hero_actions_new = """                    <div class="hero-actions" style="flex-wrap: wrap; gap: 1rem;">
                        <a href="./resume.html" target="_blank" class="btn btn-primary">
                            <i class="fa-solid fa-file-invoice"></i> View Resume
                        </a>
                        <a href="https://github.com/KAVATIJOHNSHREYAN" target="_blank" class="btn btn-secondary">
                            <i class="fa-brands fa-github"></i> GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/kavati-john-shreyan-956a35366" target="_blank" class="btn btn-secondary">
                            <i class="fa-brands fa-linkedin-in"></i> LinkedIn
                        </a>
                        <a href="#projects" class="btn btn-secondary">
                            <i class="fa-solid fa-laptop-code"></i> Live Projects
                        </a>
                    </div>"""
content = content.replace(hero_actions_old, hero_actions_new)

# 4. About Section
about_old = """                        <p class="about-text">
                            I am a highly motivated Computer Science Engineering student specializing in AI with Computational Intelligence. My focus revolves around building clean, high-performance web applications and diving deep into data insights. 
                        </p>
                        <p class="about-text">
                            Continuously learning and experimenting with modern developer workflows, data architectures, and model training, I aim to merge engineering fundamentals with state-of-the-art intelligent tools.
                        </p>"""
about_new = """                        <p class="about-text">
                            I am a highly motivated Computer Science Engineering student specializing in AI with Computational Intelligence. My focus revolves around building intelligent, production-ready AI applications, leveraging Large Language Models, and implementing optimization algorithms.
                        </p>
                        <p class="about-text">
                            Continuously experimenting with modern Full-Stack AI workflows, Retrieval-Augmented Generation (RAG), and custom backend architectures, I aim to create scalable systems that solve complex, real-world problems.
                        </p>"""
content = content.replace(about_old, about_new)

objective_interests_old = """                            <div class="objective-interests">
                                <span class="interest-tag"><i class="fa-solid fa-robot"></i> AI</span>
                                <span class="interest-tag"><i class="fa-solid fa-brain"></i> Machine Learning</span>
                                <span class="interest-tag"><i class="fa-solid fa-chart-pie"></i> Data Science</span>
                                <span class="interest-tag"><i class="fa-solid fa-layer-group"></i> Full Stack Development</span>
                                <span class="interest-tag"><i class="fa-solid fa-terminal"></i> Software Engineering</span>
                            </div>"""
objective_interests_new = """                            <div class="objective-interests">
                                <span class="interest-tag"><i class="fa-solid fa-robot"></i> Artificial Intelligence</span>
                                <span class="interest-tag"><i class="fa-solid fa-microchip"></i> Computational Intelligence</span>
                                <span class="interest-tag"><i class="fa-solid fa-brain"></i> Large Language Models</span>
                                <span class="interest-tag"><i class="fa-solid fa-layer-group"></i> Intelligent Systems</span>
                                <span class="interest-tag"><i class="fa-solid fa-database"></i> RAG</span>
                                <span class="interest-tag"><i class="fa-solid fa-code"></i> Full-Stack AI Development</span>
                                <span class="interest-tag"><i class="fa-solid fa-chart-line"></i> Optimization Algorithms</span>
                                <span class="interest-tag"><i class="fa-solid fa-bolt"></i> AI-powered Applications</span>
                            </div>"""
content = content.replace(objective_interests_old, objective_interests_new)

stats_old = """                    <div class="about-stats">
                        <div class="stat-card">
                            <span class="stat-num" data-val="2">0</span>
                            <span class="stat-label">Internships Completed</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-num" data-val="3">0</span>
                            <span class="stat-label">Projects Completed</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-num" data-val="2">0</span>
                            <span class="stat-label">Hackathons Participated</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-num" data-val="15">0</span>
                            <span class="stat-label">Technical Skills</span>
                        </div>
                        <div class="stat-card">
                            <span class="stat-num" data-val="6">0</span>
                            <span class="stat-label">Learning Domains</span>
                        </div>
                    </div>"""
stats_new = """                    <div class="about-stats">
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
content = content.replace(stats_old, stats_new)

# 5. Skills Section Update to Badges
skills_old_section = re.search(r'<div class="skills-grid">.*?</section>', content, flags=re.DOTALL)
if skills_old_section:
    skills_new = """<div class="skills-grid" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
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
                </div>
            </div>
        </section>"""
    content = content.replace(skills_old_section.group(0), skills_new)


# 6. Projects Section Update
# Let's replace the whole projects section and add the new "AI with Computational Intelligence Projects" section.

projects_old_section = re.search(r'<!-- 7. Projects Portfolio Section -->.*?<!-- GitHub Stats Section -->', content, flags=re.DOTALL)

samrat_desc = "SAMRAT AETHERMIND V2 is an advanced full-stack AI ecosystem designed and developed completely from scratch to provide an intelligent, personalized, and production-ready AI experience. The platform integrates multiple Large Language Models (LLMs), including Google Gemini, Cohere, and OpenAI, allowing users to seamlessly switch between AI providers. It features an advanced Retrieval-Augmented Generation (RAG) system for document-based question answering using PDF and TXT files, secure API key management, intelligent chat management with search, pin, rename, hide and delete functionality, customizable interface themes, multilingual support, and an advanced voice assistant with optional wake word activation, multiple personalities, accents, speech controls, and continuous conversation mode. The backend includes a custom request management architecture capable of handling up to 100 API requests per minute, improving scalability while reducing dependency on standard free-tier API limitations. Built using Next.js, TypeScript, Zustand, FastAPI, Python, SQLite, Vercel, and Render, the project demonstrates expertise in AI with Computational Intelligence, LLM integration, backend engineering, deployment, responsive UI development, and modern AI application architecture."

srto_desc = "Smart Resource & Timetable Optimizer (SRTO) is an AI with Computational Intelligence project focused on solving academic scheduling and resource allocation problems using intelligent optimization techniques. The system automatically generates conflict-free timetables by considering faculty availability, classrooms, laboratories, subjects, student sections, institutional constraints, and scheduling priorities. It aims to improve resource utilization, reduce scheduling conflicts, and provide scalable intelligent timetable generation through computational intelligence algorithms and optimization methods."

new_projects_html = f"""<!-- 7. Projects Portfolio Section -->
        <section id="projects" class="projects-section section-padding">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">07 // FEATURED SYSTEM</span>
                    <h2 class="section-title">Featured <span class="text-gradient">AI System</span></h2>
                    <div class="section-line"></div>
                </div>
                
                <div class="featured-project-card">
                    <div class="project-info" style="padding: 2.5rem;">
                        <h3 class="project-title" style="font-size: 2rem; margin-bottom: 1rem;">SAMRAT AETHERMIND V2</h3>
                        <p class="project-desc" style="font-size: 1.05rem; line-height: 1.6; margin-bottom: 1.5rem; text-align: justify;">
                            {samrat_desc}
                        </p>
                        <div class="project-tags" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 2rem;">
                            <span class="tech-badge">Next.js</span>
                            <span class="tech-badge">TypeScript</span>
                            <span class="tech-badge">Python</span>
                            <span class="tech-badge">FastAPI</span>
                            <span class="tech-badge">SQLite</span>
                            <span class="tech-badge">Zustand</span>
                            <span class="tech-badge">Gemini</span>
                            <span class="tech-badge">Cohere</span>
                            <span class="tech-badge">OpenAI</span>
                            <span class="tech-badge">LLMs</span>
                            <span class="tech-badge">RAG</span>
                            <span class="tech-badge">Voice AI</span>
                            <span class="tech-badge">REST APIs</span>
                            <span class="tech-badge">Vercel</span>
                            <span class="tech-badge">Render</span>
                        </div>
                        <div class="hero-actions">
                            <a href="https://samrat-aethermind-v2.vercel.app/" target="_blank" class="btn btn-primary">Live Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
                            <a href="https://github.com/KAVATIJOHNSHREYAN/SAMRAT_AETHERMIND_V2" target="_blank" class="btn btn-secondary"><i class="fa-brands fa-github"></i> GitHub</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- 7.5. AI with Computational Intelligence Projects -->
        <section id="ai-projects" class="ai-projects-section section-padding section-bg">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">07.5 // COMPUTATIONAL INTELLIGENCE</span>
                    <h2 class="section-title">AI with Computational Intelligence <span class="text-gradient">Projects</span></h2>
                    <div class="section-line"></div>
                </div>
                
                <div class="projects-grid" style="grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <!-- Project One -->
                    <div class="project-card ai-card">
                        <div class="project-info">
                            <h3 class="project-title" style="margin-bottom: 0.5rem;">SAMRAT AETHERMIND V2</h3>
                            <div style="margin-bottom: 1rem;"><span class="status-badge ready"><i class="fa-solid fa-circle-check"></i> Production Ready</span></div>
                            <p class="project-desc">Advanced multi-LLM AI ecosystem featuring voice intelligence, Retrieval-Augmented Generation, intelligent document understanding, custom backend architecture, and production-ready AI workflows.</p>
                            <div class="hero-actions" style="margin-top: 1.5rem;">
                                <a href="https://samrat-aethermind-v2.vercel.app/" target="_blank" class="btn btn-secondary btn-sm">View Project</a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Project Two -->
                    <div class="project-card ai-card">
                        <div class="project-info">
                            <h3 class="project-title" style="margin-bottom: 0.5rem;">Smart Resource & Timetable Optimizer (SRTO)</h3>
                            <div style="margin-bottom: 1rem;"><span class="status-badge dev"><i class="fa-solid fa-person-digging"></i> Currently Under Development</span></div>
                            <p class="project-desc">{srto_desc}</p>
                            <div class="project-tags" style="margin-top: 1.5rem;">
                                <span>Python</span>
                                <span>AI with Computational Intelligence</span>
                                <span>Optimization Algorithms</span>
                                <span>Scheduling</span>
                                <span>Constraint Satisfaction</span>
                                <span>Data Structures</span>
                                <span>Algorithm Design</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- GitHub Stats Section -->"""

if projects_old_section:
    content = content.replace(projects_old_section.group(0), new_projects_html)

# Add Areas of Interest Section before "Areas of Expertise"
services_section_old = re.search(r'<!-- 9. Areas of Expertise Section -->.*?<section id="services"', content, flags=re.DOTALL)
if services_section_old:
    interest_html = """<!-- 8.5. Areas of Interest -->
        <section id="interests" class="interests-section section-padding">
            <div class="container">
                <div class="section-header">
                    <span class="section-tag">08.5 // FOCUS AREAS</span>
                    <h2 class="section-title">Areas of <span class="text-gradient">Interest</span></h2>
                    <div class="section-line"></div>
                </div>
                <div class="skills-grid" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center;">
                    <span class="skill-badge highlight">Artificial Intelligence</span>
                    <span class="skill-badge highlight">Computational Intelligence</span>
                    <span class="skill-badge highlight">Large Language Models</span>
                    <span class="skill-badge highlight">AI Agents</span>
                    <span class="skill-badge highlight">Retrieval-Augmented Generation</span>
                    <span class="skill-badge highlight">Full-Stack AI Development</span>
                    <span class="skill-badge highlight">Natural Language Processing</span>
                    <span class="skill-badge highlight">Optimization Algorithms</span>
                    <span class="skill-badge highlight">Intelligent Systems</span>
                </div>
            </div>
        </section>

        <!-- 9. Areas of Expertise Section -->
        <section id="services" """
    content = content.replace(services_section_old.group(0), interest_html)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated index.html")
