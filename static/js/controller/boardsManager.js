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
            domManager.addEventListener(`.board[data-board-id="${board.id}"]`, "click", updateBoardName);

        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}

function updateBoardName(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    domManager.updateBoardName(boardId);
    domManager.addEventListener(`.button[data-button-id="save"]`, "click", saveNewName);
}

function saveNewName(clickEvent) {
    const saveButton = document.querySelector(`.button[data-button-id="save"]`);
    saveButton.innerText = "Saved";
}
