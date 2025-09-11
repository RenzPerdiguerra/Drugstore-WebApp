import psycopg2

__cnx = None

def get_connection():
    if __cnx is None:
        __cnx = psycopg2.connect(dbname="mp", user="postgres",
                                 password="your_password", host="localhost",
                                 port="5432")
    return __cnx


