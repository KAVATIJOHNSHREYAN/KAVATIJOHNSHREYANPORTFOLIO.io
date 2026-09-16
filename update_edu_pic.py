import os

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace image for AetherMind EDU
content = content.replace('img src="./assets/project-samrat.png" alt="AetherMind EDU Dashboard"', 'img src="./assets/project-edu.png" alt="AetherMind EDU Dashboard"')

# Replace GitHub link for AetherMind EDU
# Finding the block for Project 3
start_idx = content.find('<!-- Project 3: AetherMind EDU -->')
if start_idx != -1:
    end_idx = content.find('</div>', start_idx + 500) # search space
    project_3_block = content[start_idx:end_idx]
    
    new_project_3_block = project_3_block.replace(
        'href="https://github.com/KAVATIJOHNSHREYAN"', 
        'href="https://github.com/KAVATIJOHNSHREYAN/AETHERMIND-EDU"'
    )
    
    content = content[:start_idx] + new_project_3_block + content[end_idx:]

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated AetherMind EDU project image and link.")
