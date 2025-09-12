import psycopg2

__cnx = None

def get_sql_connection():
    global __cnx
    if __cnx is None:
        __cnx = psycopg2.connect(dbname="mp", user="postgres",
                                 password="mayday09", host="localhost",
                                 port="5432")
    return __cnx


