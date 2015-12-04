DROP DATABASE IF EXISTS chat;
CREATE DATABASE IF NOT EXISTS chat;

USE chat;

-- DROP TABLE users;

-- has-many: users has many messages
-- CREATE TABLE IF NOT EXISTS users (
--   -- id MEDIUMINT NOT NULL AUTO_INCREMENT,
--   name VARCHAR(15),
--   PRIMARY KEY (name)
-- );

-- DROP TABLE messages;

CREATE TABLE IF NOT EXISTS messages (
  id MEDIUMINT NOT NULL AUTO_INCREMENT,
  username VARCHAR(15),
  message VARCHAR(150),
  roomname VARCHAR(30),
  createdAt CHAR(24),
  PRIMARY KEY (id)

  -- FOREIGN KEY(username) REFERENCES users(name)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

-- INSERT INTO users (name) VALUES ('Rob');
INSERT INTO messages (username, message, roomname, createdAt)
  VALUES ('Rob', 'Making an SQL database', 'lobby', '2015-12-02T00:29:35.034Z');

-- DROP TABLE messages;
