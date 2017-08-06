const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const express = require( 'express' );

const htmlRoutes = require( './routes/html-routes' );
const apiRoutes = require( './routes/api-routes' );

const server = express();
const PORT = process.env.PORT || 8001;

//middleware for our static files (such as js and css)
server.use( express.static( path.join( __dirname, 'views/assets/build' ) ) );

//setting up views/view engine
server.set( 'views', path.join( __dirname, 'views' ) );
server.set( 'view engine', 'pug' );

//routes
server.use( '/', htmlRoutes );
server.use( '/', apiRoutes );

server.listen( PORT, onServerInit );

function onServerInit()
{
    console.log( "server listening on port " + PORT );
}