# migrations/run_migrations.py
import os
import sys

# make sure backend is importable
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from backend.utils.sql_connector import get_sql_connection

MIGRATIONS_DIR = os.path.join(os.path.dirname(__file__), 'versions')

def ensure_tracker_table(cur):
    """Create the migration tracker table if it doesn't exist."""
    cur.execute("""
        CREATE SCHEMA IF NOT EXISTS management;
        CREATE TABLE IF NOT EXISTS management.schema_migrations (
            id          SERIAL PRIMARY KEY,
            version     VARCHAR(50)  NOT NULL UNIQUE,
            filename    VARCHAR(255) NOT NULL,
            applied_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
        );
    """)

def get_applied_migrations(cur):
    """Return a set of already applied migration versions."""
    cur.execute("SELECT version FROM management.schema_migrations")
    return {row[0] for row in cur.fetchall()}

def get_pending_migrations(applied):
    """Return sorted list of migration files not yet applied."""
    files = sorted(f for f in os.listdir(MIGRATIONS_DIR) if f.endswith('.sql'))
    pending = []
    for f in files:
        version = f.split('__')[0]  # extract V001, V002 etc.
        if version not in applied:
            pending.append((version, f))
    return pending

def run_migration(cur, version, filename):
    """Run a single migration file and record it."""
    filepath = os.path.join(MIGRATIONS_DIR, filename)
    with open(filepath, 'r') as f:
        sql = f.read()
    print(f"  Running {filename}...")
    cur.execute(sql)
    cur.execute(
        "INSERT INTO management.schema_migrations (version, filename) VALUES (%s, %s)",
        (version, filename)
    )
    print(f"{filename} applied") #find a way to do a rollback

def run_all_migrations():
    conn = get_sql_connection()
    cur = conn.cursor()

    try:
        ensure_tracker_table(cur)
        conn.commit()

        applied = get_applied_migrations(cur)
        pending = get_pending_migrations(applied)

        if not pending:
            print("No pending migrations. Database is up to date.")
            return

        print(f"Found {len(pending)} pending migration(s):")
        for version, filename in pending:
            run_migration(cur, version, filename)

        conn.commit()
        print("All migrations applied successfully.")

    except Exception as e:
        conn.rollback()
        print(f"Migration failed: {e}")
        raise

    finally:
        cur.close()
        conn.close()

if __name__ == '__main__':
    run_all_migrations()