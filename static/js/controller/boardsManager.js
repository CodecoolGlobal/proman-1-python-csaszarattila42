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
        }
    },
};


function showHideButtonHandler(clickEvent) {
    let boardId = clickEvent.target.dataset.boardId;
    let button = document.querySelector(`button[data-board-id="${boardId}"]`);
    let board = document.querySelector(`div[data-board-id="${boardId}"]`)
    let boardTitle = board.querySelector("h5");
    if (button.innerText === "Show Cards"){
        console.log(boardTitle)
        cardsManager.loadCards(boardId);
        button.innerText = "Hide Cards";
    }else{
        let boardBuilder = htmlFactory(htmlTemplates.board)
        console.log(board.parentNode)
        console.log(board.parentElement)
        domManager.replaceChild("#root",board.parentNode, boardBuilder(boardId))
        button.innerText = "Show Cards";
    }


}
