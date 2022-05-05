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

export class HtmlElementBuilder {
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

    addAttribute(attributeName, attributeValue) {
        this.element.setAttribute(attributeName, attributeValue);
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

    addEventListener(eventName, eventHandler) {
        this.element.addEventListener(eventName, eventHandler)
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
            "boardId": `${boardId}`,
            "columnId": `${column.id}`
        })
        .addText(`${column.title}`)
        .addChild(new HtmlElementBuilder("button")
            .addClasses("bi bi-trash")
            .addDataAttributes({boardId: `${boardId}`, columnId: `${column.id}`})
            )

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
        .addChild(new HtmlElementBuilder("button")
            .addClasses("btn btn-primary")
            .addDataAttributes({
                boardId: `${board.id}`,
                bsToggle: "modal",
                bsTarget: "#new-card-modal"
            })
            .addText("Create Card")
        ) //new card button
        .element
}

function cardBuilder(card) {
    return new HtmlElementBuilder("div")
        .addClasses("card hidden")
        .addDataAttributes({cardId: `${card.id}`, columnId: `${card.status_id}`, cardOrder: `${card.card_order}`})
        .addText(`${card.title}`)
        .addChild(new HtmlElementBuilder("div")
            .addClasses("card-remove")
            .addChild(new HtmlElementBuilder("i")
                .addClasses("bi bi-trash")
                .addDataAttributes({cardId: `${card.id}`})
            ) //trash
        ) //card remove
        .element
}
