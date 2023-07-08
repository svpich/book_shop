const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebapkPlugin = require("html-webpack-plugin");
const TerserWebapkPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsWebapkPlugin = require("optimize-css-assets-webpack-plugin");
const EslintWebpackPlugin = require('eslint-webpack-plugin');

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
        }),
        new EslintWebpackPlugin(
            {
                context: './src', // Каталог, в котором будет выполняться ESLint
                extensions: ['js', 'jsx'], // Расширения файлов, которые будут проверяться ESLint
                exclude: ['node_modules'], // Исключить каталоги из проверки ESLint
                emitError: true, // Завершить сборку с ошибкой, если есть ошибки ESLint
                emitWarning: true, // Выводить предупреждения ESLint
                failOnError: true, // Завершить сборку с ошибкой, если есть ошибки ESLint
                failOnWarning: false, // Завершить сборку с ошибкой, если есть предупреждения ESLint
                fix: true, // Автоматически исправлять проблемы ESLint, если это возможно
                quiet: false, // Подавлять вывод информации о проверке ESLint в консоль Webpack
            }
        )
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
        }
    ]
    }
};