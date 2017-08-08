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
    },

    getMatch: function( tUserId, tResponse, tCallback )
    {
        connection.query
        ( 
            'SELECT users.name, users.imgUrl, answers.answer1, answers.answer2, answers.answer3 ,answers.answer4, ' + 
            'answers.answer5,answers.answer6,answers.answer7,answers.answer8, answers.answer9, answers.answer10 ' +
            'FROM answers ' +
            'INNER JOIN users ON answers.userId = users.id;',
            calculateMatch
        )

        function calculateMatch( tError, tData )
        {
            if( tError )
            {
                console.log( "there was an error with the query: " + tError );
            }
            //console.log( tData );
            tCallback( tResponse, tData );
        }
    }
}   