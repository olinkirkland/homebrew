import fs from 'fs';

/**
 * This script generates a file from the assets in the specified directory.
 * The file (index.json) contains an array of objects with the following properties:
 * - name: The name of the asset
 * - path: The path to the asset
 * - type: The type of the asset (e.g., image, video)
 * - size: The size of the asset in bytes
 * 
 * To run this .ts file from the terminal, use the following command:
 * npx ts-node client/scripts/generate-assets-index.ts
 */




const assetsFilePath = 'public/assets';
const indexFilePath = 'public/asset-index.json';

console.log('Generating asset index...');
type Asset = {
    name: string;
    path: string;
    type: string;
    size: number;
}

// Get all files in the assets directory, including subdirectories
const files = getFiles(assetsFilePath);
const assets = files.map(file => {
    const stats = fs.statSync(file);
    const asset: Asset = {
        name: file.split('/').pop() || '',
        path: getFilePathWithoutPublic(file),
        type: file.split('.').pop() || '',
        size: stats.size
    };
    return asset;
});

// Write the asset index to a file
fs.writeFileSync(indexFilePath, JSON.stringify(assets, null, 4));
console.log(`${assets.length} assets indexed.`);

function getFiles(dir: string, files: string[] = []) {
    const filesInDir = fs.readdirSync(dir);
    for (const file of filesInDir) {
        const name = `${dir}/${file}`;
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files);
        } else {
            files.push(name);
        }
    }
    return files;
}

function getFilePathWithoutPublic(file: string): string {
    // public/foo/bar.jpg -> foo/bar.jpg
    const filePathArray = file.split('/');
    filePathArray.shift(); // Remove 'public'
    return filePathArray.join('/');
}
