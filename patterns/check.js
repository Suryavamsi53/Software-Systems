const fs = require('fs');
const html = fs.readFileSync('binary-search-visualizer.html', 'utf8');

const sIdx = html.indexOf('<script>');
const eIdx = html.lastIndexOf('</script>');
const js = html.substring(sIdx + 8, eIdx);
try {
    new Function(js);
    console.log("Syntax OK");
} catch (e) {
    console.log(e);
}
