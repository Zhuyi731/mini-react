const merge = require("webpack-merge");
const base = require("./webpack.base.js");
const path = require("path");

module.exports = merge(base, {
    devtool: "source-map",
    mode: "development"
});