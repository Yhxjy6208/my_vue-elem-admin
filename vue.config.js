const { defineConfig } = require("@vue/cli-service");
// const path = require("path");
// const ElementPlus = require('unplugin-element-plus/webpack');
const AutoImport = require('unplugin-auto-import/webpack');
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');

const path = require('path')
function resolve(dir){
    return path.join(__dirname,dir)
}
module.exports = defineConfig({
    transpileDependencies: true,
    // 手动按需导入
    // configureWebpack: {
    //     plugins: [ElementPlus()],
    // },
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : './',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    /** vue3.0内置了webpack所有东西，
     * webpack配置,see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
     **/
    chainWebpack: (config) => {
        config.resolve.alias 
            .set('@',path.resolve(__dirname,'./src'))
            .set('@u',path.resolve(__dirname,'./src/utils'))
            .set('@a',path.resolve(__dirname,'./src/api'))
            .set('@c',path.resolve(__dirname,'./src/components'))
            .set('@r',path.resolve(__dirname,'./src/router'))
            // 我也不知道有没有问题 不写文件后缀依次解析
            config.resolve.extensions
            .add('extensions',['.js','.json','.vue'])
            // 'extensions':['.js','.json','.vue']
        
        config.module.rule('svg')
        .exclude.add(resolve('src/components/svgIcon/icon')).end()
        config.module.rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/components/svgIcon/icon'))
        .end()
        .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
        // const svgRule = config.module.rule("svg")
        // svgRule.uses.clear()
        // svgRule.use("svg-sprite-loader")
        // .loader("svg-sprite-loader")
        .options({
            symbolId:"icon-[name]",
            // include:["./src/components/svgIcon/icon"]
        }).end()
    },
    // configureWebpack: (config) => {},
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    //css
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                additionalData: `@import "./src/styles/main.scss";`
            },
        }
    },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    /**
     *  PWA 插件相关配置,see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
     */
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: false,
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            [process.env.VUE_APP_API]: {
                target: process.env.VUE_APP_API_DEV_TARGET,
                changeOrigin: true,
                ws: false,
                secure: false,
                pathRewrite: {
                    [`^${process.env.VUE_APP_API}`]: ''
                }
            }
        }
    },
    /**
     * 第三方插件配置
     */
    pluginOptions: {},
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    }
});