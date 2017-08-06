const express = require( 'express' );
const router = express.Router();

router.get( '/', onApiHomeRoute );

function onApiHomeRoute( tRequenst, tResponse )
{
    tResponse.end( "api docs" );
}

module.exports = router;