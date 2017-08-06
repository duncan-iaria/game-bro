//=========================
//  SURVEY PAGE JS
//=========================
import '../scss/survey.scss';

function test( tEvent )
{
    console.log( tEvent );
}

const buttons = document.querySelectorAll( '.question-button' );

buttons.forEach( ( button ) => {
    button.addEventListener( 'click', onClicked );
}); 

function onClicked( tEvent )
{
    console.log('clicked');
    console.log( tEvent );
    console.log( tEvent.target.dataset.value );
    console.log( tEvent.target.parentElement.dataset.id );
       
}

console.log( 'survey js loaded' );