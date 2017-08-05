const express = require( 'express' );
const router = express.Router();

router.get( '/api', onApiHomeRoute );

function onApiHomeRoute( tRequenst, tResponse )
{
    tResponse.end( "api docs" );
}

module.exports = router;