import re

file_path = "style.css"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Remove the span 2 rule
span_rule = """.stat-card:last-child {
    grid-column: span 2;
}"""

if span_rule in content:
    content = content.replace(span_rule, "/* .stat-card:last-child rule removed for perfect 2x2 grid */")
else:
    # Use regex just in case
    content = re.sub(r'\.stat-card:last-child\s*\{\s*grid-column:\s*span\s*2;\s*\}', '/* Removed span 2 */', content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed stat-card grid layout")
