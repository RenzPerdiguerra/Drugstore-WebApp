from functools import wraps
from flask import request, jsonify, make_response, current_app
from backend.utils.jwt_utils import decode_token

def invalidate_auth(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Extract bearer token
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Missing or invalid Authorization header'}), 401
        token = auth_header.split(' ', 1)[1].strip()
        if not token:
            return jsonify({'error': 'Token not provided'}), 401

        # Verify token
        try:
            payload = decode_token(
                token,
                current_app.config['JWT_SECRET'],
                current_app.config['JWT_ALGORITHM'],
            )
        except Exception as e:
            return jsonify({'error': 'Invalid or expired token', 'detail': str(e)}), 401

        # Inject user info into route
        user_id = payload.get('user_id')
        username = payload.get('username')
        role = payload.get('role')

        # Call the route handler
        response = func(current_user_id=user_id,
                        current_username=username,
                        current_user_role=role,
                        *args, **kwargs)

        # Build response without refreshing token
        if isinstance(response, tuple):
            body, status, *rest = response
            resp = make_response(body, status, *(rest or []))
        else:
            resp = make_response(response)

        # Explicitly remove any refreshed token header
        resp.headers['X-Refreshed-Token'] = ''
        resp.headers['X-Token-Invalidated'] = 'true'

        return resp
    return wrapper