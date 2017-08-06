CREATE DATABASE game_bro_db;
USE game_bro_db;

DROP TABLE IF EXISTS users;
CREATE TABLE users
(
    id INTEGER( 11 ) AUTO_INCREMENT NOT NULL,
    name VARCHAR( 30 ) NOT NULL,
    imgUrl VARCHAR( 150 ),
    PRIMARY KEY( id )
);

INSERT INTO users ( name, imgUrl )
VALUES
( "Duncan", "http://duncan.jpg" ),
( "Rhiannon", "http://rhi.jpg" ),
( "Sophie", "http://sophie.jpg" );

DROP TABLE IF EXISTS answers;
CREATE TABLE answers
(
    userId INTEGER( 11 ) NOT NULL,
    answer1 INTEGER( 10 ) NOT NULL DEFAULT 0,
    answer2 INTEGER( 10 ) NOT NULL DEFAULT 0,
    answer3 INTEGER( 10 ) NOT NULL DEFAULT 0,
    answer4 INTEGER( 10 ) NOT NULL DEFAULT 0,
    answer5 INTEGER( 10 ) NOT NULL DEFAULT 0,
    answer6 INTEGER( 10 ) NOT NULL DEFAULT 0,
    answer7 INTEGER( 10 ) NOT NULL DEFAULT 0,
    answer8 INTEGER( 10 ) NOT NULL DEFAULT 0,
    answer9 INTEGER( 10 ) NOT NULL DEFAULT 0,
    answer10 INTEGER( 10 ) NOT NULL DEFAULT 0
);

INSERT INTO answers ( userId, answer1, answer2, answer3, answer4, answer5, answer6, answer7, answer8, answer9, answer10 )
VALUES
( 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 );

DROP TABLE IF EXISTS questions;
CREATE TABLE questions
(
    id INTEGER( 11 ) AUTO_INCREMENT NOT NULL,
    question VARCHAR( 140 ),
    PRIMARY KEY( id )
);

INSERT INTO questions ( question )
VALUES
( "You like to game, bro?" ),
( "Are you a bro, or a bro-ette?" ),
( "That doesn't make any sense, does it?" );
