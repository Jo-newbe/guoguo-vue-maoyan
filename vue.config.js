module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/theme']
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  devServer: {
    proxy: {
      '/maoyan': {
        target: 'http://m.maoyan.com/',
        ws: true,
        changeOrigin: true, // 开启代理
        pathRewrite: { '^/maoyan': '' } // 路径重写 /maoyan => http://m.maoyan.com
      }
    }
  }
}
