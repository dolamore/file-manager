import fs from "fs/promises";

export function printDir(dirContent) {
    const maxIndexLength = Math.max(String(dirContent.length - 1).length, '(index)'.length);
    const maxNameLength = Math.max(...[...dirContent].map(item => item.name.length), 'Name'.length);
    const maxTypeLength = 'directory'.length;

    // Print the top border
    printSeparator(maxIndexLength, maxNameLength, maxTypeLength);

    // Print the header row
    printRow('(index)', 'Name', 'Type', maxIndexLength, maxNameLength, maxTypeLength);

    // Print the separator row
    printSeparator(maxIndexLength, maxNameLength, maxTypeLength);

    let i = 0;

    dirContent.forEach(item => {
        if (item.isDirectory()) {
            printRow(String(i++), item.name, 'directory', maxIndexLength, maxNameLength, maxTypeLength);
        } else {
            printRow(String(i++), item.name, 'file', maxIndexLength, maxNameLength, maxTypeLength);
        }
    });
    // Print the bottom border
    printSeparator(maxIndexLength, maxNameLength, maxTypeLength);
}

export function centerText(text, width) {
    const padding = Math.max(width - text.length, 0);
    const padStartLen = Math.floor(padding / 2);
    const padEndLen = padding - padStartLen;
    return ' '.repeat(padStartLen) + text + ' '.repeat(padEndLen);
}

export function printRow (index, name, type, maxIndexLength, maxNameLength, maxTypeLength){
    console.log(
        `| ${centerText(index, maxIndexLength)} | ${centerText(name, maxNameLength)} | ${centerText(type, maxTypeLength)} |`
    );
}

export function printSeparator (maxIndexLength, maxNameLength, maxTypeLength) {
    console.log(
        `+${'-'.repeat(maxIndexLength + 2)}+${'-'.repeat(maxNameLength + 2)}+${'-'.repeat(maxTypeLength + 2)}+`
    );
}

export async function pathExists(path) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

export async function pathExistsAndIsFile(filePath) {
    return (await pathExists(filePath) && filePath.isFile());
}

export async function pathExistsAndIsDirectory(dirPath) {
    return (await pathExists(dirPath) && dirPath.isDirectory());
}