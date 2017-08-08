//=========================
//  SURVEY PAGE JS
//=========================
import '../scss/survey.scss';

//survey controller module declaration
var surveyController = ( function()
{
    const answers = {};

    const publicAPI = 
    {
        init: init,
        answers: answers,
        postAnswers: postAnswers,
    }

    return publicAPI;

    //=========================
    //  INIT
    //=========================
    function init()
    {
        initSurveyButtons();
        initSubmitButton();
    }
    
    //can be used to attatch any handler to any elementt
    function attachClickHandler( tButton, tHandler )
    {
        tButton.addEventListener( 'click', tHandler );
    }

    //=========================
    //  SURVEY BUTTONS
    //=========================
    //setup survey value buttons
    function initSurveyButtons()
    {
        //get all buttons
        const buttons = document.querySelectorAll( '.question-button' );

        //attatch button to all survey questions
        buttons.forEach( function( button ){ attachClickHandler( button, onSurveyValueClicked ) } );
    }

    //survey value button functionality
    function onSurveyValueClicked( tEvent )
    {
        //answers[ tEvent.target.parentElement.dataset.id ] = tEvent.target.dataset.value;
        //console.log( tEvent.target.parentElement.children );
        setSelected( tEvent.target );
        addAnswer( tEvent.target.parentElement.dataset.id, tEvent.target.dataset.value );
    }

    //visually set the selected answer
    function setSelected( tTarget )
    {
        Array.from( tTarget.parentElement.children ).forEach( clearSelected );

        function clearSelected( tElement )
        {
            if( tElement.classList.contains( 'selected' ) )
            {
                //console.log( 'removed some selected ' + tElement.classList );
                tElement.classList.remove( 'selected' );
            }
            console.log( tElement );
        }

        //console.log( 'added selected ' + tTarget.classList );
        tTarget.classList.add( 'selected' );
    }

    //add answer to the answer object (to be sent on submit)
    function addAnswer( tAnswerId, tAnswerValue )
    {
        answers[ 'answer' + tAnswerId ] = parseInt( tAnswerValue );
        //console.log( answers );
    }

    //=========================
    //  SUBMIT BUTTON
    //=========================
    function initSubmitButton()
    {
        const tempSubmitButton = document.getElementById( 'submit-survey' );
        attachClickHandler( tempSubmitButton, onSubmitClicked );
    }

    function onSubmitClicked( tEvent )
    {
        //stop default actions (probably not necessary)
        tEvent.preventDefault();
        console.log( answers );

        //create new user
        const tempUser = {};

        tempUser.name = document.getElementById( 'user-name' ).value;
        tempUser.imgUrl = document.getElementById( 'user-img-url' ).value;
        
        //first submit user to the db
        postData( 'user', tempUser, function(){ onPostUserCompete } );

        //function to add answers to the db associated with the correct user
        function postAnswers( tUrl, tUserId, tAnswers )
        {
            //build answer obj (add user id to it)
            tAnswers.userId = tUserId;

            //post the data
            postData( tUrl, tAnswers, onPostCompete );
        }

    }  

    //TODO break this up for all posts
    function postData( tUrl, tData, tCallback )
    {
        const tempUrl = "./survey/" + tUrl;
        const tempMethod = "POST";

        const tempAsync = true;
        const tempRequest = new XMLHttpRequest();

        tempRequest.onload = function(){ tCallback( tempRequest ) };

        tempRequest.open( tempMethod, tempUrl, tempAsync );
        tempRequest.setRequestHeader( "Content-Type", "application/json;charset=UTF-8" );
        tempRequest.send( JSON.stringify( tData ) );

        console.log( 'we sent the stuff' );
    }

    function onPostUserCompete( tRequest )
    {
        onPostCompete( tRequest );
        
        //getting the new user ID back from the server
        let tempData = tRequest.response;
        tempData = JSON.parse( tempData );

        postAnswers( 'answers', tempData.id, answers );
    }

    //generic callback when post has completed( for sending back codes)
    function onPostCompete( tRequest )
    {
        const tempStatus = tRequest.status;
        console.log( 'server got the stuff ' + tempStatus );
    }

})();

surveyController.init();

console.log( 'survey js loaded' );