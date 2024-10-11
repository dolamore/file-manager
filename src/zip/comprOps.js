import fs from 'fs';
import {createGzip, createGunzip} from 'zlib';
import {pipeline} from 'stream/promises';
import {pathExists} from "../nwd/nwd.js";
import {checkDirectoryExists} from "../fs/fileUtils.js";
import path from "path";
import {COMPRESSION_ERROR_MESSAGE, DECOMPRESSION_ERROR_MESSAGE} from "../const/constants.js";

export async function compress(srcPath, destPath) {
    await checkCompOpsPaths(srcPath, destPath, COMPRESSION_ERROR_MESSAGE);

    const fileReadStream = fs.createReadStream(srcPath);

    const fileWriteStream = fs.createWriteStream(destPath);

    const gzipStream = createGzip();

    try {
        await pipeline(fileReadStream, gzipStream, fileWriteStream);
    } catch (e) {
        console.error("Something went wrong during the pipeline process", e);
        throw e;
    }
}

export async function decompress(srcPath, destPath) {
    await checkCompOpsPaths(srcPath, destPath, DECOMPRESSION_ERROR_MESSAGE);

    const fileReadStream = fs.createReadStream(srcPath);

    const fileWriteStream = fs.createWriteStream(destPath, {encoding: "utf8"});

    const gunzipStream = createGunzip();

    try {
        await pipeline(fileReadStream, gunzipStream, fileWriteStream);
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