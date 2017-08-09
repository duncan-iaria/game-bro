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
( 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 ),
( 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5 ),
( 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 );


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
( "Bro, you a hardcore gamer?" ),
( "How do you feel about co-op games?" ),
( "How about action games?" ),
( "Are you okay with chill games?" ),
( "Do you like simulations?" ),
( "How are you at solving puzzles?" ),
( "Do you even race, bro?" ),
( "On a scale of 1 to bro, how tite is Sonic!?" ),
( "How excited are you to meet a new gamer bro or brodette?!?" );


--INNER JOIN FOR USERNAMES AND ANSWERS
SELECT users.name, users.imgUrl, answers.answer1, answers.answer2, answers.answer3 ,answers.answer4, answers.answer5,answers.answer6,answers.answer7,answers.answer8, answers.answer9, answers.answer10
FROM answers
INNER JOIN users ON answers.userId = users.id;