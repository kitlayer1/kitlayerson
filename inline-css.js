import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('./src', function(filePath) {
    if (!filePath.endsWith('.tsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Find all CSS imports: import "./something.css"; or import '...';
    // excluding those that already have ?inline
    const cssImportRegex = /import\s+['"]([^'"]+\.css)['"]\s*;/g;
    
    let match;
    let cssImports = [];
    while ((match = cssImportRegex.exec(content)) !== null) {
        cssImports.push({
            full: match[0],
            path: match[1]
        });
    }
    
    if (cssImports.length === 0) return;
    
    console.log(`Processing ${filePath} (${cssImports.length} imports)`);
    
    // Replace imports with inline imports
    let newContent = content;
    let useStyleCalls = [];
    
    cssImports.forEach((imp, index) => {
        const varName = `style${index}`;
        newContent = newContent.replace(imp.full, `import ${varName} from "${imp.path}?inline";`);
        useStyleCalls.push(`useStyles$(${varName});`);
    });
    
    // Add useStyles$ to the @builder.io/qwik import if not present
    if (!newContent.includes('useStyles$')) {
        if (newContent.includes('@builder.io/qwik"')) {
            newContent = newContent.replace(/import\s*{([^}]+)}\s*from\s*['"]@builder\.io\/qwik['"]/, (match, p1) => {
                return `import { ${p1.trim()}, useStyles$ } from '@builder.io/qwik'`;
            });
        } else {
            newContent = `import { useStyles$ } from '@builder.io/qwik';\n` + newContent;
        }
    }
    
    // Inject useStyles$(...) inside component$(() => {
    // Find the first component$(() => {
    const compRegex = /component\$[\s\S]*?=>\s*{/;
    const compMatch = newContent.match(compRegex);
    
    if (compMatch) {
        const injectIdx = compMatch.index + compMatch[0].length;
        const injected = `\n  ${useStyleCalls.join('\n  ')}\n`;
        newContent = newContent.slice(0, injectIdx) + injected + newContent.slice(injectIdx);
        
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`  Updated.`);
    } else {
        console.log(`  WARNING: No component$ found in ${filePath}`);
    }
});
