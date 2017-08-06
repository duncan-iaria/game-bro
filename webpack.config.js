const path = require('path');

module.exports = 
{
    entry: 
    {
        main: './server/views/assets/js/main.js',
        survey: './server/views/assets/js/survey.js'
    },
    // target: 'node',
    output: 
    {
        filename: '[name].js',
        path: path.resolve( __dirname + '/server/views/assets', 'build' )
    },
    
    module: 
    {
        rules: 
        [
            //CSS BUILD
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            //SASS BUILD
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            //FONTS
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [ 'file-loader' ]
            }
        ]
    }
};