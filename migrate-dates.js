const fs = require('fs');
const path = require('path');

function replaceDateInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const newContent = content.replace(/date:\s*'(\d{4}-\d{2}-\d{2})'/g, 'date: $1');
    fs.writeFileSync(filePath, newContent, 'utf8');
}

function replaceDateInDirectory(directory) {
    fs.readdirSync(directory).forEach(file => {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceDateInDirectory(fullPath);
        } else if (fullPath.endsWith('.mdoc')) {
            replaceDateInFile(fullPath);
        }
    });
}

// Replace '/path/to/directory' with the path to your directory
replaceDateInDirectory(path.join(__dirname, 'src/content/posts'));