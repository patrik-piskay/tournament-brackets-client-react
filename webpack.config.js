var path = require('path');

var config = {
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        './src/index.js'
    ],
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js'],
        alias: {
            assets: path.join(__dirname, 'src', 'assets'),
            containers: path.join(__dirname, 'src', 'containers'),
            components: path.join(__dirname, 'src', 'components'),
            actions: path.join(__dirname, 'src', 'actions'),
            reducers: path.join(__dirname, 'src', 'reducers'),
            middleware: path.join(__dirname, 'src', 'middleware'),
            services: path.join(__dirname, 'src', 'services')
        }
    },

    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        }, {
            test: /\.less/,
            loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'less-loader']
        }]
    }
};

module.exports = config;