const fs = require( 'fs' );
const bodyParser = require( 'body-parser' );
const path = require( 'path' );
const express = require( 'express' );

const server = express();
const PORT = process.env.PORT || 8001;

//middleware for our static files (such as js and css)
server.use( express.static( path.join( __dirname, 'views/assets/build' ) ) );

server.get( '/', onHomeRoute );

function onHomeRoute( tRequest, tResponse )
{
    console.log( "you made it!" );
    fs.readFile( 'server/views/index.html', onFileReadComplete );

    function onFileReadComplete( tError, tData )
    {
        if( tError )
        {
            console.log( "error when reading file: " + tError );
        }

        tResponse.writeHead( 200, { 'Content-Type': 'text/html' } );
        tResponse.end( tData );
    }
}

server.listen( PORT, onServerInit );

function onServerInit()
{
    console.log( "server listening on port " + PORT );
}