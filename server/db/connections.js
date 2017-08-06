//CONNECTION TO MySQL DB
require( 'dotenv' ).config( { path: 'server/.env' } );
const mysql = require( 'mysql' );
const env = process.env;

//=========================
//  CONNECTION
//=========================
const connection = mysql.createConnection
(
    {
        host: env.HOST,
        port: env.DB_PORT,

        user: env.USER,
        password: env.PASSWORD,
        database: env.DB
    }
);

//=========================
//  CONNECTION LOGIC
//=========================
connection.connect( onConnectionComplete );

function onConnectionComplete( tError )
{
    if( tError )
    {
        console.log( 'there was an error when connecting: ' + tError );
    }
    else
    {
        console.log( "MySQL connection complete at " + env.DB_PORT );
    }
}

//=========================
//  EXPORT
//=========================
module.exports = connection;