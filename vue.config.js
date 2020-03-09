// vue.config.js, vue-cli官方文档，为了解决绝对路径问题，把绝对路径取别名
// 调整 webpack 配置最简单的方式就是在 vue.config.js 中的 configureWebpack 选项提供一个对象:
// 该对象将会被 webpack-merge 合并入最终的 webpack 配置。
const path = require('path')

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
    // 要把这个放出来，不然这个配置只在开发环境生效，在执行npm build时会报错，找不到路径别名
    return {
      resolve: {
        alias: {
          '@js': path.resolve(__dirname, './src/assets/js'),
          '@css': path.resolve(__dirname, './src/assets/css'),
          '@img': path.resolve(__dirname, './src/assets/imgs'),
          '@c': path.resolve(__dirname, './src/components')
        }
      }
    }
  }
}
