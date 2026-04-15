CREATE TABLE IF NOT EXISTS users (
    id            SERIAL PRIMARY KEY,
    name          VARCHAR(100) NOT NULL,
    email         VARCHAR(255) NOT NULL UNIQUE,
    password      VARCHAR(255) NOT NULL,
    refresh_token TEXT SET DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS seats (
    id       SERIAL PRIMARY KEY,
    isbooked INT DEFAULT 0,
    user_id  INT REFERENCES users(id),
    name     VARCHAR(255)
);

INSERT INTO seats (isbooked)
SELECT 0 FROM generate_series(1, 20)
WHERE NOT EXISTS (SELECT 1 FROM seats LIMIT 1);

