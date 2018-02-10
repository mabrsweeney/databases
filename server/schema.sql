DROP DATABASE chat;
CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  ID int NOT NULL auto_increment,
  name VARCHAR (20),
  PRIMARY KEY (ID)
);

CREATE TABLE rooms (
  ID int NOT NULL auto_increment,
  name VARCHAR (20),
  PRIMARY KEY (ID)
);

CREATE TABLE messages (
  ID int NOT NULL auto_increment,
  message VARCHAR (200),
  user_id INT,
  room_id INT,
  PRIMARY KEY (ID),
  FOREIGN KEY (user_id) REFERENCES users(ID),
  FOREIGN KEY (room_id) REFERENCES rooms(ID)
);

insert into rooms (name) values ('Hello');
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

