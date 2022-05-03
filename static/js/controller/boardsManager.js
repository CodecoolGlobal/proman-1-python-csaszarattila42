import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        const cardPromises = []
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            await this.loadStatus(board.id);
            cardPromises.push(cardsManager.loadCards(board.id))
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
        }
        await Promise.all(cardPromises)
    },
    loadStatus: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        console.log(statuses)
        for (let status of statuses) {
            const statusBuilder = htmlFactory(htmlTemplates.column);
            const content = statusBuilder(status, boardId);
            domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
            domManager.addEventListener( `.board-column[data-board-id="${boardId}"][data-column-id="${status.id}"]`, "click", boardsManager.updateColumnName);
        }
        domManager.addEventListener(`.board-title[data-board-id="${boardId}"]`, "click", boardsManager.updateBoardName);
        domManager.addEventListener(`button[data-board-id="${boardId}"]`, "click", deleteBoard);
    },
    initNewItemEventHandlers: function () {
        document.querySelector("#save-new-card").addEventListener("click", saveNewCardHandler);
        document.querySelector("#new-card-modal").addEventListener("shown.bs.modal", newCardModalHandler);
        document.querySelector("#new-board-save").addEventListener('click', newBoardHandler);

    },
    updateBoardName: function (clickEvent) {
        const boardId = clickEvent.target.getAttribute("data-board-id")
        domManager.updateName(boardId);
        domManager.addEventListener(`.button[data-button-id="save"]`, "click", saveNewName);
    },

    updateColumnName: function (clickEvent) {
    const columnId = clickEvent.target.getAttribute("data-column-id")
    const boardId = clickEvent.target.getAttribute("data-board-id")
    domManager.updateColumnName(columnId, boardId);
    domManager.addEventListener(`.button[data-button-id="save-column"]`, "click", saveNewColumnName);
    },

};


function showHideButtonHandler(clickEvent) {
    let boardId = clickEvent.target.dataset.boardId;
    let button = document.querySelector(`.toggle-board-button[data-board-id="${boardId}"]`);
    let board = document.querySelector(`section[data-board-id="${boardId}"]`)
    board.querySelectorAll("div.card").forEach((card) => {
        card.classList.toggle("hidden")
    });
    if (button.innerText === "Show Cards") {
        button.innerText = "Hide Cards";
    } else {
        button.innerText = "Show Cards";
    }

}


function showStatuses(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    console.log(boardId)
    boardsManager.loadStatus(boardId);
}

function saveNewCardHandler(clickEvent) {
    let boardId = clickEvent.target.dataset.boardId;
    let newCardTitle = document.querySelector('#new-card-title').value;
    dataHandler.createNewCard(newCardTitle, boardId).then(() => {domManager.refreshPage(boardId)});
}

function newCardModalHandler(clickEvent) {
    let saveButton = document.querySelector("#save-new-card");
    saveButton.dataset.boardId = clickEvent.relatedTarget.dataset.boardId;
}


function saveNewName() {
    const saveButton = document.querySelector(`.button[data-button-id="save"]`);
    let boardId = saveButton.getAttribute("id");
    let newName = document.getElementById("textbox");
    dataHandler.updateBoardName(boardId, newName.value).then(() => {domManager.refreshPage()})


}

function deleteBoard(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    dataHandler.deleteBoardById(boardId)
        .then(() => {domManager.refreshPage()
        });
    console.log(boardId)
}

function newBoardHandler(clickEvent) {
    const boardTitle = document.querySelector("#board-creation-title").value;
    const privateFlag = document.querySelector("#board-creation-private").value;

    dataHandler.createNewBoard(boardTitle, privateFlag)
        .then(() => {
            domManager.refreshPage()
        });
}

function saveNewColumnName() {
    const saveButton = document.querySelector(`.button[data-button-id="save-column"]`);
    let columnId = saveButton.getAttribute("id");
    let newName = document.getElementById("textbox-column");
    dataHandler.updateColumnName(columnId, newName.value).then(() => {domManager.refreshPage()})


}
