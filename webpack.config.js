var path = require('path');

var config = {
    devtool: 'eval-source-map',
    entry: __dirname + '/src/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js']
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.css/,
            loaders: ['style-loader', 'css-loader', 'less-loader']
        }]
    }
};

module.exports = config;