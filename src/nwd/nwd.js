import path from "path";
import fs from "fs/promises";

// Print the current directory
export function printCurrentDir() {
    console.log(`You are currently in ${process.cwd()}`);
}

// Get the root directory
export function getRootDirectory() {
    return path.parse(process.cwd()).root;
}

export async function changeDirectory(newDir) {
    const resolvedPath = path.isAbsolute(newDir) ? newDir : path.resolve(newDir);

    try {
        if (!await pathExists(resolvedPath)) {
            throw new Error(`Directory "${newDir}" does not exist.`);
        }

        const rootDir = getRootDirectory();

        // Check if the resolved path is within the root directory
        if (resolvedPath.startsWith(rootDir)) {
            process.chdir(resolvedPath);
        }
    } catch (e) {
        console.error(e.message);
        throw e;
    }
}

// List directory contents
export async function listDirectoryContents() {
    const dir = process.cwd();

    try {
        const dirContent = await fs.readdir(dir, {withFileTypes: true});

        const dirFolders = dirContent.filter(item => item.isDirectory()).map(item => item.name);
        const dirFiles = dirContent.filter(item => item.isFile()).map(item => item.name);

        dirFolders.sort();
        dirFiles.sort();

        const maxIndexLength = Math.max(String(dirFolders.length + dirFiles.length - 1).length, '(index'.length);
        const maxNameLength = Math.max(...[...dirFolders, ...dirFiles].map(name => name.length), 'Name'.length);
        const maxTypeLength = 'directory'.length;

        const centerText = (text, width) => {
            const padding = Math.max(width - text.length, 0);
            const padStartLen = Math.floor(padding / 2);
            const padEndLen = padding - padStartLen;
            return ' '.repeat(padStartLen) + text + ' '.repeat(padEndLen);
        };

        const printRow = (index, name, type) => {
            console.log(
                `| ${centerText(index, maxIndexLength)} | ${centerText(name, maxNameLength)} | ${centerText(type, maxTypeLength)} |`
            );
        };

        const printSeparator = () => {
            console.log(
                `+${'-'.repeat(maxIndexLength + 2)}+${'-'.repeat(maxNameLength + 2)}+${'-'.repeat(maxTypeLength + 2)}+`
            );
        };

        // Print the top border
        printSeparator();

        // Print the header row
        printRow('Index', 'Name', 'Type');

        // Print the separator row
        printSeparator();

        let i = 0;

        // Print directories
        dirFolders.forEach(folder => {
            printRow(String(i++), folder, 'directory');
        });

        // Print files
        dirFiles.forEach(file => {
            printRow(String(i++), file, 'file');
        });

        // Print the bottom border
        printSeparator();

    } catch (e) {
        throw e;
    }
}

// Check if a path exists
export async function pathExists(p) {
    try {
        await fs.access(p);
        return true;
    } catch {
        return false;
    }
}
