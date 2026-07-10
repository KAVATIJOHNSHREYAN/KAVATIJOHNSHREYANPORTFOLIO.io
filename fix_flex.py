import re

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix 1: Citizen
old_c = """<div class="project-impact" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <strong>Technologies:</strong> HTML, CSS, JavaScript (ES6+), Java Spring Boot, MySQL, REST APIs, and RBAC.
                            </div>"""
new_c = """<div class="project-impact" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <span><strong>Technologies:</strong> HTML, CSS, JavaScript (ES6+), Java Spring Boot, MySQL, REST APIs, and RBAC.</span>
                            </div>"""
content = content.replace(old_c, new_c)

# Fix 2: Student ECA
old_s = """<div class="project-impact font-weight-bold" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <strong>Result & Tech:</strong> Built using React.js, Spring Boot, MySQL. <strong>Features a custom PDF download utility to export a certified student activity report.</strong>
                            </div>"""
new_s = """<div class="project-impact font-weight-bold" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <span><strong>Result & Tech:</strong> Built using React.js, Spring Boot, MySQL. <strong>Features a custom PDF download utility to export a certified student activity report.</strong></span>
                            </div>"""
content = content.replace(old_s, new_s)

# Fix 3: SAMRAT
old_sam = """<div class="project-impact" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <strong>Technologies:</strong> TypeScript, Zustand, SQLite, Vercel, Render.
                            </div>"""
new_sam = """<div class="project-impact" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <span><strong>Technologies:</strong> TypeScript, Zustand, SQLite, Vercel, Render.</span>
                            </div>"""
content = content.replace(old_sam, new_sam)

# Fix 4: SRTO
old_srto = """<div class="project-impact font-weight-bold" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <strong>Result & Tech:</strong> Built using Python, Constraint Satisfaction, and Computational Intelligence algorithms.
                            </div>"""
new_srto = """<div class="project-impact font-weight-bold" style="margin-top: 1rem;">
                                <i class="fa-solid fa-circle-nodes text-orange"></i> <span><strong>Result & Tech:</strong> Built using Python, Constraint Satisfaction, and Computational Intelligence algorithms.</span>
                            </div>"""
content = content.replace(old_srto, new_srto)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed project-impact layout squishing issue in index.html")
