import fs from "fs";
import {pathExistsAndIsDirectory, pathExistsAndIsFile, pathExists} from "../nwd/nwdUtils.js";
import {FILE_END_SEPARATOR} from "../const/constants.js";
import path from "path";

export async function printFile(filePath) {
    try {
        if (await pathExists(filePath)) {
            const readStream = fs.createReadStream(filePath, {encoding: 'utf8'});

            return new Promise((resolve, reject) => {
                readStream.pipe(process.stdout);

                readStream.on('end', () => {
                    console.log(FILE_END_SEPARATOR);
                    resolve();
                });

                readStream.on('error', (e) => {
                    console.error(`Error reading file: ${e.message}`);
                    return reject(e);
                });
            });
        } else {
            throw new Error(`File "${filePath}" does not exist.`);
        }
    } catch (e) {
        console.error(e.message);
        throw e;
    }
}

export async function createFile(dirPath, fileName) {
    const filePath = path.resolve(dirPath, fileName);
    try {
        await fs.promises.access(filePath);
        throw new Error("File already exists");
    } catch (e) {
        if (e.code === "ENOENT") {
            await fs.promises.writeFile(filePath, "");
        } else {
            console.error(e.message);
            throw e;
        }
    }
}

export async function renameFile(path, newFileName) {
    try {
        if (!await pathExists(path)) {
            throw new Error(`File "${path}" does not exist.`);
        }
        await fs.promises.rename(path, newFileName);
    } catch (e) {
        console.error(e.message);
        throw e;
    }
}

export async function copyFile(srcPath, destPath) {
    return new Promise(async (resolve, reject) => {
        try {
            if (!await pathExistsAndIsFile(srcPath)) {
                console.error(`Source file "${srcPath}" does not exist or is not a file.`);
                return reject();
            }

            if (!await pathExistsAndIsDirectory(destPath)) {
                console.error(`Destination path "${destPath}" is not a directory or does not exist.`);
                return reject();
            }

            const resolvedDestPath = path.resolve(destPath, path.basename(srcPath));

            if (await pathExistsAndIsFile(resolvedDestPath)) {
                console.error(`File "${path.basename(srcPath)}" already exists in the destination directory.`);
                return reject();
            }

            const readStream = fs.createReadStream(srcPath);
            const writeStream = fs.createWriteStream(resolvedDestPath);

            readStream.pipe(writeStream);

            readStream.on('error', (e) => reject(e));
            writeStream.on('error', (e) => reject(e));

            writeStream.on('finish', () => resolve());
        } catch (e) {
            return reject(e);
        }
    });
}

export async function moveFile(srcPath, destPath) {
    try {
        await copyFile(srcPath, destPath);

        await fs.promises.unlink(srcPath);

    } catch (e) {
        throw e;
    }
}

export async function deleteFile(filePath) {
    try {
        await fs.promises.unlink(filePath);
    } catch (e) {
        if (e.code === "ENOENT") {
            console.error(`File "${filePath}" does not exist.`);
        }
        throw e;
    }
}

