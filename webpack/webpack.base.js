const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
const fs = require("fs");

module.exports = {
    entry: {
        "index": path.join(__dirname, "../src/index.js")
    },
    output: {
        filename: "[name]_[chunkhash:5].js",
        path: path.join(__dirname, "../dist"),
        chunkFilename: "[name]_[chunkhash:5].js"
    },
    resolve: {
        extensions: [".js", ".json"]
    },
    module: {
        rules: [{
            test: /\.css$/,
            // exclude: /node_modules/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }]
        },  {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react"
                    ],
                    plugins: [
                        "@babel/plugin-transform-runtime",
                        "@babel/plugin-proposal-function-bind"
                    ]
                }
            }]
        }]
    },
    plugins: [
        new HtmlPlugin({
            template: path.join(__dirname, "../src/index.html"),
            filename: "index.html",
            chunks: ["index"],
            inject: "body"
        })
    ]
};