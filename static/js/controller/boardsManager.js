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
            cardsManager.loadCards(board.id);
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
    let boardId = clickEvent.target.dataset.boardId;
    let button = document.querySelector(`button[data-board-id="${boardId}"]`);
    let board = document.querySelector(`div[data-board-id="${boardId}"]`)
    //let boardTitle = board.querySelector("h5");
    board.querySelectorAll("div.card").forEach((card)=>{
                card.classList.toggle("hidden")});
        if (button.innerText === "Show Cards"){
            button.innerText = "Hide Cards";
        }else{
            button.innerText = "Show Cards";
        }

}


function showStatuses(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    console.log(boardId)
    loadStatus(boardId);
}




