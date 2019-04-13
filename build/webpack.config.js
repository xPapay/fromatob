const path = require('path')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const HTMLWebpackPlugin = require('html-webpack-plugin')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const DynamicPreloadWebpackPlugin = require('dynamic-preload-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

const config = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : '#cheap-module-source-map',
    entry: {
        app: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/',
        chunkFilename: '[name]-[chunkhash].js'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'styles': path.resolve(__dirname, '../src/assets/css'),
            'assets': path.resolve(__dirname, '../src/assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    isProd ? { loader: MiniCssExtractPlugin.loader } : 'style-loader', 
                    'css-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    isProd ? { loader: MiniCssExtractPlugin.loader } : 'style-loader', 
                    'css-loader', 
                    {
                        loader: 'sass-loader',
                        options: {
                            indentedSyntax: true,
                            data: require('fs').readFileSync(path.resolve(__dirname, '../src/assets/css/variables.sass'), 'utf-8')
                        }
                    }
                ]
            },
            {
                test: /\.(svg|jpg|woff)$/,
                exclude: path.resolve(__dirname, '../src/assets/images/sprites'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            context: path.resolve(__dirname, '../src'),
                            name: '[path][name]-[hash].[ext]',
                            limit: 8000
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                include: path.resolve(__dirname, '../src/assets/images/sprites'),
                use: [
                    {
                        loader: 'svg-sprite-loader',
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        historyApiFallback: true
    },
    plugins: [
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, '../src/template.html')
        }),
        new SpriteLoaderPlugin()
        // new PreloadWebpackPlugin({
        //     rel: 'preload',
        //     // include: 'allAssets',
        //     as(entry) {
        //         if (/\.(jpe?g|svg|png)$/.test(entry)) {
        //             return 'image'
        //         }
        //         return 'script'
        //     }
        // })
        // new DynamicPreloadWebpackPlugin({
        //     // routeModuleMap: {
        //     //     '/': '@/views/HomePage'
        //     // },
        //     urls: {
        //         '/': ['@/components/TheNavigation']
        //     }
        // })
    ]
}

isProd && config.plugins.push(new MiniCssExtractPlugin())

module.exports = config
