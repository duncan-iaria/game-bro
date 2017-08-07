const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const express = require( 'express' );

//routes
const indexRoute = require( './routes/index-route' );
const apiRoute = require( './routes/api-route' );
const surveyRoute = require( './routes/survey-route.js' );

//server
const server = express();
const PORT = process.env.PORT || 8001;
const router = express.Router();

server.use( express.static( path.join( __dirname, 'views/assets/build' ) ) );
server.use( bodyParser.urlencoded( { extended: true } ) );
server.use( bodyParser.json() );

//=========================
//  VIEW ENGINE
//=========================
server.set( 'views', path.join( __dirname, 'views' ) );
server.set( 'view engine', 'pug' );

//=========================
//  ROUTES
//=========================
server.use( '/', indexRoute );
server.use( '/api', apiRoute );
server.use( '/survey', surveyRoute );

//=========================
//  INIT
//=========================
server.listen( PORT, onServerInit );

function onServerInit()
{
    console.log( "server listening on port " + PORT );
}