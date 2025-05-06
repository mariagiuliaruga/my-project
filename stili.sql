CREATE DATABASE mystileessence_db IF NOT EXISTS;
USE mystileessence_db;

CREATE TABLE utenti (
    email VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    data_registrazione DATETIME
);



