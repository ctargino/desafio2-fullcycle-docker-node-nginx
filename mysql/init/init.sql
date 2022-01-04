CREATE DATABASE nodedb;
GRANT ALL PRIVILEGES ON nodedb.* TO 'myuser'@'%' IDENTIFIED BY 'mysql';
GRANT ALL PRIVILEGES ON nodedb.* TO 'myuser'@'localhost' IDENTIFIED BY 'mysql';
USE nodedb
CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255), primary key(id));