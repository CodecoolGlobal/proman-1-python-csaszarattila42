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
        console.log(elemId)
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
    loadingStart: function() {
        const elem = document.createElement('div');
        elem.id = "loading";
        elem.innerText = 'loading...';
        document.body.append(elem);
    },
    loadingEnd: function() {
        document.getElementById('loading')?.remove?.();
    }
};
