import re

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Replace the broken Vercel instance with a working public mirror
content = content.replace("github-readme-stats.vercel.app", "github-readme-stats-eight-theta.vercel.app")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Updated GitHub API URLs")
