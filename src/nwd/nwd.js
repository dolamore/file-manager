import path from "path";
import fs from "fs/promises";
import {pathExists, printDir} from "./nwdUtils.js";

export function printCurrentDir() {
    console.log(`You are currently in ${process.cwd()}`);
}

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

export async function listDirectoryContents() {
    const dir = process.cwd();

    try {
        const dirContent = await fs.readdir(dir, {withFileTypes: true});

        dirContent.sort((a, b) => {
            if (a.isDirectory() && !b.isDirectory()) return -1;
            if (!a.isDirectory() && b.isDirectory()) return 1;

            return a.name.localeCompare(b.name);
        });

        printDir(dirContent);

    } catch (e) {
        throw e;
    }
}


