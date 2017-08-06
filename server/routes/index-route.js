//=========================
//  HOME (INDEX) PAGE ROUTE
//=========================
const express = require( 'express' );
const router = express.Router();

//possible routes
router.get( '/', onIndexRoute );
router.get( '/test', onTestRoute );

//route handlers
function onIndexRoute( tRequest, tResponse )
{
    console.log( "you made it!" );
    tResponse.render( 'index', { title: "Game Bros"} );
}

function onTestRoute( tRequest, tResponse )
{
    tResponse.end( "sup man" );
}

module.exports = router;