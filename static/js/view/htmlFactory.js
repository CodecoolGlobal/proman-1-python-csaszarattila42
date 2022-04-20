export const htmlTemplates = {
    board: 1,
    card: 2
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder
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
function columnBuilder(column) {
    let columns = document.createElement("div");
    let colum = document.createElement("div");
    let columnTitle = document.createElement("div");
    let columnContent = document.createElement("div");
    colum.appendChild(columnContent);
    columnTitle.classList.add("board-column-title");
    colum.appendChild(columnTitle);
    columns.appendChild(colum);
    columns.classList.add("board-columns");
    colum.classList.add("board-column");
}
function boardBuilder(board) {
    console.log(board)
    let boardContainer = document.createElement("div");
    let cardBoard = document.createElement("section");
    let title = document.createElement("span");
    let showButton = document.createElement("button");
    let boardHeader = document.createElement("div");
    let addBoard = document.createElement("button");
    addBoard.classList.add("board-add");
    addBoard.innerText = "Add Card";
    boardHeader.appendChild(addBoard);
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

