const connection = require( './connections' );

//how many questions are in the db (shouldn't hard code this, but here we are)
const maxQuestions = 10;

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

    //TODO - clean this up!
    getMatch: function( tUserId, tResponse, tCallback )
    {
        connection.query
        ( 
            'SELECT users.id, users.name, users.imgUrl, answers.answer1, answers.answer2, answers.answer3 ,answers.answer4, ' + 
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

            let tempCurrentUser;
            let tempMatch;
            let currentLowestDiff = 100;
            
            //loop through and assign current user    
            tData.forEach( function( tempUser ){ getCurrentUser( tempUser ) } );

            //compare all the users and assign match
            tData.forEach( function( tempUser ){ compareUser( tempUser ) } );

            function getCurrentUser( tUser )
            {                
                if( tUser.id == tUserId )
                {
                    //return tUser
                    tempCurrentUser = tUser;
                }
            }

            function compareUser( tUser )
            {
                //if its not the current user(dont compare self)
                if( tUser.id != tempCurrentUser.id )
                {
                    let tempTotalDiff = 0;

                    //loop through all the answers in the db for the user
                    for( let i = 1; i < maxQuestions; ++i )
                    {
                        //get the absolute value of the difference
                        let tempDiff = Math.abs( parseInt( tempCurrentUser[ 'answer' + i ] )  - parseInt( tUser[ 'answer' + i ] ) );
                        tempTotalDiff += tempDiff;
                    }

                    console.log( `tempTotalDiff of ${ tUser.name } = ${ tempTotalDiff }` );

                    //compare if the diff is lowest so far, and assign if so
                    //by the end we should have the lowest diff remaining, and that's your answer
                    if( tempTotalDiff < currentLowestDiff )
                    {
                        currentLowestDiff = tempTotalDiff;

                        //assign the current user as the lowest
                        tempMatch = tUser;
                        //console.log( `tempMatch assigned as ${ tUser.name }` );
                    
                    }
                }
            }

            console.log( 'THE MATCH IS = ' + tempMatch.name );

            tCallback( tResponse, tempMatch );
        }
    }
}   