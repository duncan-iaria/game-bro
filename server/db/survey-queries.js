const connection = require( './connections' );

//=========================
//  QUERIES
//=========================
module.exports = 
{   
    //response callback passed from the route
    getAllQuestions: function( tResponse, tCallback )
    {
        connection.query( "SELECT * FROM questions", onQuestionQueryComplete );

        function onQuestionQueryComplete( tError, tData )
        {
            tCallback( tResponse, tData );
        }   
    },

    addNewUser: function( tUser, tResponse )
    {
        connection.query( "INSERT INTO users SET ?", tUser, onAddUserComplete );
        
        function onAddUserComplete( tError, tData )
        {
            if( tError )
            {
                console.log( 'error on inserting user: ' + tError );
            }
            else
            {
                console.log( 'user successfully added' );
                tResponse.json( { status: 'ok', id: tData.insertId } );
            }      
        }
    },

    addNewAnswerSet: function( tAnswers, tResponse )
    {
        connection.query( "INSERT INTO answers SET ?", tAnswers, onAddAnswersComplete );
        
        function onAddAnswersComplete( tError, tData )
        {
            if( tError )
            {
                console.log( 'error on inserting answers: ' + tError );
            }
            else
            {
                console.log( 'answers successfully added' );
                tResponse.json( { status: 'ok' } );
            }      
        }
    }
}