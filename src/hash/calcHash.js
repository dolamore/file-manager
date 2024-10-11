import fs from 'fs/promises';
import crypto from 'crypto';
import {pathExists} from "../nwd/nwd.js";

export async function calculateHash(filePath) {
    try {
        if (!await pathExists(filePath)) {
            console.error(`File "${filePath}" does not exist.`);
            throw new Error();
        }
        const fileContent = await fs.readFile(filePath);

        const hash = crypto.createHash('sha256').update(fileContent).digest('hex');

        console.log(hash);
    } catch (e) {
        throw e;
    }
}