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
            domManager.addEventListener(`.board[data-board-id="${board.id}"]`, "click", updateBoardName)
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}

function updateBoardName(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    let boardName = document.querySelector(`.board[data-board-id="${boardId}"]`);
    let textBox = document.createElement('textarea');
    boardName.parentElement.replaceChild(textBox, boardName)
    let name = boardName.innerText;
    textBox.innerText = name
    boardName.innerText= ""
}
