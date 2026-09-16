import os

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace azure certificate image
content = content.replace('src="./assets/cert-azure.png"', 'src="./assets/cert-azure.jpg"')
content = content.replace('href="./assets/cert-azure.png"', 'href="./assets/cert-azure.jpg"')

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated index.html to use cert-azure.jpg")
