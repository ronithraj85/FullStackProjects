const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
module.exports = {
  entry: "./src/index.js", mode: "development",
  devServer: { port: 3004, historyApiFallback: true, headers: { "Access-Control-Allow-Origin": "*" } },
  output: { publicPath: "http://localhost:3004/" },
  resolve: { extensions: [".jsx", ".js"] },
  module: { rules: [
    { test: /\.(js|jsx)$/, exclude: /node_modules/, use: { loader: "babel-loader", options: { presets: ["@babel/preset-env", "@babel/preset-react"] } } },
    { test: /\.css$/, use: ["style-loader", "css-loader"] },
  ]},
  plugins: [
    new ModuleFederationPlugin({
      name: "mfe_hotels", filename: "remoteEntry.js",
      exposes: { "./HotelList": "./src/components/HotelList" },
      shared: { react: { singleton: true, requiredVersion: "^18.2.0" }, "react-dom": { singleton: true, requiredVersion: "^18.2.0" } },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
