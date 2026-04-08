from backend.extensions import bcrypt
from backend.utils.sql_connector import get_sql_connection

#region DAO
def create_user(username, password_hash, role):
    conn = get_sql_connection()
    cur = conn.cursor()
    query = ('INSERT INTO management.users (username, password_hash, role) '
             'VALUES (%s, %s, %s) RETURNING user_id')
    cur.execute(query, (username, password_hash, role))
    new_id = cur.fetchone()[0]
    
    conn.commit()
    cur.close()
    return {'id': new_id, 'username': username}
    
def get_user(username):
    conn = get_sql_connection()
    cur = conn.cursor()
    query = ('SELECT * FROM management.users '
             'where username=%s')
    cur.execute(query, (username,))
    result = cur.fetchone()
    if result:
        cur.close()
        return {'user_id': result[0], 'username': result[1], 'pw_hash': result[2], 'role': result[3]}
    
    cur.close()
    return None
#endregion
    
#region Service
def register_user(username, password, role):
    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    return create_user(username, hashed_pw, role) # store as a string

def authenticate_user(username, password):
    user = get_user(username)
    if username and bcrypt.check_password_hash(user['pw_hash'], password):
        return user
#endregion


if __name__ == "__main__":
    conn = get_sql_connection()