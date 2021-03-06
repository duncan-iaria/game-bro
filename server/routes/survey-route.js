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
    
    //enable cors/post/put
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

//consider moving this to the api route
router.get( '/match/:userId', onGetMatch );

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

function onGetMatch( tRequest, tResponse )
{
    console.log( 'user id =  ' + tRequest.params.userId );
    surveyQueries.getMatch( tRequest.params.userId, tResponse, onGetMatchComplete );
}

function onGetMatchComplete( tResponse, tData )
{   
    //return the match from the server
    //console.log( tData );
    tResponse.json( tData );
}

module.exports = router;