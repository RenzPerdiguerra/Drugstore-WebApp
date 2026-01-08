import time
import jwt

def create_token(secret, algorithm, user_id, username, role, ttl_minutes):
    now = int(time.time())
    exp = now + ttl_minutes * 60
    payload = {
        'user_id': str(user_id), # Check str formatting req later
        'username': username,
        'role': role,
        'iat': now,
        'exp': exp
    }
    
    return jwt.encode(payload, secret, algorithm=algorithm) # verify if working  

def decode_token(token, secret, algorithm):
    return jwt.decode(token, secret, algorithms=[algorithm])