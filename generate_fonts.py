import os
import json
from pathlib import Path

fonts_dir = Path("/Users/volkanyilmaz/Desktop/new/qwik-app/public/fonts")
styles = {
    "modern": {"styleId": 1, "img": "/images/app/font/modern.svg"},
    "elegant": {"styleId": 2, "img": "/images/app/font/elegant.svg"},
    "slab": {"styleId": 3, "img": "/images/app/font/slab.svg"},
    "playful": {"styleId": 4, "img": "/images/app/font/playful.svg"},
    "handwritten": {"styleId": 5, "img": "/images/app/font/handwritter.svg"},
    "minimal": {"styleId": 6, "img": "/images/app/font/minimal.svg"},
    "future": {"styleId": 7, "img": "/images/app/font/future.svg"},
    "luxury": {"styleId": 8, "img": "/images/app/font/luxury.svg"},
}

output = []
output.append("// src/components/allFonts.ts")
output.append("export interface FontOption {")
output.append("  id: number;")
output.append("  styleId: number;")
output.append("  fontFamily: string;")
output.append("  previewImg: string;")
output.append("  displayName: string;")
output.append("  file: string;")
output.append("}\n")
output.append("export const allFonts: FontOption[] = [")

current_id = 1
for style, info in styles.items():
    style_dir = fonts_dir / style
    if not style_dir.exists():
        continue
    
    output.append(f"\n  // ================= {style.upper()} (styleId: {info['styleId']}) =================")
    
    for root, _, files in os.walk(style_dir):
        for file in sorted(files):
            if file.endswith(".otf") or file.endswith(".ttf"):
                # e.g., root: /public/fonts/modern/verace
                # font file: verace-medium.otf
                rel_path = Path(root) / file
                rel_url = str(rel_path.relative_to(fonts_dir.parent))
                rel_url = "/" + rel_url # /fonts/modern/verace/verace-medium.otf
                
                # e.g. verace-medium -> "Verace"
                font_name = Path(root).name
                if font_name == style:
                    # if the file is directly inside style folder, use the file name
                    font_name = file.split('.')[0]
                
                # Make proper case, replace dashes with space
                display_name = font_name.replace("-", " ").title()
                font_family = font_name.replace("-", "-").title() # Actually, let's keep font_family simple, e.g. 'Adley'
                
                # But looking at old code, fontFamily and displayName are identical.
                # 'dree-display' -> 'Dree-Display' for fontFamily, 'Dree Display' for displayName
                font_family_clean = font_name.title()
                if "-" in font_name:
                    font_family_clean = "-".join([p.title() for p in font_name.split("-")])
                
                output.append("  {")
                output.append(f"    id: {current_id},")
                output.append(f"    styleId: {info['styleId']},")
                output.append(f'    fontFamily: "{font_family_clean}",')
                output.append(f'    displayName: "{display_name}",')
                output.append(f'    previewImg: "{info["img"]}",')
                output.append(f'    file: "{rel_url}",')
                output.append("  },")
                
                current_id += 1

output.append("];")

with open("/Users/volkanyilmaz/Desktop/new/qwik-app/src/routes/app/allFonts.ts", "w") as f:
    f.write("\n".join(output))

print(f"Generated {current_id - 1} fonts.")
