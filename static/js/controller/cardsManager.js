import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        console.log(`board id: ${boardId}`)
        const column = document.querySelector(`.board-column[data-board-id="${boardId}"]`);
        console.log(column);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            content.setAttribute("data-board-id", `${boardId}`);
            column.appendChild(content);
            domManager.addEventListener(
                `.bi.bi-trash[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );

        }
    },
};

function deleteButtonHandler(clickEvent) {
    console.log("CLICK");
    let cardId = clickEvent.target.dataset.cardId;
    let boardId = clickEvent.target.parentElement.parentElement.dataset.boardId;
    console.log(boardId);
    dataHandler.deleteCard(boardId, cardId);
}
