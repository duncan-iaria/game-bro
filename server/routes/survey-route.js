//=========================
//  SURVEY ROUTE
//=========================
const express = require( 'express' );
const surveyQueries = require( '../db/survey-queries' );
const router = express.Router();

//=========================
// MIDDLEWARE
//=========================
router.use( function( tRequest, tResponse, tNext ) 
{
    //prove that it's working
    console.log( 'Middleware ENGAGED!' );
    
    //enable cors
    tResponse.header( "Access-Control-Allow-Origin", "*" );
    tResponse.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
    tResponse.header( 'Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS' );
    
    //continue to the next route
    tNext();
});

//=========================
// ROUTES
//=========================
router.get( '/', onSurveyRoute );
router.post( '/user', onUserSubmit );
router.post( '/answers', onAnswerSubmit );


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

function onUserSubmit( tRequest, tResponse )
{
    console.log( 'oh man we got something here boss' );
    console.log( tRequest.body );

    surveyQueries.addNewUser( tRequest.body, tResponse );
}

function onAnswerSubmit( tRequest, tResponse )
{
    console.log( 'oh man we got answers here boss' );
    console.log( tRequest.body );

    surveyQueries.addNewAnswerSet( tRequest.body, tResponse );
}

module.exports = router;