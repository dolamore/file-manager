import os from 'os';
import {OS_FLAGS} from "../const/constants.js";
import {handleUnknownFlag, printArch, printCPUs, printEOL, printHomeDir, printUsername} from "./osUtils.js";

// Get OS information based on the provided flag
export function getOSInfo(flag) {
    switch (flag) {
        case '--EOL':
            printEOL();
            break;

        case '--cpus':
            printCPUs();
            break;

        case '--homedir':
            printHomeDir();
            break;

        case '--username':
            printUsername();
            break;

        case '--architecture':
            printArch();
            break;

        default:
            handleUnknownFlag(flag);
    }
}


