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
        onAddUser( tempUser );

        //then submit answers to the db

    }  

    function onAddUser( tUser )
    {
        const url = "./survey/user";
        const method = "POST";

        const async = true;
        const request = new XMLHttpRequest();

        request.onload = function()
        {
            const status = request.status; // HTTP response status, e.g., 200 for "200 OK"
            
            //getting the new user ID back from the server
            let data = request.response;
            data = JSON.parse( data );

            console.log( 'server got the stuff ' + status );
            console.log( 'server got the stuff ' + data.id );           
        }

        request.open( method, url, async );
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send( JSON.stringify( tUser ) );

        console.log( 'we sent the stuff' );
    }

})();

surveyController.init();

console.log( 'survey js loaded' );