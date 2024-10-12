import os from "os";
import {OS_FLAGS} from "../const/constants.js";

export function printEOL() {
    console.log(`End-Of-Line sequence: ${JSON.stringify(os.EOL)}`);
}

export function printCPUs() {
    const cpus = os.cpus();
    console.log(`Total CPUs: ${cpus.length}`);
    cpus.forEach((cpu, index) => {
        console.log(`CPU ${index + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`);
    });
}

export function printHomeDir() {
    console.log(`Home Directory: ${os.homedir()}`);
}

export function printUsername() {
    console.log(`Username: ${os.userInfo().username}`);
}

export function printArch() {
    console.log(`CPU Architecture: ${os.arch()}`);
}

export function handleUnknownFlag(flag) {
    console.log(`Unknown flag: ${flag}`);
    console.log(OS_FLAGS);
}