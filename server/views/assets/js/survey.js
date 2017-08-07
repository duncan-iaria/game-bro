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
    }
    
    //can be used to attatch any handler to any elementt
    function attachClickHandler( tButton, tHandler )
    {
        tButton.addEventListener( 'click', tHandler );
    }

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
        answers[ tAnswerId ] = tAnswerValue;
        //console.log( answers );
    }
})();

surveyController.init();

console.log( 'survey js loaded' );