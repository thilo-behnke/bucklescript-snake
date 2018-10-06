const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        // main: './lib/es6_global/src/game/Main.bs.js',
        main: './lib/es6_global/src/Root.bs.js'
    },
    mode: isProd ? 'production' : 'development',
    output: {
        path: path.join(__dirname, "bundledOutputs"),
        filename: '[name].js',
    },
};