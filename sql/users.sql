DROP TABLE IF EXISTS users;

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
