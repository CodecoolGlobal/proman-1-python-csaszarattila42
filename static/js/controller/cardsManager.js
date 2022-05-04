import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

let dragged = null;

export let cardsManager = {
  loadCards: async function (boardId) {
    const cards = await dataHandler.getCardsByBoardId(boardId);
    //console.log(`board id: ${boardId}`);

    for (let card of cards) {
      const columnSelector = `.board-column[data-board-id="${boardId}"][data-column-id="${card.status_id}"]`;
      const column = document.querySelector(columnSelector);
      const cardBuilder = htmlFactory(htmlTemplates.card);
      const content = cardBuilder(card);
      content.dataset.boardId = boardId;
      content.draggable = true;
      column.appendChild(content);
      domManager.addEventListener(
        `.bi.bi-trash[data-card-id="${card.id}"]`,
        "click",
        deleteButtonHandler,
      );

      domManager.addEventListener(`.card[data-card-id="${card.id}"]`, "click", cardsManager.updateCardName);

      content.addEventListener("dragstart", (e) => {
          onDragStart(e);
      });

      content.addEventListener("dragend", onDragEnd);
    }

    const allStatusColumns = document.querySelectorAll(".board-column");
    allStatusColumns.forEach((column) => {
      column.addEventListener("dragover", onDragOver);
      column.addEventListener("drop", onDrop);
    });
  },
    updateCardName: function (clickEvent) {
    const card = clickEvent.currentTarget;
    const cardId = card.getAttribute("data-card-id");
    const boardId = card.getAttribute("data-board-id");
    const columnId = card.getAttribute("data-column-id");
    domManager.updateCardName(cardId, boardId, columnId);
    domManager.addEventListener("#save-card-name", "click", saveNewCardName);
    clickEvent.stopPropagation();
    },
};

function onDragStart(event) {
  dragged = event.currentTarget;
  console.log(event.currentTarget);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDragEnd() {
  dragged = null;
}

function onDrop(event) {
    const column = event.currentTarget;
    const element = dragged;
    element.dataset.columnId = column.dataset.columnId;
    column.append(element);
    const cardId = element.dataset.cardId;
    const cardTitle = element.innerText;
    const boardId = element.dataset.boardId;
    const statusId = element.dataset.columnId;
    const cardOrder = element.dataset.cardOrder;
    domManager.loadingStart();
    dataHandler.updateCard(cardId, cardTitle, boardId, statusId, cardOrder).then(() => {
        domManager.loadingEnd();
    });
}

function deleteButtonHandler(clickEvent) {
  console.log("CLICK");
  let cardId = clickEvent.target.dataset.cardId;
  let boardId = clickEvent.target.parentElement.parentElement.dataset.boardId;
  console.log(boardId);
  dataHandler.deleteCard(boardId, cardId).then(() => domManager.refreshPage(boardId));
  clickEvent.stopPropagation()
}

function saveNewCardName(clickEvent) {
    const saveButton = clickEvent.currentTarget;
    let cardId = saveButton.dataset.cardId;
    let newName = document.querySelector("#textbox-card");
    let cardTitle = newName.value;
    let boardId = saveButton.dataset.boardId;
    let statusId = saveButton.dataset.statusId;
    let cardOrder = saveButton.dataset.cardOrder;
    dataHandler.updateCard(cardId, cardTitle, boardId, statusId, cardOrder).then(() => {domManager.refreshPage()})
}
