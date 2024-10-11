import {pathExists} from "../nwd/nwd.js";
import {checkDirectoryExists} from "../fs/fileUtils.js";
import path from "path";
import fs from "fs";
import {pipeline} from "stream/promises";

export async function processStream(srcPath, destPath, transformStream, errorMessage) {
    await checkCompOpsPaths(srcPath, destPath, errorMessage);

    const fileReadStream = fs.createReadStream(srcPath);
    const fileWriteStream = fs.createWriteStream(destPath, { encoding: "utf8" });

    try {
        await pipeline(fileReadStream, transformStream, fileWriteStream);
    } catch (e) {
        console.error("Something went wrong during the pipeline process", e);
        throw e;
    }
}

async function checkCompOpsPaths(srcPath, destPath, errorMessage) {
    if (!await pathExists(srcPath)) {
        console.error(`File "${srcPath}" does not exist.`);
        throw new Error();
    }

    if (!await checkDirectoryExists(destPath)) {
        console.error(`"${destPath}" does not exist or not a directory.`);
        throw new Error();
    } else {
        destPath = path.resolve(destPath, path.basename(srcPath) + '.gz');
    }

    if (await pathExists(destPath)) {
        console.error(errorMessage)
        throw new Error();
    }
}