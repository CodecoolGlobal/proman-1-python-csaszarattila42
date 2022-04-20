import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            domManager.addEventListener(`.board[data-board-id="${board.id}"]`, "click", updateName);

        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}

function updateName(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    domManager.updateName(boardId);
    domManager.addEventListener(`.button[data-button-id="save"]`, "click", saveNewName);
}

function saveNewName() {
    const saveButton = document.querySelector(`.button[data-button-id="save"]`);
    let boardId = saveButton.getAttribute("id");
    let newName = document.getElementById("textbox");
    dataHandler.updateName(boardId, newName.value).then(domManager.resetBoard(boardId, newName))
        .then(dataHandler.getBoards())
}
