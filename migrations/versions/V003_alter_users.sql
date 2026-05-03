-- migrations/versions/V003__alter_users.sql
DROP TABLE management.users;

CREATE TABLE management.users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password_hash varchar(255) NOT NULL,
    role TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);