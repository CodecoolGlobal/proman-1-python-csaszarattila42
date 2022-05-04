import {boardsManager} from "./controller/boardsManager.js";
import {loginManager} from "./controller/loginManager.js";

function init() {
    boardsManager.loadBoards();
    boardsManager.initNewItemEventHandlers();
    loginManager.initLoginLogoutHandlers();
}

init();
