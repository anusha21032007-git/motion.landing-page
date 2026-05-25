const fs = require('fs');
const path = require('path');

const srcDir = "c:\\Users\\Anusha Narasimman\\Downloads\\ezgif-8330b8ed2e2b5ca8-png-split";
const destDir = "c:\\Users\\Anusha Narasimman\\dyad-apps\\neon-iguana-wag\\public\\ezgif";

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

fs.readdirSync(srcDir).forEach(file => {
    if (file.endsWith('.png')) {
        fs.copyFileSync(path.join(srcDir, file), path.join(destDir, file));
    }
});
console.log('Copy complete!');
