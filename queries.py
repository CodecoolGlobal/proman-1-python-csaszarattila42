import data_manager


def get_statuses():
    statuses = data_manager.execute_select(
        """SELECT id, title FROM statuses ORDER BY id;"""
    )
    return statuses


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def update_board_name(board_id, name):
    update = data_manager.execute_update(
        """
        UPDATE boards
        SET title = %(name)s
        WHERE id = %(board_id)s
        """
        , {"board_id": board_id, "name": name}
    )
    return update

def get_board_by_id(id):
    """
    Gather all boards
    :return:
    """
    return data_manager.execute_select(
        """
        SELECT * FROM boards
        WHERE boards.id = %(id)s
        ;
        """
    )


def create_new_card_for_board(board_id, title):
    new_card = """INSERT INTO cards (board_id, status_id, title, card_order)
    VALUES (%(board_id)s, 1, %(title)s, 1)"""
    data_manager.execute_insert(new_card, {'board_id': board_id, 'title': title})


def delete_card(board_id, id):
    query = """DELETE FROM cards WHERE id = %(id)s AND board_id = %(board_id)s"""
    data_manager.execute_delete(query, {'id': id, 'board_id': board_id})


def create_board(board_title):
    data_manager.execute_insert(
        """
        INSERT INTO boards 
        (title)
        VALUES (%(title)s);
        """,
        {"title": board_title}
    )


def delete_board(board_id):
    delete = """DELETE FROM boards WHERE id = %(board_id)s
    """
    data_manager.execute_delete(delete, {'board_id': board_id})


def update_column_name(column_id, title):
    update = data_manager.execute_update(
        """
        UPDATE statuses
        SET title = %(title)s
        WHERE id = %(column_id)s
        """
        , {"column_id": column_id, "title": title}
    )
    return update
