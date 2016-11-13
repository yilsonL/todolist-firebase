var webpack = require('webpack');
var path = require('path');
var envFile = require('node-env-file');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
  envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch(e) {

}

var environment = {
   NODE_ENV: JSON.stringify(process.env.NODE_ENV),
   API_KEY: JSON.stringify(process.env.API_KEY),
   AUTH_DOMAIN: JSON.stringify(process.env.AUTH_DOMAIN),
   DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
   STORAGE_BUCKET: JSON.stringify(process.env.STORAGE_BUCKET),
   MESSAGING_SENDER_ID: JSON.stringify(process.env.MESSAGING_SENDER_ID),
 };

module.exports = {
  entry: [
    './app/app.js'
  ],
  output: {
    path: 'public',
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({compressor: {warnings: false}}),
    new webpack.DefinePlugin({"process.env": environment})
  ] : [
    new webpack.DefinePlugin({"process.env": environment})
  ],
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      './app/components',
      './app/api'
    ],
    alias: {
      app: 'app',
      applicationStyles: 'app/styles/app.scss',
      actions: 'app/actions/actions.js',
      reducers: 'app/reducers/reducers.js',
      configureStore: 'app/store/configureStore.js'
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'source-map'
};
