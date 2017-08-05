const fs = require( 'fs' );
const express = require( 'express' );
const router = express.Router();

//possible routes
router.get( '/', onHomeRoute );
router.get( '/test', onTestRoute );

//route handlers
function onHomeRoute( tRequest, tResponse )
{
    console.log( "you made it!" );
    onFileRead( 'server/views/index.html', tResponse );
}

function onTestRoute( tRequest, tResponse )
{
    tResponse.end( "sup man" );
}

//for serving the html files
function onFileRead( tFile, tResponse )
{
    fs.readFile( tFile, onFileReadComplete );

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

module.exports = router;