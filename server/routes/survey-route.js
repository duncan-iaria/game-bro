//=========================
//  SURVEY ROUTE
//=========================
const express = require( 'express' );
const surveyQueries = require( '../db/survey-queries' );
const router = express.Router();

router.get( '/', onSurveyRoute );

//when the user navigates to the route
function onSurveyRoute( tRequest, tResponse )
{
    console.log( "survey route hit" );

    //query the db for all the questions
    surveyQueries.getAllQuestions( tResponse, onGetQuestionsComplete );
}

//when the db query is complete, use it to render the page
function onGetQuestionsComplete( tResponse, tData )
{
    console.log( tData );
    tResponse.render( 'survey', { surveyText: "Game Bros Survey Time!!!", questions: tData } );
}

module.exports = router;