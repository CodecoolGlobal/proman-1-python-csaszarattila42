import {domManager} from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";

export const loginManager = {
    initLoginLogoutHandlers: function() {
        //domManager.addEventListener("#register-modal-button", "click", registrationHandler);
        domManager.addEventListener("#login-modal-button", "click", loginHandler);

        if (domManager.isUserLoggedIn()) {
        domManager.switchToLoggedOut();
        } else {
            domManager.switchToLoggedIn(logOutHandler)
        }
    }
}

function loginHandler(clickEvent) {
    const userName = document.querySelector("#login-modal-username-text").value;
    const password = document.querySelector("#login-modal-password-text").value;

    dataHandler.logUserIn(userName, password).then((data) => {
        if (data["result"] === "successful") {
            domManager.switchToLoggedIn(logOutHandler, userName);
            domManager.refreshPage();
        }
    });
}

function registrationHandler(clickEvent) {
    ;
}

export function logOutHandler(clickEvent) {
    dataHandler.logUserOut().then(() => {
        domManager.switchToLoggedOut()
        domManager.refreshPage()
    });
}