const fs = require('fs');
const html = fs.readFileSync('binary-search-visualizer.html', 'utf8');

const matches = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)];

for (let i = 0; i < matches.length; i++) {
    const content = matches[i][1].trim();
    if (!content) continue;
    try {
        new Function(content);
        console.log(`Script block ${i} OK`);
    } catch (err) {
        console.error(`Script block ${i} ERROR:`, err);
    }
}
