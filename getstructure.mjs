import fs from 'fs';
import path from 'path';

function getDirectoryStructure(dir, relativePath = '.') {
  const result = {};

  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const relativeFilePath = path.join(relativePath, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      if (file !== 'node_modules') {
        result[relativeFilePath] = getDirectoryStructure(fullPath, relativeFilePath);
      }
    } else {
      result[relativeFilePath] = 'file';
    }
  });

  return result;
}

const projectDir = path.resolve();
const structure = getDirectoryStructure(projectDir);

const structureJson = JSON.stringify(structure, null, 2);

fs.writeFileSync('structure.txt', structureJson, 'utf8');
console.log('Directory structure saved to structure.txt');
