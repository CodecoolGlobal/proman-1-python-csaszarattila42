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
            domManager.addEventListener(
                `.board[data-board-id="${board.id}"]`,
                "click",
                showStatuses
            );
        }
    },
};


async function loadStatus(boardId) {
    const statuses = await dataHandler.getStatuses();
    console.log(statuses)

    for (let status of statuses) {
        const statusBuilder = htmlFactory(htmlTemplates.board);
        const content = statusBuilder(status);
        domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
    }
}

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}


function showStatuses(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    console.log(boardId)
    loadStatus(boardId);
}




