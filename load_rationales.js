const fs = require('fs');
const incoming = JSON.parse(fs.readFileSync('biology_rationales.json', 'utf8'));
const dest = 'artifacts/nmat-exam/public/rationales.json';
const existing = fs.existsSync(dest) ? JSON.parse(fs.readFileSync(dest, 'utf8')) : {};
Object.assign(existing, incoming);
fs.writeFileSync(dest, JSON.stringify(existing, null, 2));
fs.copyFileSync(dest, 'artifacts/nmat-exam/dist/public/rationales.json');
console.log('Done. Saved', Object.keys(incoming).length, 'biology rationales.');
