const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const {
    CleanPlugin
} = require('webpack');
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');
const {
    ProvidePlugin
} = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');



const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => `[name].min.${ext}`;

const optimization = () => {
    const config = {};

    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: {
                                removeAll: true
                            },
                        },
                    ],
                }
            }),
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            })
        ]
    }
    return config;
}

const plugins = () => {
    const config = [
        new CleanPlugin(),
        new ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        }),

    ]

    if (isProd) {
        //config.push(new BundleAnalyzerPlugin())
    }
    return config;
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
    }];


    return loaders;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: isDev ? 'development' : 'production',
    watchOptions: {
        aggregateTimeout: 100,
        ignored: ['./node_modules/'],
    },
    entry: ['./js/main.js'],
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
        publicPath: __dirname
    },
    devServer: {
        port: 9000,
        disableHostCheck: true,
        overlay: true,
        writeToDisk: true,
        open: false,
    },
    externals: {
        vscode: 'commonjs vscode'
    },
    optimization: optimization(),
    plugins: plugins(),
    devtool: isDev ? 'source-map' : false,
    module: {
        rules: [{
                test: /\.(sa|sc|c)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
                        },
                    },
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: jsLoaders()
            },

        ]
    },
}