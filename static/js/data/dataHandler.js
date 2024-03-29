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
    deleteColumnById: async function (elemId) {
        let data = {'columnId': elemId}
        return await apiDelete(`/api/statuses/${elemId}`, data)
    },
    updateColumnName: async function (elemId, name) {
        let data =  {'columnId': elemId, 'title': name }
        return await apiPut(`/api/statuses/${elemId}`, data)
    },

    updateCard: async function(cardId, cardTitle, boardId, statusId, cardOrder) {
    const data = {
        title: cardTitle,
        id: cardId,
        board_id: boardId,
        status_id: statusId,
        card_order: cardOrder,
    };

    return apiPut(`/api/cards/${cardId}`, data);
    },
    logUserIn: async function (userName, password) {
        return await apiPost('api/users/login', {
            'user_name': userName,
            'password': password
        });
    },
    logUserOut: async function() {
        await apiGet('api/users/logout')
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
