const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    entry: {
      app: "./frontend/src/app.js",
    },
    output: {
      filename: isProd ? "[name].[contenthash].bundle.js" : "[name].bundle.js",
      path: path.resolve(__dirname, "../dist/js"),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              configFile: path.resolve(__dirname, "./babel.config.js"),
            },
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    plugins: [
      new ESLintPlugin({
        configType: "flat",
        overrideConfigFile: "./frontend/webpack/eslint.config.js",
      }),
      new BrowserSyncPlugin(
        {
          host: "localhost",
          port: 3001,
          proxy: "http://localhost:3000/",
          files: ["dist/**/*.*"],
        },
        {
          reload: true,
        }
      ),
      new MiniCssExtractPlugin({
        filename: isProd
          ? "../css/[name].[contenthash].css"
          : "../css/[name].css",
      }),
    ],
    devtool: "source-map",
  };
};
