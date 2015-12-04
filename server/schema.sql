CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  username varchar(15),
  message varchar(150),
  roomname varchar(30),
  createdAt char(24)
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

