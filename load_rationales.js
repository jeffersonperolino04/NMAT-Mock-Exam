const fs = require('fs');

// Auto-detect any *_rationales.json file in the current directory (excluding the destination)
const files = fs.readdirSync('.').filter(f => f.endsWith('_rationales.json'));

if (files.length === 0) {
  console.error('No *_rationales.json file found in current directory.');
  process.exit(1);
}

const dest = 'artifacts/nmat-exam/public/rationales.json';
const existing = fs.existsSync(dest) ? JSON.parse(fs.readFileSync(dest, 'utf8')) : {};

let totalAdded = 0;
files.forEach(file => {
  const incoming = JSON.parse(fs.readFileSync(file, 'utf8'));
  const count = Object.keys(incoming).length;
  Object.assign(existing, incoming);
  totalAdded += count;
  console.log(`Loaded ${count} rationales from ${file}`);
});

fs.writeFileSync(dest, JSON.stringify(existing, null, 2));
fs.copyFileSync(dest, 'artifacts/nmat-exam/dist/public/rationales.json');
console.log(`Done. Total added: ${totalAdded}. Total in rationales.json: ${Object.keys(existing).length}`);
