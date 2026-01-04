from flask import Blueprint, request, jsonify, current_app
from backend.dao.auth_dao import register_user, authenticate_user
from backend.utils.jwt_utils import create_token
from backend.security.require_auth import require_auth

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json
    user = register_user(data['username'], data['password'], data['role'])
    return jsonify({'message': 'User successfully created', 'user': user}), 201 # why without parenthesis, what kind of data is this

@auth_bp.route('/authenticate', methods=['POST'])
def authenticate():
    data = request.json
    user = authenticate_user(data['username'], data['password'])
    if user:
        token = create_token(
            current_app.config['JWT_SECRET'],
            current_app.config['JWT_ALGORITHM'],
            user_id=user['user_id'],
            username=user['username'],
            role=user['role'],
            ttl_minutes=current_app.config['JWT_ACCESS_TTL_MINUTES']
        )
        print({
            'user_id': user['user_id'],
            'username': user['username'],
            'role': user['role']
        })
        
        return jsonify({'access token': token}), 200
    return jsonify({'message': 'Login failed'}), 401

@auth_bp.route('/me', methods=['GET'])
@require_auth
def me(current_user_id=None, current_username=None, current_user_role=None):
    return jsonify({
        'message': 'Protected data',
        'user_id': current_user_id,
        'username': current_username,
        'role': current_user_role
    })