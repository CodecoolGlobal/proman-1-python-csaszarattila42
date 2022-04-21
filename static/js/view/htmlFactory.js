export const htmlTemplates = {
    board: 1,
    card: 2,
    column:3
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.column]: columnBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}
function columnBuilder(column,boardId) {

    let colum = document.createElement("div");
    let columnTitle = document.createElement("div");
    let columnContent = document.createElement("div");
    colum.appendChild(columnContent);
    columnTitle.classList.add("board-column-title");
    colum.appendChild(columnTitle);
    colum.classList.add("board-column");
    colum.setAttribute("data-column-title",`${column.title}`)
    colum.setAttribute("data-board-id", `${boardId}`)
    colum.innerText=`${column.title}`
    return colum
}
function boardBuilder(board) {
    let boardContainer = document.createElement("div");
    let cardBoard = document.createElement("section");
    let title = document.createElement("span");
    let showButton = document.createElement("button");
    let boardHeader = document.createElement("div");
    boardContainer.setAttribute("class", "board-container");
    boardContainer.appendChild(cardBoard);
    cardBoard.setAttribute("class","board" );
    cardBoard.setAttribute("data-board-id",`${board.id}`);
    cardBoard.appendChild(boardHeader);
    title.classList.add("board-title");
    title.innerText=`${board.title}`;
    boardContainer.appendChild(showButton);
    showButton.innerText = "Show Cards";
    showButton.setAttribute("class", "toggle-board-button");
    showButton.setAttribute("data-board-id", `${board.id}`);
    let newCardButton = createNewCardButtonBuilder(board);
    boardContainer.appendChild(newCardButton);
    button.setAttribute("class", "toggle-board-button")
    button.setAttribute("data-board-id", `${board.id}`)
    return boardContainer;
    /*return `<div class="board-container">
                <div class="board" data-board-id=${board.id}><h5>${board.title}</h5></div>
                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
            </div>`;*/
}

function cardBuilder(card) {
    let cardDom = document.createElement("div");
    let cardRemove = document.createElement("div");
    let trash = document.createElement("i")
    cardRemove.classList.add("card-remove")
    trash.setAttribute("class", "fas fa-trash-alt")
    cardDom.setAttribute("class", "card");
    cardDom.classList.add("hidden");
    cardDom.setAttribute("data-card-id",`${card.id}`);
    cardDom.innerText=`${card.title}`;
    return cardDom;
;
    //return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}


function createNewCardButtonBuilder(board) {
    let newCardButton = document.createElement("button")
    newCardButton.setAttribute("class", "btn btn-primary");
    newCardButton.setAttribute("data-board-id",`${board.id}`);
    newCardButton.setAttribute("data-bs-toggle","modal");
    newCardButton.setAttribute("data-bs-target","#new-card-modal");
    newCardButton.innerText = "Create Card"
    return newCardButton;
}

