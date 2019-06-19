const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'none',
    externals: [/node_modules/],
    entry: {
        index: './index.ts'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    output: {
        // Puts the output at the root of the dist folder
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loader: 'ts-loader'
            },
        ]
    },
    target: 'node',
};
