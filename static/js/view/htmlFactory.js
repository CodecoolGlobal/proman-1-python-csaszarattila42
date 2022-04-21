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

function boardBuilder(board) {
    console.log(board)
    let boardContainer = document.createElement("div");
    let cardBoard = document.createElement("div");
    let title = document.createElement("h5");
    let button = document.createElement("button");
    boardContainer.setAttribute("class", "board-container");
    boardContainer.appendChild(cardBoard);
    cardBoard.setAttribute("class","board" );
    cardBoard.setAttribute("data-board-id",`${board.id}`);
    cardBoard.appendChild(title);
    title.innerText=`${board.title}`;
    boardContainer.appendChild(button);
    button.innerText = "Show Cards";
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

