import psycopg2
import os

def get_sql_connection():
    database_url = os.environ.get("DATABASE_URL")
    
    if database_url:
        # Render provides a full URL string
        conn = psycopg2.connect(database_url)
    else:
        # Local fallback using individual credentials
        conn = psycopg2.connect(
            host=os.environ.get("DB_HOST", "localhost"),
            database=os.environ.get("DB_NAME", "mp"),
            user=os.environ.get("DB_USER", "postgres"),
            password=os.environ.get("DB_PASSWORD", "mayday09"),
            port=os.environ.get("DB_PORT", "5432")
        )
    return conn