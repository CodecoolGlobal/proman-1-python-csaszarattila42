import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

const dragged = {
    element: null,
    info: {}
};

export let cardsManager = {
  loadCards: async function (boardId) {
    const cards = await dataHandler.getCardsByBoardId(boardId);
    //console.log(`board id: ${boardId}`);

    for (let card of cards) {
      const columSelector = `.board-column[data-board-id="${boardId}"][data-column-id="${card.status_id}"]`;
      const column = document.querySelector(columSelector);
      const cardBuilder = htmlFactory(htmlTemplates.card);
      const content = cardBuilder(card);
      content.dataset.boardId = boardId;
      content.draggable = true;
      column.appendChild(content);
      domManager.addEventListener(
        `.bi.bi-trash[data-card-id="${card.id}"]`,
        "click",
        deleteButtonHandler
      );

      content.addEventListener("dragstart", (e) => {
          onDragStart(e, { ...card });
      });

      content.addEventListener("dragend", onDragEnd);
    }

    const allStatusColumns = document.querySelectorAll(".board-column");
    allStatusColumns.forEach((column) => {
      column.addEventListener("dragover", onDragOver);
      column.addEventListener("drop", onDrop);
    });
  },
};

function onDragStart(event, info) {
  dragged.element = event.currentTarget;
  dragged.info = info;
  console.log(event.currentTarget);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDragEnd() {
  dragged.element = null;
  dragged.info = {};
}

function onDrop(event) {
    const column = event.currentTarget;
    const { element, info } = dragged;
    info.status_id = column.dataset.columnId;

    column.append(element);
    domManager.loadingStart();
    dataHandler.updateCard(info.id, info).then(() => {
        domManager.loadingEnd();
    });
}

function deleteButtonHandler(clickEvent) {
    let cardId = clickEvent.target.dataset.cardId;
    let boardId = clickEvent.target.parentElement.parentElement.dataset.boardId;
    console.log(boardId);
    dataHandler.deleteCard(boardId, cardId).then(() => domManager.refreshPage(boardId));
}
