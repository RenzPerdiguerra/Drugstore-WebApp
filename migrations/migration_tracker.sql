-- migrations/migration_tracker.sql
CREATE TABLE IF NOT EXISTS management.schema_migrations (
    id              SERIAL PRIMARY KEY,
    version         VARCHAR(10)  NOT NULL UNIQUE,
    filename        VARCHAR(255) NOT NULL,
    applied_at      TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);