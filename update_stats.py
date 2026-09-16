import os

file_path = "index.html"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update projects count
old_stat = '<span class="stat-num" data-val="3">+'
new_stat = '<span class="stat-num" data-val="4">+'
content = content.replace(old_stat, new_stat)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated stats counter in index.html")
