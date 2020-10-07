DROP DATABASE IF EXISTS burger_db;
CREATE DATABASE burger_db;

USE burger_db;

CREATE TABLE burgers (
    id INT AUTO_INCREMENT,
    name VARCHAR(255),
    devoured BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
)

INSERT INTO burgers (name)
VALUES 
("Single");
INSERT INTO burgers (name)
VALUES 
("Double");
INSERT INTO burgers (name)
VALUES 
("Triple");
INSERT INTO burgers (name)
VALUES 
("Vegan");
