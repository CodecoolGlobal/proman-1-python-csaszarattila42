from flask import Flask, render_template, url_for, request, session
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/statuses")
@json_response
def get_statuses():
    return queries.get_statuses()


@app.route("/api/statuses/<int:column_id>", methods=["PUT"])
@json_response
def update_column_name(column_id):
    if request.method == "PUT":
        title = request.json['title']
        queries.update_column_name(column_id, title)
        return {}, 200


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/", methods=["POST"])
@json_response
def create_board():
    queries.create_board(request.json["title"])
    return {}, 200


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/api/boards/<int:board_id>/cards/", methods=["POST"])
@json_response
def add_new_card_for_board(board_id: int):
    queries.create_new_card_for_board(board_id, request.json["title"])

    
@app.route("/api/board/<int:board_id>", methods=["PUT", "DELETE"])
@json_response
def update_board_name(board_id):
    if request.method == "PUT":
        board_name = request.json['name']
        queries.update_board_name(board_id, board_name)
        return {}, 200
    if request.method == "DELETE":
        queries.delete_board(board_id)
        return {}, 200


@app.route("/api/boards/<int:board_id>/cards/<int:card_id>", methods=["DELETE"])
@json_response
def delete_card(board_id, card_id):
    queries.delete_card(board_id, card_id)


@app.route("/api/cards/<int:card_id>", methods=["PUT"])
@json_response
def update_card(card_id):
    body = request.get_json()
    body['id'] = card_id
    queries.update_card(body)

def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
