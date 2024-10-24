import {pathExists, pathExistsAndIsDirectory} from "../nwd/nwdUtils.js";
import path from "path";
import fs from "fs";
import {pipeline} from "stream/promises";

export async function processStream(srcPath, destPath, transformStream, errorMessage, extension) {
    destPath = destPath + path.parse(srcPath).name + extension;
    await checkCompOpsPaths(srcPath, destPath, errorMessage);
    const fileReadStream = fs.createReadStream(srcPath);
    const fileWriteStream = fs.createWriteStream(destPath, {encoding: "utf8"});

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

    if (!await pathExistsAndIsDirectory(path.dirname(destPath))) {
        console.error(`"${path.dirname(destPath)}" does not exist or not a directory.`);
        throw new Error();
    }

    if (await pathExists(destPath)) {
        console.error(errorMessage)
        throw new Error();
    }
}