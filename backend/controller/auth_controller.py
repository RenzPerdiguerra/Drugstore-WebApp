from flask import Blueprint, request, jsonify
from backend.dao.auth_dao import register_user, authenticate_user

users_bp = Blueprint('users', __name__)

@users_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    user = register_user(data['username'], data['password'])
    return jsonify({'message': 'User successfully created', 'user': user}), 201 # why without parenthesis, what kind of data is this

@users_bp.route('/authenticate', methods=['POST'])
def authenticate():
    data = request.json
    user = authenticate_user(data['username'], data['password'])
    if user:
        return jsonify({'message': 'Login successful', 'user': user}), 200
    return jsonify({'message': 'Login failed'}), 401