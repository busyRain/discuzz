module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "assets",
  lintOnSave: false,
  productionSourceMap: false,
  devServer: {
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    hotOnly: false,
    port: 8080,
    hot: true,
    proxy: {
      "/api": {
        target: "http://api.feileyuan.com/",
        //target: "http://124.156.160.86",
        //target: "http://150.109.48.154",
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
