from flask import Blueprint, request, jsonify
from backend.utils.sql_connector import get_sql_connection
from backend.dao.emp_dao import get_end_user

conn = get_sql_connection()
emp_bp = Blueprint('emp', __name__, url_prefix='/emp')

@emp_bp.route('/verify', methods=['GET'])
def verify_end_user():
    request_payload = request.json()
    end_user_id = get_end_user(conn, request_payload)
    return jsonify({'message': 'End user successfully verified', 'id': end_user_id}), 200