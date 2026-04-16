const fs = require('fs');
const path = require('path');

const replacements = [
  { search: /147, 51, 234/g, replace: '37, 99, 235' },
  { search: /#9333EA/gi, replace: '#2563EB' },
  { search: /#7E22CE/gi, replace: '#1D4ED8' },
  { search: /#A855F7/gi, replace: '#3B82F6' },
  { search: /#581C87/gi, replace: '#1E3A8A' },
  { search: /bg-purple-700/g, replace: 'bg-blue-700' },
  { search: /bg-purple-500/g, replace: 'bg-blue-500' },
  { search: /blobPurple/g, replace: 'blobBlue' },
  { search: /pillPurple/g, replace: 'pillBlue' },
  { search: /tagIconPurple/g, replace: 'tagIconBlue' },
  { search: /Purple/g, replace: 'Blue' },
];

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.css') || file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content;
      for (const { search, replace } of replacements) {
        newContent = newContent.replace(search, replace);
      }
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(__dirname, '..', 'app'));
processDirectory(path.join(__dirname, '..', 'components'));
