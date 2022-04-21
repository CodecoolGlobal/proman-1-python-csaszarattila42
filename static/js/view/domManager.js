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
        boardName.innerText = ""
        let button = document.createElement('button')
        button.innerText = "Save"
        button.setAttribute('data-button-id', 'save')
        button.setAttribute('id', elemId)
        button.classList.add('button')
        textDiv.appendChild(button)
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
    }
};
