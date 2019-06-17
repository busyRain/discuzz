const webpack = require("webpack");
const path = require("path");
module.exports = {
  publicPath: "/",
  outputDir: "dist",
  // assetsDir: "assets",
   //webpack配置
   configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
    // if(process.env.NODE_ENV === 'production'){
    //     //生产环境
    // }else{
    //     BASE_URL = "http://10.3.38.8:88/"//本地请求url
    //     //开发环境
    // }
  },
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    hotOnly: false,
    disableHostCheck: true,
    port: 8080,
    hot: true,
    proxy: {
      "/api": {
        target: "http://api.feileyuan.com/",
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
