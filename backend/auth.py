from sql_connector import get_sql_connection

def authenticate_user(username: str, password: str) -> bool:
    # Returns true for if matching record exists
    conn = get_sql_connection()
    try:
        with conn.cursor() as cur:
            query = """
                SELECT id
                FROM users
                WHERE username = %s, 
                AND password = %s
                """ # Use of placeholders to prevent SQL Injection
            cur.execute(query, (username, password)) 
            return cur.fetchone() is not None # returns a Tuple confirmed by the boolean operator
    finally:
        conn.close() #Ensure connection to database is closed for Isolation of procedure