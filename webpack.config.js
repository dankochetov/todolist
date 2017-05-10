const resolve = require('path').resolve;
const webpack = require('webpack');

const sourcePath = resolve(__dirname, 'client');
const staticsPath = resolve(__dirname, 'dist');

module.exports = {
    context: sourcePath,

    entry: [
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        './index.js'
    ],

    output: {
        path: staticsPath,
        filename: 'bundle.js',
        publicPath: '/'
    },

    devtool: 'inline-source-map',

    devServer: {
        hot: true,
        contentBase: staticsPath,
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
        ],
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: [
            resolve(__dirname, 'node_modules'),
            sourcePath
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
};
