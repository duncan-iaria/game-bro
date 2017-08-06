//=========================
//  BASE API ROUTE
//=========================
const express = require( 'express' );
const router = express.Router();

router.get( '/', onApiIndex );

function onApiIndex( tRequenst, tResponse )
{
    tResponse.end( "api docs" );
}

module.exports = router;