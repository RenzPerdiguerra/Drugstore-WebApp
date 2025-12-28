from backend.extensions import bcrypt
from backend.utils.sql_connector import get_sql_connection

conn = get_sql_connection()
#region DAO
def create_user(username, password_hash):
    cur = conn.cursor()
    query = ('INSERT INTO management.users (username, password_hash) '
             'VALUES (%s, %s) RETURNING id')
    cur.execute(query, (username, password_hash)) # check if three parameters work
    conn.commit()
    new_id = cur.fetchone()[0]
    
    return {'emp_id': new_id, 'username': username} # always return a dictionary
    
def get_user(username):
    cur = conn.cursor()
    query = ('SELECT * FROM management.users '
             'where username=%s')
    cur.execute(query, (username,))
    result = cur.fetchone()
    if result:
        return {'id': result[0], 'name': result[1], 'password_hash': result[2]}
    return None
    
#endregion
    
#region Service
def register_user(username, password):
    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8') # returns a byte for hashing
    return create_user(username, hashed_pw) # store as a string

def authenticate_user(username, password):
    user = get_user(username)
    if username and bcrypt.check_password_hash(user['password_hash'], password):
        return user

def create_token() 
#endregion


if __name__ == "__main__":
    conn = get_sql_connection()
    print(register_user('ssrenzp', 'mayday09'))