// Run with: node scripts/generate-placeholders.js
// Creates placeholder hero images until real ones are added
const fs = require('fs');
const path = require('path');

const heroDir = path.join(__dirname, '../public/images/hero');
fs.mkdirSync(heroDir, { recursive: true });

for (let i = 1; i <= 10; i++) {
  const num = String(i).padStart(2, '0');
  const filename = path.join(heroDir, `hero-${num}.jpg`);
  if (!fs.existsSync(filename)) {
    // Create a minimal valid JPEG placeholder
    // Replace these files with your actual hero images
    fs.writeFileSync(filename, `PLACEHOLDER: Replace with hero-${num}.jpg`);
    console.log(`Created placeholder: hero-${num}.jpg`);
  }
}
console.log('Done. Replace placeholder files with real images before launch.');
