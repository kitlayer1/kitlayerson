import os
from pathlib import Path
import json

with open("/Users/volkanyilmaz/Desktop/new/qwik-app/src/global.css", "r") as f:
    lines = f.readlines()

# Find where the @font-face rules start
start_index = -1
for i, line in enumerate(lines):
    if "/* ================= ELEGANT (styleId: 2) ================= */" in line:
        start_index = i
        break

if start_index == -1:
    # Just in case, let's find the first @font-face
    for i, line in enumerate(lines):
        if "@font-face {" in line:
            start_index = i
            break

if start_index == -1:
    start_index = len(lines)

base_css = lines[:start_index]

fonts_dir = Path("/Users/volkanyilmaz/Desktop/new/qwik-app/public/fonts")
styles = ["modern", "elegant", "slab", "playful", "handwritten", "minimal", "future", "luxury"]

css_output = []
for style in styles:
    style_dir = fonts_dir / style
    if not style_dir.exists():
        continue
        
    css_output.append(f"\n/* ================= {style.upper()} ================= */\n")
    
    for root, _, files in os.walk(style_dir):
        for file in sorted(files):
            if file.endswith(".otf") or file.endswith(".ttf"):
                rel_path = Path(root) / file
                rel_url = str(rel_path.relative_to(fonts_dir.parent))
                rel_url = "/" + rel_url
                
                font_name = Path(root).name
                if font_name == style:
                    font_name = file.split('.')[0]
                
                font_family_clean = font_name.title()
                if "-" in font_name:
                    font_family_clean = "-".join([p.title() for p in font_name.split("-")])
                
                format_type = "opentype" if file.endswith(".otf") else "truetype"
                
                css_output.append("@font-face {")
                css_output.append(f'  font-family: "{font_family_clean}";')
                css_output.append(f'  src: url("{rel_url}") format("{format_type}");')
                css_output.append("}\n")

with open("/Users/volkanyilmaz/Desktop/new/qwik-app/src/global.css", "w") as f:
    f.writelines(base_css)
    f.write("\n".join(css_output))

print(f"Added {len([l for l in css_output if '@font-face' in l])} font faces to global.css")
