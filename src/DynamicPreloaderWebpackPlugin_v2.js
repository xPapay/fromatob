class DynamicPreloaderWebpackPlugin {
    constructor(options) {
        this.urls = this.getDefaults(options.urls)
        this.urlToModule = options.urlToModule
        this.assetsLoading = {}
        // this.loader = {
        //     '/': {
        //         preload: [
        //             {href: '/dist/assets/images/hero.jpg', as: 'image'}
        //         ],
        //         prefetch: []
        //     }
        // }
    }

    // TODO: refactor this ugly hell
    getDefaults(urls) {
        let defaults = {}
        Object.keys(urls).map(url => {
            defaults[url] = {}
            Object.keys(urls[url]).map(rel => {
                defaults[url][rel] = []
                urls[url][rel].map(module => {
                    module = (typeof module === 'string')
                        ? { href: module, as: this.getAs(module) }
                        : { as: this.getAs(module.href), ...module }
                    if (!module.href) throw new Error(`Missing href attribute of give module ${module}`)
                    defaults[url][rel].push(module)
                })
            })
        })
        return defaults
    }

    getAs(resource) {
        if (resource.match(/\.(jpe?g|svg|png)$/)) return 'image'
        return 'script'
    }

    apply(compiler) {
        compiler.hooks.emit.tap(this.constructor.name, compilation => {
            this.assetsLoading = this.getAllAssets(compilation)
        })
    }

    getAllAssets(compilation) {
        let allAssets = {}
        Object.keys(this.urls).map(url => {
            const { preload, prefetch } = this.urls[url]
            allAssets[url] = {}
            let preloadAssets, prefetchAssets

            if (preload) {
                preloadAssets = Object.keys(this.getAssets(preload, url, compilation))
                allAssets[url].preload = preloadAssets.map(asset => this.createPreloadLink(asset, url))
            }

            if (prefetch) {
                prefetchAssets = Object.keys(this.getAssets(prefetch, url, compilation))
                if (preload) {
                    prefetchAssets = this.getDistinct(preloadAssets, prefetchAssets)
                }
                allAssets[url].prefetch = prefetchAssets.map(asset => this.createPrefetchLink(asset))
            }
        })
        return allAssets
    }

    createPrefetchLink(asset) {
        return {
            rel: 'prefetch',
            href: asset
        }
    }

    createPreloadLink(asset, url) {
        const preloadOptions = this.urls[url].preload.find(resource => resource.href === asset) || {}
        return {
            rel: 'preload',
            href: asset,
            as: this.getAs(asset),
            ...preloadOptions
        }
    }

    getDistinct(one, two) {
        return one.filter(item => two.indexOf(item) < 0)
    }

    getAssets(modules, url, compilation) {
        return modules.reduce((assets, module) => {
            const chunk = this.getChunk(module.href, url, compilation)
            if (!chunk) {
                console.warn(`Requested module: ${module.href} could not be found in any of the chunks`)
                return assets
            }
            return assets = {...assets, ...this.getChunkFiles(chunk), ...this.getChunkAssets(chunk) }
        }, {})
    }

    getChunkFiles(chunk) {
        return chunk.files.reduce((files, file) => {
            return files = { ...files, [file]: true }
        }, {})
    }

    getChunkAssets(chunk) {
        return Array.from(chunk.modulesIterable).reduce((assets, module) => {
            const { buildInfo } = module
            if (!buildInfo || !buildInfo.assets) return assets

            const moduleAssets = Object.keys(buildInfo.assets).reduce((moduleAssets, asset) => {
                return moduleAssets = { ...moduleAssets, [asset]: true}
            }, {})

            return assets = { ...assets, ...moduleAssets }

        }, {})
    }

    /**
     * Find the chunk where requested module is bundled into
     * Route level code-splitting can cause the module to be bundled into several chunks
     * URL parameter helps us pick the right chunk for preloading on our url
     * 
     * @param {string} moduleName The Name of the module we want to preload/prefetch
     * @param {string} url The URL at which we want the module to be preloaded
     */
    getChunk(moduleName, url, compilation) {
        return compilation.chunks.find(chunk => {
            const chunkModules = Array.from(chunk.modulesIterable)
            const requestedModuleFound = chunkModules.some(moduleInChunk => moduleInChunk.rawRequest === moduleName)
            if (!requestedModuleFound) return false

            const routeModuleFound = chunkModules.some(moduleInChunk => moduleInChunk.rawRequest === this.urlToModule[url])
            return routeModuleFound
        })
    }
}

module.exports = DynamicPreloaderWebpackPlugin
