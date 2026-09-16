import os

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace profile.png with profile.jpg
content = content.replace("profile.png", "profile.jpg")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated profile picture extension in index.html")
