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

        updateColumnName(elemId, boardId) {
        //console.log(elemId)
        let columnName = document.querySelector(`.board-column[data-board-id="${boardId}"][data-column-id="${elemId}"]`);
        let textDiv = new HtmlElementBuilder('div')
            .addClasses('update-container')
            .addChild(new HtmlElementBuilder("textarea")
                .addAttribute("id", "textbox-column")
                .addText(columnName.innerText)
            ) //text box
            .addChild(new HtmlElementBuilder('button')
                .addClasses('button')
                .addDataAttributes({buttonId: 'save-column'})
                .addAttribute('id', elemId)
                .addText('Save')
            ) //save button
            .element

        columnName.parentElement.replaceChild(textDiv, columnName)
        columnName.innerText = "";
    },

    updateCardName(elemId, boardId, columnId) {
        console.log(elemId)
        let card = document.querySelector(`.card[data-card-id="${elemId}"]`);
        let textDiv = new HtmlElementBuilder('div')
            .addClasses('update-container')
            .addChild(new HtmlElementBuilder("textarea")
                .addAttribute("id", "textbox-card")
                .addText(card.innerText)
            ) //text box
            .addChild(new HtmlElementBuilder('button')
                .addClasses('button')
                .addDataAttributes({cardId: elemId, boardId: card.dataset.boardId, cardOrder: card.dataset.cardOrder, statusId: card.dataset.columnId})
                .addAttribute('id', 'save-card-name')
                .addText('Save')
            ) //save button
            .element

        card.parentElement.replaceChild(textDiv, card)
        card.innerText = "";
    },


    replaceChild(parentIdentifier, oldChild, childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.replaceChild(childContent, oldChild);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
        }
    },
    refreshPage: function (boardId) {
        document.querySelector('#root').innerHTML = '';
        boardsManager.loadBoards().then(() => {
            let button = document.querySelector(`.toggle-board-button[data-board-id="${boardId}"]`);
            let board = document.querySelector(`section[data-board-id="${boardId}"]`);
            console.log(board.querySelectorAll("div.card"))
            board.querySelectorAll("div.card").forEach((card) => {
                card.classList.toggle("hidden")
            });
            if (button.innerText === "Show Cards") {
                button.innerText = "Hide Cards";
            } else {
                button.innerText = "Show Cards";
    }
        });
        //boardsManager.loadBoards();
    },
    loadingStart: function() {
        const elem = document.createElement('div');
        elem.id = "loading";
        elem.innerText = 'loading...';
        document.body.append(elem);
    },
    loadingEnd: function() {
        document.getElementById('loading')?.remove?.();
        boardsManager.loadBoards();
    },
    switchToLoggedIn: function(logoutHandler, userName) {
        const userDiv = document.querySelector("#user-operations");
        userDiv.innerHTML = '';
        if (userName) {
            userDiv.dataset.userName = userName;
        }
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
        userDiv.dataset.userName = '';
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
