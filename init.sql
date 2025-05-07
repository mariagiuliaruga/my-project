CREATE DATABASE IF NOT EXISTS mystyleessence_db;
USE mystyleessence_db;

CREATE TABLE IF NOT EXISTS utenti (
    email VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    data_registrazione DATETIME
);


CREATE TABLE IF NOT EXISTS stili_donna (
    immagine VARCHAR(255) NOT NULL PRIMARY KEY,
    testo VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS password_reset (
    email VARCHAR(255) NOT NULL,
    token VARCHAR(255) NOT NULL PRIMARY KEY,
    expires_at DATETIME
);

INSERT INTO utenti (email, password, data_registrazione) VALUES ('stefi@star', 's', '2025-05-06 13:41:00');
