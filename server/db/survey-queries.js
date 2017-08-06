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
            //tResponse.json( tData );
        }   
    }
}