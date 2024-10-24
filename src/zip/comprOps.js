import {createGzip, createGunzip} from 'zlib';
import {COMPRESSION_ERROR_MESSAGE, DECOMPRESSION_ERROR_MESSAGE} from "../const/constants.js";
import {processStream} from "./comprUtils.js";

export async function compress(srcPath, destPath) {
    const gzipStream = createGzip();
    await processStream(srcPath, destPath, gzipStream, COMPRESSION_ERROR_MESSAGE, ".gz");
}

export async function decompress(srcPath, destPath) {
    const gunzipStream = createGunzip();
    await processStream(srcPath, destPath, gunzipStream, DECOMPRESSION_ERROR_MESSAGE, "");
}