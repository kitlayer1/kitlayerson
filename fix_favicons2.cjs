const fs = require('fs');
const file = 'src/routes/app/allFavicons.ts';
const content = fs.readFileSync(file, 'utf8');

const lines = content.split('\n');
let newLines = [];

let categoryIcons = {};
let prefix = [];
let suffix = [];
let insideArray = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  if (line.includes('export const allFavicons: Favicon[] = [')) {
    insideArray = true;
    prefix.push(line);
    continue;
  }
  if (insideArray && line.trim() === '];') {
    insideArray = false;
    suffix.push(line);
    continue;
  }
  
  if (!insideArray) {
    if (suffix.length === 0) {
      prefix.push(line);
    } else {
      suffix.push(line);
    }
  } else {
    // inside the array
    const match = /{.*category:\s*'([^']+)'.*iconPath:\s*'([^']+)'.*name:\s*'([^']+)'\s*}/.exec(line);
    if (match) {
      const cat = match[1];
      const iconPath = match[2];
      const name = match[3];
      if (!categoryIcons[cat]) {
        categoryIcons[cat] = [];
      }
      if (!categoryIcons[cat].some(icon => icon.iconPath === iconPath)) {
        categoryIcons[cat].push({ iconPath, name });
      }
    }
  }
}

for (const cat in categoryIcons) {
  newLines.push('');
  newLines.push(`  // ─── ${cat} ───────────────────────────────────────────`);
  let id = 1;
  categoryIcons[cat].forEach(icon => {
    for (let s = 1; s <= 8; s++) {
      newLines.push(`  { id: ${id++}, category: '${cat}', styleId: ${s}, iconPath: '${icon.iconPath}', name: '${icon.name}' },`);
    }
  });
}

const finalContent = prefix.join('\n') + '\n' + newLines.join('\n') + '\n' + suffix.join('\n');
fs.writeFileSync(file, finalContent);
console.log('Duplicated favicons to styleId 1-8!');
