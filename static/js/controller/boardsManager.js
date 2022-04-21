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
            this.loadStatus(board.id).then(() => cardsManager.loadCards(board.id));
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
    loadStatus: async function (boardId) {
        const statuses = await dataHandler.getStatuses();
        console.log(statuses)
        for (let status of statuses) {
            const statusBuilder = htmlFactory(htmlTemplates.column);
            const content = statusBuilder(status, boardId);
            domManager.addChild(`.board[data-board-id="${boardId}"]`, content);
        }
            domManager.addEventListener(`.board[data-board-id="${boardId}"]`, "click", updateName);
    }, 
    initNewItemEventHandlers: function () {
        document.querySelector("#save-new-card").addEventListener("click", saveNewCardHandler);
        document.querySelector("#new-card-modal").addEventListener("shown.bs.modal", newCardModalHandler);
        document.querySelector("#new-board-save").addEventListener('click', newBoardHandler);
    }
};


function showHideButtonHandler(clickEvent) {
    let boardId = clickEvent.target.dataset.boardId;
    let button = document.querySelector(`button[data-board-id="${boardId}"]`);
    let board = document.querySelector(`section[data-board-id="${boardId}"]`)
    console.log(board)
    console.log(board.querySelectorAll("div.card"))
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
    dataHandler.createNewCard(newCardTitle, boardId);
}

function newCardModalHandler(clickEvent) {
    let saveButton = document.querySelector("#save-new-card");
    saveButton.dataset.boardId = clickEvent.relatedTarget.dataset.boardId;
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
    dataHandler.updateName(boardId, newName.value)
        .then(() => domManager.resetBoard(boardId, newName))
        .then(() => dataHandler.getBoards());
}

function newBoardHandler(clickEvent) {
    const boardTitle = document.querySelector("#board-creation-title").value;
    const privateFlag = document.querySelector("#board-creation-private").value;

    dataHandler.createNewBoard(boardTitle, privateFlag)
        .then(() => {
            document.querySelector('#root').innerHTML = '';
            boardsManager.loadBoards();

            boardTitle.value = '';
        });
}