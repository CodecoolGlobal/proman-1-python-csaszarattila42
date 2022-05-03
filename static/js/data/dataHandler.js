export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
        return await apiGet(`/api/boards/${boardId}`);
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
        return await apiGet(`/api/statuses`)
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle, privateBoard) {
        return await apiPost('/api/boards/', {title: boardTitle, 'private':privateBoard});
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        apiPost(`/api/boards/${boardId}/cards/`, {title:cardTitle});
    },
    updateBoardName: async function (elemId, name) {
        let data =  {'boardId': elemId, 'name': name }
        return await apiPut(`/api/board/${elemId}`, data)
    },
    deleteCard: async function (boardId, cardId) {
        apiDelete(`/api/boards/${boardId}/cards/${cardId}`);
    },
    deleteBoardById: async function (elemId) {
        return await apiDelete(`/api/board/${elemId}`)
    },
    updateColumnName: async function (elemId, name) {
        let data =  {'columnId': elemId, 'title': name }
        return await apiPut(`/api/statuses/${elemId}`, data)
    },
    updateCard: async function(cardId, card) {
        const data = {
            board_id: card.board_id,
            status_id: card.status_id,
            card_order: card.card_order,
            title: card.title,
            id: cardId,
        };

        return apiPut(`/api/cards/${cardId}`, data);
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
    return await response.json();
}

async function apiDelete(url) {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        //body: JSON.stringify(payload)
    });
}

async function apiPut(url, data) {
    const request = new Request(url, {body: JSON.stringify(data), method: "PUT", headers: {"Content-Type": 'application/json' }});
    let response = await fetch(request);
    if (response.ok) {
        return await response.json();
    }

}

async function apiPatch(url) {
}
