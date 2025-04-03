const webpack = require('webpack');

module.exports = {
  // ...existing code...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_OPENAI_API_KEY': JSON.stringify(process.env.REACT_APP_OPENAI_API_KEY || 'fallback-api-key'),
    }),
  ],
};