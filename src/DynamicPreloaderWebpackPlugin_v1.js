class DynamicPreloaderWebpackPlugin {
    constructor(options) {
        this.options = this.parseOptions(options)
        this.moduleToResourcesMapping = {}
        this.preload = {}
        this.toPreload = {}

    }

    parseOptions(options) {
        const urls = this.parseUrls(options.urls)
        return { urls, routeToModule: options.routeToModule }
    }

    parseUrls(urls) {
        let parsedUrls = {}
        Object.keys(urls).map(url => {
            parsedUrls[url] = {
                preload: []
            }
            urls[url].preload.map(resource => {
                if (typeof resource === 'object') {
                    parsedUrls[url].preload.push({
                        ...this.getPreloadDefaults(),
                        ...resource
                    })
                    return
                }
                parsedUrls[url].preload.push({
                    ...this.getPreloadDefaults(),
                    href: resource
                })
            })
        })
        return parsedUrls
    }

    getPreloadDefaults() {
        return {
            as: this.getAs(),
        }
    }

    getAs() {
        // TODO: resolution by file extension
        return 'script'
    }

    listAllResources() {
        const { urls } = this.options
        let resources = []
        Object.keys(urls).map(url => {
            urls[url].preload.map(resource => resources.push(resource.href))
        })

        return resources
    }

    getAsBasedOnExtension(file) {
        if (file.match(/\.(jpe?g|svg|png)$/)) return 'image'
        return 'script'
    }

    addLinks(compilation, htmlData) {
        const requiredModules = compilation.modules
        .filter(({ rawRequest }) => rawRequest && this.listAllResources().includes(rawRequest))
        
        console.log(compilation.modules.length)
        Object.keys(this.options.urls).map(url => {
            this.preload[url] = []
            this.options.urls[url].preload.map(resource => {
                let module = requiredModules.find(mod => mod.rawRequest === resource.href)
                if (!module) {
                    console.error(`No module found during processing url: ${url} and resource ${resource.href}`)
                    // compilation.modules.map(module => {
                    //     console.log({rawRequest: module.rawRequest, request: module.request})
                    // })
                    let withoutReq = compilation.modules.filter(module => !module.rawRequest || !module.request)
                    console.log(Object.keys(withoutReq[1].rootModule))
                    process.exit(1)
                }
                let assets
                try {
                    assets = module.buildInfo.assets 
                        ? [...Object.keys(module.buildInfo.assets)]
                        : []
                } catch (error) {
                    console.error(`There was error: ${error}`)
                    console.log(`During processing resource: ${resource} for url: ${url}, and module: ${module}`)
                }

                let routeModule = this.options.routeToModule[url]

                // which chunk?
                let chunkToUse
                for(let chunk of module.chunksIterable) {
                    let foundModule = [...chunk.modulesIterable.values()].find(mod => mod.rawRequest === routeModule)
                    if (foundModule) {
                        chunkToUse = chunk
                        break
                    }
                }
                
                const files = chunkToUse.files.reduce((files, file) => {
                    return files = [
                        ...files,
                        {
                            href: compilation.outputOptions.publicPath + file,
                            as: this.getAsBasedOnExtension(file)
                        }
                    ]
                }, [])

                assets = assets.reduce((assets, asset) => {
                    return assets = [
                        ...assets,
                        {
                            href: compilation.outputOptions.publicPath + asset,
                            as: this.getAsBasedOnExtension(asset)
                        }
                    ]
                }, [])

                this.preload[url].push(...files)
                this.preload[url].push(...assets)
            })
        })


        compilation.assets['preloader.js'] = {
            source: this.buildPreloader.bind(this),
            size: () => this.buildPreloader().length
        }

        // htmlData.html = htmlData.html.replace('</head>', `<link rel="preload" href="/dist/preloader.js" as="script" onLoad="var myscript = document.createElement('script'); myscript.src=this.href; document.body.appendChild(myscript);"></head>`)
        htmlData.html = htmlData.html.replace('</head>', `<script src="/dist/preloader.js"></script></head>`)
        
        return htmlData
    }

    buildPreloader() {
        const urls = JSON.stringify(this.preload)
        return `
            (${urls})[window.location.pathname].map(resource => {
                const link = document.createElement("link")
                link.href = resource.href
                link.rel = "preload"
                link.as = resource.as || 'script'
                document.head.appendChild(link)
            })
        `
    }

    apply(compiler) {
        console.log('----------------Hello from DynamicPreloderPlugin---------------')

        compiler.hooks.compilation.tap(this.constructor.name, compilation => {

            compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(this.constructor.name, (htmlData, cb) => {
                let resourcesToPreload = {}
                Object.keys(this.options.urls).map(url => {
                    resourcesToPreload[url] = {}
                    this.options.urls[url].preload
                        .map(moduleName => {
                            let chunk = this.getModuleChunk(compilation, moduleName.href, url)
                            if (!chunk) {
                                console.log(`No chunk for module: ${moduleName} at: ${url} found.`)
                                return
                            }
                            const assets = Array.from(chunk.modulesIterable).reduce((assets, { buildInfo }) => {
                                if (!buildInfo || !buildInfo.assets) return assets
                                let keys = {}
                                Object.keys(buildInfo.assets).map(key => {
                                    keys[key] = true
                                })
                                return assets = {...assets, ...keys}
                            }, {})

                            const files = chunk.files.reduce((files, file) => {
                                return files = {...files, [file]: true}
                            }, {})
                            // const assets = Array.from(chunk.modulesIterable).reduce((assets, { buildInfo }) => {
                            //     if (!buildInfo || !buildInfo.assets) return assets
                            //     return assets = [...assets, ...Object.keys(buildInfo.assets)]
                            // }, [])
                            resourcesToPreload[url] = {...resourcesToPreload[url], ...files, ...assets}
                            // resourcesToPreload[url] = resourcesToPreload[url].reduce((total, resource) => {
                            //     return total = {...total, [resource]: { href: resource }}
                            // }, {})
                        })

                        this.toPreload[url] = [] 

                        Object.keys(resourcesToPreload[url]).map(resource => {
                            this.toPreload[url].push({
                                href: resource,
                                as: this.getAsBasedOnExtension(resource)
                            })
                        })
                        console.log(this.toPreload)
                })

                
                try {
                    cb(null, this.addLinks(compilation, htmlData))
                } catch (error) {
                    cb(error)
                }
            })
        })
    }

    getModuleChunk(compilation, moduleName, atRoute) {
        return compilation.chunks.find(chunk => {
            const routeModule = this.options.routeToModule[atRoute]
            const modulesInChunk = Array.from(chunk.modulesIterable)

            const foundRouteModule = modulesInChunk.some(({ rawRequest }) => rawRequest === routeModule)
            if (!foundRouteModule) return false

            return modulesInChunk.some(({ rawRequest }) => rawRequest === moduleName)
        })
    }
}

module.exports = DynamicPreloaderWebpackPlugin

// routeMoudleMapping : {
//  path: path.resolve(__dirname, '../src/router.js')
//  '/': '@/views/HomePage',
//  '/results': '@/views/ResultsPage'
// }

// urls = {
//     '/': { // or now we can also use instead of url @/views/HomePage
//         preload: [
//             '/dist/some-script.js',
//             {
//                 href: '/dist/fonts/some-font.woff2',
//                 as: 'font',
//                 type: 'font/woff2',
//                 media: '(max-width: 600px)',
//                 attrs: ['crossorigin']
//             }
//         ],
//         prefetch: []
//     }
// }

//  1. define url resources to preload
        // urls = {
        //     '/': {
        //         preload: [
        //             '/dist/some-script.js',
        //             {
        //                 href: '/dist/fonts/some-font.woff2',
        //                 as: 'font',
        //                 type: 'font/woff2',
        //                 media: '(max-width: 600px)',
        //                 attrs: ['crossorigin']
        //             }
        //         ],
        //         prefetch: []
        //     }
        // }
//  2. obtain hashed names/path for given raw resources
//      - resource can be script (module) or file processed by file-loader (asset)
//      - warn if there is defined source which is not used in source code
//  3. generate preloader.js (small script) generating <link rel="preload/prefetch">
//      - if in production mode, uglify preloader.js
//      - preloader must be fast, simple, small and should not do any computation that can be done during compilation - prepack.io
//      - on later point add regex url resolution in case of dynamic urls
//  4. preload preloader by attaching link preload pointing to preloader
//      - onLoad event should run the preloader (by creating script in header with src=this.href)
//      - inlining preloader into head of html increases html size and probably html served from different urls can not be cached
//          so we would download same code over and over