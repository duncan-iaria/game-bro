const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const express = require( 'express' );

const indexRoute = require( './routes/index-route' );
const apiRoute = require( './routes/api-route' );
const surveyRoute = require( './routes/survey-route.js' );

const server = express();
const PORT = process.env.PORT || 8001;

//middleware for our static files (such as js and css)
server.use( express.static( path.join( __dirname, 'views/assets/build' ) ) );

//setting up views/view engine
server.set( 'views', path.join( __dirname, 'views' ) );
server.set( 'view engine', 'pug' );

//routes
server.use( '/', indexRoute );
server.use( '/api', apiRoute );
server.use( '/survey', surveyRoute );

server.listen( PORT, onServerInit );

function onServerInit()
{
    console.log( "server listening on port " + PORT );
}