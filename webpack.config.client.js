const path = require("path");

// 客户端 webpack 配置
module.exports = {
  target: "web",
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "source-map",
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
};
