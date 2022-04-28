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

class HtmlElementBuilder {
    #element;

    constructor(tagName) {
        this.#element = document.createElement(tagName);
    }

    addClasses(classes) {
        classes.split(" ").forEach(cssClass => this.element.classList.add(cssClass));
        return this;
    }

    addDataAttributes(attributes) {
        for (const [attributeName, attributeValue] of Object.entries(attributes)) {
            this.element.dataset[attributeName] = attributeValue;
        }

        return this;
    }

    addChild(child) {
        if (child instanceof HtmlElementBuilder) {
            this.element.appendChild(child.element);
        } else {
            this.element.appendChild(child);
        }
        return this;
    }

    addText(text) {
        this.addChild(document.createTextNode(text));
        return this;
    }

    get element() {
        return this.#element;
    }
}

function columnBuilder(column,boardId) {
    return new HtmlElementBuilder('div')
        .addClasses("board-column")
        .addDataAttributes({
            "columnTitle": `${column.title}`,
            "boardId": `${boardId}`
        })
        .addText(`${column.title}`)
        .addChild(document.createElement("div"))
        .addChild(new HtmlElementBuilder('div')
            .addClasses("board-column-title")
        )
        .element
}

function boardBuilder(board) {
    return new HtmlElementBuilder("div")
        .addClasses("board-container")
        .addChild(new HtmlElementBuilder("span")
            .addClasses("board-title")
            .addDataAttributes({boardId: `${board.id}`})
            .addText(`${board.title}`)
        ) //title
        .addChild(new HtmlElementBuilder("button")
            .addDataAttributes({boardId: `${board.id}`})
            .addText(" 🗑️ ")
        ) //delete button
        .addChild(new HtmlElementBuilder("section")
            .addClasses("board")
            .addDataAttributes({boardId: `${board.id}`})
            .addChild(document.createElement("div")) //board header
        ) //card board
        .addChild(new HtmlElementBuilder("button")
            .addClasses("toggle-board-button")
            .addDataAttributes({boardId: `${board.id}`})
            .addText("Show Cards")
        ) //show button
        .addChild(createNewCardButtonBuilder(board))
        .element
}

function cardBuilder(card) {
    let cardDom = document.createElement("div");
    let cardRemove = document.createElement("div");
    let trash = document.createElement("i")
    cardRemove.classList.add("card-remove")
    trash.setAttribute("class", "bi bi-trash");
    trash.setAttribute("data-card-id",`${card.id}`);
    cardRemove.appendChild(trash);
    cardDom.setAttribute("class", "card");
    cardDom.classList.add("hidden");
    cardDom.setAttribute("data-card-id",`${card.id}`);
    cardDom.innerText=`${card.title}`;
    cardDom.appendChild(cardRemove)
    return cardDom;
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

