import os from 'os';
import {OS_FLAGS} from "../const/constants.js";

export function getOSInfo(flag) {
    switch (flag) {
        case '--EOL':
            console.log(`End-Of-Line sequence: ${JSON.stringify(os.EOL)}`);
            break;

        case '--cpus':
            const cpus = os.cpus();
            console.log(`Total CPUs: ${cpus.length}`);
            cpus.forEach((cpu, index) => {
                console.log(`CPU ${index + 1}: ${cpu.model}, ${cpu.speed / 1000} GHz`);
            });
            break;

        case '--homedir':
            console.log(`Home Directory: ${os.homedir()}`);
            break;

        case '--username':
            console.log(`Username: ${os.userInfo().username}`);
            break;

        case '--architecture':
            console.log(`CPU Architecture: ${os.arch()}`);
            break;

        default:
            console.log(`Unknown flag: ${flag}`);
            console.log(OS_FLAGS);
    }
}
