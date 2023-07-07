const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebapkPlugin = require("html-webpack-plugin");
const TerserWebapkPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebapkPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: './src/index.js', // точка входа в приложение
    mode: 'development',
    output: {
        filename: "main.js"
    },
    plugins: [  // список подключеных плагинов
        new MiniCssExtractPlugin(),
        new TerserWebapkPlugin(),
        new OptimizeCssAssetsWebapkPlugin(),
        new HtmlWebapkPlugin({
            template: "./src/index.pug",
            filename: "index.html"
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserWebapkPlugin(), new OptimizeCssAssetsWebapkPlugin()]
    },
    module: {
        rules: [{
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    esModule: true
                }
            }, "css-loader"],
            test: /\.css$/,
        }, 
        {
            test: /\.pug$/,
            use: 'pug-loader'
        },
        {
            test: /\.js$/,
            exclude: "/node_modules/",
            use: 'eslint-loader',
        }
    ]
    }
};