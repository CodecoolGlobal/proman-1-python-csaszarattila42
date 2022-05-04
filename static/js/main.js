import {boardsManager} from "./controller/boardsManager.js";
import {dataHandler} from "./data/dataHandler.js";
import {domManager} from "./view/domManager.js";

function init() {
    boardsManager.loadBoards();
    boardsManager.initNewItemEventHandlers();

    initLoginLogoutHandlers();
    if (domManager.isUserLoggedIn()) {
        domManager.switchToLoggedOut();
    } else {
        domManager.switchToLoggedIn(logOutHandler)
    }
}

function initLoginLogoutHandlers() {
    //domManager.addEventListener("#register-modal-button", "click", registrationHandler);
    domManager.addEventListener("#login-modal-button", "click", loginHandler);
}

function loginHandler(clickEvent) {
    const userName = document.querySelector("#login-modal-username-text").value;
    const password = document.querySelector("#login-modal-password-text").value;

    dataHandler.logUserIn(userName, password).then((data) => {
        if (data["result"] === "successful") {
            domManager.switchToLoggedIn(userName, logOutHandler);
            domManager.refreshPage();
        }
    })
}

function registrationHandler(clickEvent) {
    ;
}

function logOutHandler(clickEvent) {
    ;
}

init();
