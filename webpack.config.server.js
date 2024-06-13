const path = require("path");
const webpackNodeExternals = require("webpack-node-externals");

// 服务端 webpack 配置
module.exports = {
  target: "node",
  mode: "development",
  entry: "./server.mjs",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "server.mjs",
  },
  // 指定 Babel
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 指定打包时文件使用的 loader
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  externals: [webpackNodeExternals()],
};
