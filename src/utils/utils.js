import readline from 'readline';
import os from 'os';
import {changeDirectory, listDirectoryContents, printCurrentDir} from '../nwd/nwd.js';
import {copyFile, createFile, deleteFile, moveFile, printFile, renameFile} from '../fs/fileUtils.js';
import {getOSInfo} from "../os/os.js";
import {calculateHash} from "../hash/calcHash.js";
import {compress, decompress} from "../zip/comprOps.js";

// Execute the command
export async function executeCommand(command, rl) {
    if (command === '.exit') {
        rl.close();
    }
    const [cmd, ...args] = command.split(' ');

    if (cmd === 'up') {
        await changeDirectory('..');
    } else if (cmd === 'cd' && args.length > 0) {
        await changeDirectory(args[0]);
    } else if (cmd === 'ls') {
        await listDirectoryContents();
    } else if (cmd === 'cat' && args.length > 0) {
        await printFile(args[0]);
    } else if (cmd === 'add' && args.length > 0) {
        await createFile(process.cwd(), args[0]);
    } else if (cmd === 'rn' && args.length > 1) {
        await renameFile(args[0], args[1]);
    } else if (cmd === 'cp' && args.length > 1) {
        await copyFile(args[0], args[1]);
    } else if (cmd === 'mv' && args.length > 1) {
        await moveFile(args[0], args[1]);
    } else if (cmd === 'rm' && args.length > 0) {
        await deleteFile(args[0]);
    } else if (cmd === 'os') {
        if (args.length === 0) {
            getOSInfo('');
        } else {
            getOSInfo(args[0]);
        }
    } else if (cmd === 'hash' && args.length > 0) {
        await calculateHash(args[0]);
    } else if (cmd === 'compress' && args.length > 1) {
        await compress(args[0], args[1]);
    } else if (cmd === 'decompress' && args.length > 1) {
        await decompress(args[0], args[1]);
    }
}

// Validate the command
export function isValidCommand(command) {
    //TODO Add your command validation logic here
    return command.length > 0;
}

export function greetUser(rl, welcomingMessage) {
    console.log(welcomingMessage);
    process.chdir(os.homedir());
    printCurrentDir();
    rl.prompt();
}

export function initRl(promptMessage) {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: promptMessage
    });
}

export function getUsername() {
    const usernameArg = process.argv.find(arg => arg.startsWith('--username='));
    return usernameArg && usernameArg.split('=')[1] ? usernameArg.split('=')[1] : 'User';
}

export function setWelcomingMessage(username) {
    return `Welcome to the File Manager, ${username}!`;
}

export function setGoodbyeMessage(username) {
    return `\nThank you for using File Manager, ${username}, goodbye!`;
}