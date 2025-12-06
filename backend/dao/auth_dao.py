from ..main import bcrypt
from ..utils.sql_connector import get_sql_connection

conn = get_sql_connection()

#region DAO
def create_user(username, password_hash):
    cur = conn.cursor()
    query = ('INSERT INTO users (username, password_hash)'
             'VALUES (%s, %s) RETURNING id')
    cur.execute(query, (username, password_hash)) # check if three parameters work
    conn.commit()
    new_id = cur.fetchone()[0]
    
    return {'id': new_id, 'username': username} # always return a dictionary
    
def get_user(username):
    cur = conn.cursor()
    query = ('SELECT username FROM management.users'
             'where username="%s" RETURNING id')
    cur.execute(query, username)
    user_id = cur.fetchone()[0]

    return {'id': user_id}
    
#endregion
    
#region Service
def register_user(username, password):
    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8') # returns a byte for hashing
    return create_user(username, hashed_pw) # store as a string

def authenticate_user(username, password):
    user = get_user(username)
    if username and bcrypt.check_password_hash(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
        return user
    
#endregion


if __name__ == "__main__":
    conn = get_sql_connection()
    print(register_user('ssrenzp', 'mayday09'))