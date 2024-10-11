import {PROMPT_MESSAGE} from "./const/constants.js";
import {
    getUsername,
    greetUser, handleClose, handleUserInput,
    initRl,
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
        await handleUserInput(input, rl);
    });

    // Close the readline interface when the user exits
    rl.on('close', () => {
        handleClose(goodbyeMessage)
    });
}

await init();



