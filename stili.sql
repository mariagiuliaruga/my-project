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
