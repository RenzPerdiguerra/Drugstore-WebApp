from functools import wraps
from flask import request, current_app, jsonify, make_response
from backend.utils.jwt_utils import create_token, decode_token

def require_auth(func):
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
                current_app.config['JWT_TOKEN'],
                current_app.config['JWT_ALGORITHM'],
                token
                )
        except Exception as e:
            return jsonify({'error': 'Invalid or expired token', 'detail': str(e)}), 401
        
        # Inject user info into route
        user_id = payload.get('sub')
        username = payload.get('')
        role = payload.get('role')
        
        # Call the route handler
        response = func(current_user_id=user_id, current_user_role=role, *args, **kwargs)
        
        # Issue a fresh token (sliding expiration)
        refreshed = create_token(
            current_app.config['JWT_SECRET'],
            current_app.config['JWT_ALGORITHM'],
            user_id,
            username,
            role,
            current_app.config['JWT_ACCESS_TTL_MINUTES']
        )
        
        # Attached refresh token to the response headers
        # Clients should read this header and replace their stored token
        if isinstance(response, tuple):
            body, status, *rest = response
            resp = make_response(body, status, *(rest or []))
        else:
            resp = make_response(response)
        
        resp.headers['X-Refreshed-Token'] = refreshed
        
        return resp
    return wrapper