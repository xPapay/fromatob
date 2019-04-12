const path = require('path')
const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin
const HTMLWebpackPlugin = require('html-webpack-plugin')
const PreloadWebpackPlugin = require('preload-webpack-plugin')
const DynamicPreloadWebpackPlugin = require('dynamic-preload-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? false : '#cheap-module-source-map',
    entry: {
        app: path.resolve(__dirname, '../src/main.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        publicPath: '/dist/',
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
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.sass$/,
                use: [
                    'style-loader', 
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
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]-[hash].[ext]'
                        }
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
