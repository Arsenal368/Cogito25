from flask import Blueprint, request, jsonify
from storage import storage
from models import InsertUser

api = Blueprint('api', __name__, url_prefix='/api')

@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json() or {}
    insert_user = InsertUser(
        username=data.get('username', ''),
        password=data.get('password', ''),
        political_leanings=data.get('political_leanings')
    )
    user = storage.create_user(insert_user)
    return jsonify(user.__dict__), 201

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = storage.get_user(user_id)
    if user:
        return jsonify(user.__dict__)
    return jsonify({'error': 'User not found'}), 404

@api.route('/users/by-username/<username>', methods=['GET'])
def get_user_by_username(username):
    user = storage.get_user_by_username(username)
    if user:
        return jsonify(user.__dict__)
    return jsonify({'error': 'User not found'}), 404 