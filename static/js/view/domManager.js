import {boardsManager} from "../controller/boardsManager.js";
import {HtmlElementBuilder} from "./htmlFactory.js";

export let domManager = {
    addChild(parentIdentifier, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.appendChild(childContent);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    addEventListener(parentIdentifier, eventType, eventHandler) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.addEventListener(eventType, eventHandler);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },

    updateName(elemId) {
        console.log(elemId)
        let boardName = document.querySelector(`.board-title[data-board-id="${elemId}"]`);
        let textDiv = new HtmlElementBuilder('div')
            .addClasses('update-container')
            .addChild(new HtmlElementBuilder("textarea")
                .addAttribute("id", "textbox")
                .addText(boardName.innerText)
            ) //text box
            .addChild(new HtmlElementBuilder('button')
                .addClasses('button')
                .addDataAttributes({buttonId: 'save'})
                .addAttribute('id', elemId)
                .addText('Save')
            ) //save button
            .element

        boardName.parentElement.replaceChild(textDiv, boardName)
        boardName.innerText = "";
    },


    replaceChild(parentIdentifier, oldChild, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.replaceChild(childContent, oldChild);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    refreshPage: function () {
        document.querySelector('#root').innerHTML = '';
        boardsManager.loadBoards();
    },
    switchToLoggedIn: function(userName, logoutHandler) {
        const userDiv = document.querySelector("#user-operations");
        userDiv.innerHTML = '';
        userDiv.dataset.userName = userName;
        userDiv.appendChild(new HtmlElementBuilder('span')
            .addText(`Logged in as ${userName}`)
            .element
        );
        userDiv.appendChild(new HtmlElementBuilder('button')
            .addClasses("btn btn-secondary btn-sm")
            .addAttribute("id", "logout-button")
            .addAttribute('type', 'button')
            .addText('Logout')
            .addEventListener("click", logoutHandler)
            .element
        );
    },
    switchToLoggedOut: function () {
        const userDiv = document.querySelector("#user-operations");
        userDiv.innerHTML = '';
        //delete userDiv.dataset.userName;
        userDiv.appendChild(new HtmlElementBuilder('button')
            .addClasses("btn btn-secondary btn-sm")
            .addDataAttributes({
                bsTarget: '#register-modal',
                bsToggle: 'modal'
            })
            .addAttribute("id", "register-button")
            .addAttribute('type', 'button')
            .addText('Register')
            .element
        )
        userDiv.appendChild(new HtmlElementBuilder('button')
            .addClasses("btn btn-primary btn-sm")
            .addDataAttributes({
                bsTarget: '#login-modal',
                bsToggle: 'modal'
            })
            .addAttribute("id", "login-button")
            .addAttribute('type', 'button')
            .addText('Login')
            .element
        )
    },
    isUserLoggedIn: function () {
        const userDiv = document.querySelector("#user-operations");
        return userDiv.dataset.userName === '';
    }
};
