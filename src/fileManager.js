import {printCurrentDir} from './nwd/nwd.js';
import {INVALID_INPUT_MESSAGE, OPERATION_FAILED_MESSAGE, PROMPT_MESSAGE} from "./const/constants.js";
import {
    executeCommand,
    getUsername,
    greetUser,
    initRl,
    isValidCommand,
    setGoodbyeMessage,
    setWelcomingMessage
} from "./utils/utils.js";


async function init() {
    // Get the username from the command line arguments or use the default value
    const username = getUsername();

    const welcomingMessage = setWelcomingMessage(username);
    const goodbyeMessage = setGoodbyeMessage(username);

    // Initialize the readline interface, which will allow us to communicate with the user
    const rl = initRl(PROMPT_MESSAGE);

    greetUser(rl, welcomingMessage);

    // Process the user input
    rl.on('line', async (input) => {
        const trimmedInput = input.trim();

        if (isValidCommand(trimmedInput)) {
            try {
                await executeCommand(trimmedInput);
            } catch (e) {
                console.error(OPERATION_FAILED_MESSAGE);
            }

        } else {
            console.error(INVALID_INPUT_MESSAGE);
        }

        // Display the current directory and prompt the user for the next command
       await printCurrentDir();
       rl.prompt();
    });

    // Close the readline interface when the user exits
    rl.on('close', () => {
        process.stdout.write('\u001b[2K\r');
        console.log(goodbyeMessage);
        process.exit(0);
    });
}

await init();



