const fs = require('fs');
const file = 'src/routes/app/allFavicons.ts';
const content = fs.readFileSync(file, 'utf8');

let counter = 1;
let currentCategory = null;

const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  const catMatch = lines[i].match(/category:\s*'([^']+)'/);
  if (catMatch) {
    if (currentCategory !== catMatch[1]) {
      currentCategory = catMatch[1];
      counter = 1;
    }
  }
  
  if (/styleId:\s*1,/.test(lines[i])) {
    lines[i] = lines[i].replace(/styleId:\s*1,/, `styleId: ${counter},`);
    counter++;
    if (counter > 8) counter = 1;
  }
}

fs.writeFileSync(file, lines.join('\n'));
console.log('Fixed favicons!');
