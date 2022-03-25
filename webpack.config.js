const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require ("path")

module.exports = {
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
       test: /\.html$/i,
       use: {loader: "html-loader", options: {minimize: true}}
      },
     
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],  
      },
     
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        use: ["file-loader?name=assets/[name].[ext]", "image-webpack-loader"],
      },

      {
        test: /\.(woff)$/i,
        use: ["file-loader?name=assets/[name].[ext]"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      hash: true,
    }),
  ],

  devServer: {
    open: true,
    bonjour: true,
    compress: true,
    port:3000,
    client: {overlay: true,}
  },
};