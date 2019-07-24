// webpack is similar to gulp BUT specialized to only bundle
// ref = https://webpack.js.org/concepts/loaders/

const path = require('path')
//const CopyPlugin = require('copy-webpack-plugin'); // fail = will need to use unix cp or gulp

module.exports = {    
    entry: "./index.web.js",
    output: {
        path: path.resolve(__dirname, 'public'),
        //publicPath: 'web/',
        filename: "js/bundle.js",
        sourceMapFilename: "js/bundle.map"
    },
    devtool: '#source-map',
    resolve: { // per https://medium.com/@slaton.ad/react-async-storage-and-webpack-c2e86661497b
      alias: {
        '@react-native-community/async-storage': 'react-native-web'
      }
    },
    module: {
        rules: [
         {
            exclude: /node_modules/,
            use: {
                loader: 'react-hot-loader',
                loader: 'babel-loader',
                /* query: {
                    //presets: ['stage-0'],
                    //plugins: ["transform-class-properties"]
                      plugins: ["@babel/plugin-proposal-class-properties"]
                }
                */
            },
         },
        ],
    }
};
