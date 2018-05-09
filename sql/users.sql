DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friendships;

CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        first VARCHAR (255) NOT NULL,
        last VARCHAR (255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        hash VARCHAR (100) NOT NULL,
        url VARCHAR(255),
        bio VARCHAR (700),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER NOT NULL,
    recipient_id INTEGER NOT NULL,
    status INTEGER NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);