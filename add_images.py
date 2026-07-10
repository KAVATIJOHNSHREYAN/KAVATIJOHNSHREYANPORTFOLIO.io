import re

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Featured Project to include image
featured_old = """                <div class="featured-project-card">
                    <div class="project-info" style="padding: 2.5rem;">"""

featured_new = """                <div class="featured-project-card" style="display: flex; flex-direction: column;">
                    <div class="project-img-wrapper" style="width: 100%; height: auto; max-height: 450px; overflow: hidden;">
                        <img src="./assets/project-samrat.png" alt="SAMRAT AETHERMIND V2 Dashboard" style="width: 100%; height: 100%; object-fit: cover; border-bottom: 1px solid var(--border-color);">
                    </div>
                    <div class="project-info" style="padding: 2.5rem;">"""

content = content.replace(featured_old, featured_new)

# 2. Update AI Cards to include images
samrat_card_old = """                    <div class="project-card ai-card">
                        <div class="project-info">
                            <h3 class="project-title" style="margin-bottom: 0.5rem;">SAMRAT AETHERMIND V2</h3>"""

samrat_card_new = """                    <div class="project-card ai-card" style="padding: 0; overflow: hidden;">
                        <div class="project-img-wrapper" style="height: 220px; overflow: hidden; border-bottom: 1px solid var(--border-color);">
                            <img src="./assets/project-samrat.png" alt="SAMRAT AETHERMIND V2" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div class="project-info" style="padding: 1.5rem;">
                            <h3 class="project-title" style="margin-bottom: 0.5rem;">SAMRAT AETHERMIND V2</h3>"""

content = content.replace(samrat_card_old, samrat_card_new)

srto_card_old = """                    <!-- Project Two -->
                    <div class="project-card ai-card">
                        <div class="project-info">
                            <h3 class="project-title" style="margin-bottom: 0.5rem;">Smart Resource & Timetable Optimizer (SRTO)</h3>"""

srto_card_new = """                    <!-- Project Two -->
                    <div class="project-card ai-card" style="padding: 0; overflow: hidden;">
                        <div class="project-img-wrapper" style="height: 220px; overflow: hidden; border-bottom: 1px solid var(--border-color);">
                            <img src="./assets/project-srto.png" alt="Smart Resource & Timetable Optimizer" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div class="project-info" style="padding: 1.5rem;">
                            <h3 class="project-title" style="margin-bottom: 0.5rem;">Smart Resource & Timetable Optimizer (SRTO)</h3>"""

content = content.replace(srto_card_old, srto_card_new)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated index.html to include images for new projects")
