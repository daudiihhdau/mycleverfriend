const nodeExternals = require('webpack-node-externals');

module.exports={
  mode: 'production',
  entry: "./src/start.js",
  output: {
    filename: "bundle.js"
  },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  target:"node",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.js$/,
        use: 'eslint-loader',
        enforce: 'pre'
      }
    ]
  }
}