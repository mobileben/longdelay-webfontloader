const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs')

module.exports = env => {
    // Safety, if no env setup, create empty env
    if (!env) {
        env = {}
    }

    const ifdefOpts = {
        WEBFONTLOADER: env.WEBFONTLOADER,
        "ifdef-verbose": true
    };

    return {
        entry: './src/scripts/app.ts',
        output: {
            path: path.resolve(__dirname, 'www'),
            filename: 'app.js',
            devtoolModuleFilenameTemplate: '[absolute-resource-path]',
            devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
        },
        resolve: {
            symlinks: true,
            modules: ['src', 'node_modules'],
            extensions: ['.ts', '.tsx', '.js']
        },
        devServer: {
            contentBase: path.resolve(__dirname, 'www'),
            hot: true,
            writeToDisk: true
        },
        devtool: "source-map",
        externals: {
            WebFont: 'WebFont'
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    exclude: ['/node_modules/', '/packages/', '/plugins/'],
                    use: [
                        {loader: 'ts-loader'},
                        {loader: "ifdef-loader", options: ifdefOpts}
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'WebFontLoader Long Delay Test',
                template: path.resolve(__dirname, 'src', 'index.html'),
                filename: 'index.html'
            }),
            new CopyWebpackPlugin([
                {
                    from: path.resolve(__dirname, 'assets'),
                    to: path.resolve(__dirname, 'www', 'assets')
                }
            ])
        ]
    };
};
