import {PROMPT_MESSAGE} from "./const/constants.js";
import {
    getUsername,
    greetUser, handleClose, handleUserInput,
    initRl,
    setGoodbyeMessage,
    setWelcomingMessage
} from "./utils/utils.js";

async function init() {
    const username = getUsername();
    const welcomingMessage = setWelcomingMessage(username);
    const goodbyeMessage = setGoodbyeMessage(username);
    const rl = initRl(PROMPT_MESSAGE);

    greetUser(rl, welcomingMessage);

    rl.on('line', async (input) => {
        await handleUserInput(input, rl);
    });

    rl.on('close', () => {
        handleClose(goodbyeMessage)
    });
}

await init();



