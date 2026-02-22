const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3006,
    historyApiFallback: true,
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  output: { publicPath: "http://localhost:3006/" },
  resolve: { extensions: [".jsx", ".js"] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
        },
      },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        mfe_header: "mfe_header@http://localhost:3001/remoteEntry.js",
        mfe_search: "mfe_search@http://localhost:3002/remoteEntry.js",
        mfe_flights: "mfe_flights@http://localhost:3003/remoteEntry.js",
        mfe_hotels: "mfe_hotels@http://localhost:3004/remoteEntry.js",
        mfe_offers: "mfe_offers@http://localhost:3005/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, requiredVersion: "^18.2.0" },
        "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
  ],
};
