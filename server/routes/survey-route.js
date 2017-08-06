const express = require( 'express' );
const router = express.Router();

router.get( '/', onSurveyRoute );

function onSurveyRoute( tRequest, tResponse )
{
    console.log( "survey route hit" );
    tResponse.render( 'survey', { surveyText: "Game Bros Survey Time!!!" } );
}

module.exports = router;