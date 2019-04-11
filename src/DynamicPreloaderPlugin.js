// class DynamicPreloaderPlugin {

// }

// new DynamicPreloaderPlugin({
//     urls: {
//         '/': {
//             preload: ['/dist/assets/images/fljlfasaj-logo.jpg', '/dist/homepage.js'],
//             prefetch: ['/dist/next-page.js', '/dist/footer.js']
//         }
//     }
// })

// // or

// new DynamicPreloaderPlugin({
//     urls: {
//         '/': {
//             preload: [
//                 { // TODO: object or string with url
//                     href: '/dist/assets/images/fljlfasaj-font.woff2',
//                     as: 'image', // optional; override default; default is based on file extension
//                     type: 'font/woff2', // optional
//                     media: '(max-width: 600px)', // optional
//                     attrs: ['crossorigin'] // optional
//                 }
//             ],
//             prefetch: ['/dist/next-page.js', '/dist/footer.js']
//         }
//     }
// })

// new DynamicPreloaderPlugin({
//     preload: {
//         '/': [
//             'assets/images/some-asset.jpg',
//             {
//                 href: '/dist/assets/images/fljlfasaj-font.woff2',
//                 as: 'font', // optional; override default; default is based on file extension
//                 type: 'font/woff2', // optional
//                 media: '(max-width: 600px)', // optional
//                 attrs: ['crossorigin'] // optional
//             }
//         ]
//     },
//     prefetch: {
//         '/': []
//     }
// })

// new DynamicPreloaderPlugin({
//     urls: {
//         '/': {
//             preload: [
//                 'assets/fonts/fald-font.woff2',   //  raw request, same as in app source code
//                 { // TODO: object or string with url
//                     href: '/dist/assets/images/fljlfasaj-font.woff2',
//                     as: 'image', // optional; override default; default is based on file extension
//                     type: 'font/woff2', // optional
//                     media: '(max-width: 600px)', // optional
//                     attrs: ['crossorigin'] // optional
//                 }
//             ],
//             prefetch: ['/dist/next-page.js', '/dist/footer.js']
//         }
//     }
// })

// result of this should be preloader.js script which by HTMLWebpackPlugin inject
// into <head> and preload. onLoad this script should inject <link> tags to the header
// the most important is that resulted preloader.js should be smallest and fastest
// script it can be. Test what's faster build string during compilation and
// attach this into the head or leave it in object format and iterate in runtime

// make it work, make it right, make it faster
const HTMLWebpackPlugin = require('html-webpack-plugin')
const util = require('util')
const webpack = require('webpack')
const fs = require('fs')
const webpackSources = require('webpack-sources')

class URLAwarePreloader {
    constructor(options) {
        this.options = options
        this.urls = this.getDefaults(options.urls)
    }

    getDefaults(urls) {
        // TODO: don't mutate urls, make copy instead
        Object.keys(urls).map(url => {
            urls[url].preload.map((resource, index) => {
                if (typeof resource !== 'string') return
                urls[url].preload[index] = {
                    href: resource,
                    as: this.getAs(resource)
                }
            })
        })
        return urls
    }

    getAs() {
        return 'image'
    }

    // create fake filesystem MS
    // write function there
    // start bundling from that entry file
    // set output to real FS
    generateSource() {
        return `
        <script>
        ${JSON.stringify(this.urls)}.preload.map(resource => {
            const link = document.createElement("link")
            link.href = resource.href
            link.rel = "preload"
            link.as = resource.as || 'script' // TODO: guess by file extension
            document.head.appendChild(link)
        })
        </script>
        `
    }

    preload() {
        // TODO: pathname resolution
        return this.urls[window.location.pathname].preload.map(resource => {
            // TODO: if resource is string
            const link = document.createElement("link")
            link.href = resource.href
            link.rel = "preload"
            link.as = resource.as || 'script' // TODO: guess by file extension
            // TODO: add other arguments
            document.head.appendChild(link)
        })
    }

    buildPreloader() {
        const urls = JSON.stringify(this.urls)
        return `
            (${urls})[window.location.pathname].preload.map(resource => {
                const link = document.createElement("link")
                link.href = resource.href
                link.rel = "preload"
                link.as = resource.as || 'script' // TODO: guess by file extension
                document.head.appendChild(link)
            })
        `
    }

    replacePathsByChunkNames() {

    }

    // TODO: if in development add into preloader bundle also console.warn when there is preload without being in source code

    getAssets(compilation, htmlPluginData) {
        // TODO: what if public path is not defined
        let publicPath = compilation.outputOptions.publicPath
        let assets = {}
        

        compilation.modules.map(({ rawRequest, buildInfo }) => {
            console.log({rawRequest, buildInfo})
            if (!rawRequest || !buildInfo || !buildInfo.assets) return
            const hashed = Object.keys(buildInfo.assets)[0]
            // TODO: call it assetsMapping
            assets[rawRequest] = hashed
        })
        console.log(assets)

        Object.keys(this.urls).map(url => {
            this.urls[url].preload.map((resource, index) => {
                if (! assets[resource.href]) {
                    console.warn(`Resource: ${resource.href} was declared to be preloaded but wasnt loaded in source code`)
                    this.urls[url].preload.splice(index, 1)
                    return
                }
                resource.href = `${publicPath}${assets[resource.href]}`
            })
            console.log(`parsing`)
        })

        let source = new webpackSources.RawSource(this.buildPreloader())
        // console.log(source)

        compilation.assets['preloader.js'] = source

        // console.log(`let's build preloader: `)
        // console.log(this.urls)
        // compilation.assets['preloader.js'] = {
        //     source: this.buildPreloader,
        //     size: () => this.buildPreloader().length
        // }

        console.log(util.inspect(this.urls, false, null, true))
        console.log('here i can add data to html')
        
        // todo: output chunk with our loader and point following preload to that url
        htmlPluginData.html = htmlPluginData.html.replace('</head>', `<link rel="preload" href="/dist/preloader.js" as="script" onLoad="var myscript = document.createElement('script'); myscript.src=this.href; document.body.appendChild(myscript);"></head>`)
        console.log(htmlPluginData.html)
        console.log(this.buildPreloader())
        return htmlPluginData
    }

    apply(compiler) {
        console.log(util.inspect(this.urls, false, null, true))

        // do not preload non-existing assets
        // TODO: throw error/warning when trying to preload resource which wasnt found between compilation assets
        

        compiler.hooks.compilation.tap(this.constructor.name, (compilation) => {
            
            console.log("----------HI! I'm inside compilation")
            // console.log(Object.keys(compilation.hooks))
            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(this.constructor.name, (data, cb) => {
                cb(null, this.getAssets(compilation, data))
            })

            console.log(Object.keys(compilation))
            // console.log(compilation.hooks.assetPath.tap(this.constructor.name, (filename, data) => {
            //     console.log(filename)
            // }))
            // console.log(compilation.chunks)
        })




        // compiler.hooks.emit.tap(this.constructor.name, compilation => {
            // // TODO: what if public path is not defined
            // let publicPath = compilation.outputOptions.publicPath
            // let assets = {}
            

            // compilation.modules.map(({ rawRequest, buildInfo }) => {
            //     if (!rawRequest || !buildInfo || !buildInfo.assets) return
            //     const hashed = Object.keys(buildInfo.assets)[0]
            //     // TODO: call it assetsMapping
            //     assets[rawRequest] = hashed
            // })
            // console.log(assets)

            // Object.keys(this.urls).map(url => {
            //     this.urls[url].preload.map(resource => {
            //         if (! assets[resource.href]) {
            //             console.warn(`Resource: ${resource.href} was declared to be preloaded but wasnt loaded in source code`)
            //             return
            //         }
            //         resource.href = `${publicPath}${assets[resource.href]}`
            //     })
            // })

        //     // console.log(this.urls)
        //     console.log(util.inspect(this.urls, false, null, true))
        //     compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('DynamicPreloderPlugin', (data, cb) => {
        //         console.log('inside html plugin')
        //     })
            // console.log(compilation.hooks.htmlWebpackPluginAfterEmit)
            

            // HTMLWebpackPlugin.hooks.beforeEmit.tapAsync(this.constructor.name, (data, cb) => {
            //     console.log(data.html)
            //     cb(null, data)
            // })


            // console.log(compilation.modules.map(({ rawRequest }, index) => ({[index]: rawRequest})))
            // console.log(compilation.modules[34])

            // console.log(compilation.outputOptions.publicPath)
            // console.log(assets)
            // const assets = compilation.modules
            // // modules that are used as assets have a property 'buildInfo.assets'
            // .filter(({ buildInfo }) => buildInfo.assets)
            // console.log(assets[0])
        // })
    }

    //this preloader should be minified, uglified
    preloader() {
        const branch = options.urls[window.location.pathname]
        branch.preload.map(sourceToPreload => {
            const link = document.createElement("link")
            link.href = sourceToPreload.href
            link.rel = "preload"
            link.as = sourceToPreload.as || 'script'
            document.head.appendChild(link)
            // TODO: add other options
        })
    }



    // TODO: or maybe rather inline script into html instead of preloading it?. Test what is smallest and fastest
    // TODO: inline result function into html head or link preload it?
    // index.html will be served from different urls, so it will not be cached so it will have to be always downloaded
    // so rather use link preload strategy - this way preloaded script will be cached and uncached html file will be little shorter

    // HTMLWebpackPlugin.injectToHead(`<link rel='preload' href='/dist/preloader.js' as='script' onLoad="function() {
    //     var script = document.createElement('script');
    //     script.src = this.href;
    //     document.head.appendChild(script);
    // }"`)
}

module.exports = URLAwarePreloader
// todo: compile to es-5


