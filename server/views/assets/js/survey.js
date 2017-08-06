//=========================
//  SURVEY PAGE JS
//=========================
import '../scss/survey.scss';

//survey controller module declaration
var surveyController = ( function()
{
    const publicAPI = 
    {
        init: init,
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
        console.log(' clicked' );
        console.log( tEvent );
        console.log( tEvent.target.dataset.value );
        console.log( tEvent.target.parentElement.dataset.id );
    }
})();

surveyController.init();

console.log( 'survey js loaded' );