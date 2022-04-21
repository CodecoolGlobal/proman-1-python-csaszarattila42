import {boardsManager} from "../controller/boardsManager.js";

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
        let textDiv = document.createElement('div');
        let textBox = document.createElement('textarea');
        textDiv.classList.add('update-container')
        textDiv.appendChild(textBox)
        boardName.parentElement.replaceChild(textDiv, boardName)
        let name = boardName.innerText;
        textBox.innerText = name
        textBox.setAttribute('id', "textbox")
        boardName.innerText= ""
        let button = document.createElement('button')
        button.innerText = "Save"
        button.setAttribute('data-button-id', 'save')
        button.setAttribute('id', elemId)
        button.classList.add('button')
        textDiv.appendChild(button)
    },
    resetBoard(elemId, newName) {
        let update_container = document.querySelector(".update-container");
        let textTitle = document.createElement("span");
        textTitle.classList.add("board-title");
        textTitle.setAttribute("data-board-id", elemId);
        textTitle.innerText = newName.value;
        update_container.parentElement.replaceChild(textTitle, update_container);
        domManager.addEventListener(`.board-title[data-board-id="${elemId}"]`, "click", boardsManager.updateName)

    },
    replaceChild(parentIdentifier,oldChild,childContent) {
        const parent = document.querySelector(parentIdentifier);
        if (parent) {
            parent.replaceChild(childContent,oldChild);
        } else {
            console.error("could not find such html element: " + parentIdentifier);
    }
    }
};
