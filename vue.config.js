// vue的配置文件， 修改重启服务器
module.exports = {
  lintOnSave: true // false,保存之后， 不再检查错误

  // 对于当前开发服务器配置反向代理
  // devServer: {
  //   proxy: {
  //     '/kerwin': {
  //       target: 'https://m.maoyan.com',
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/kerwin': ''
  //       }
  //     },
  //     '/ajax': {
  //       target: 'https://m.maoyan.com',
  //       changeOrigin: true
  //     }
  //   }
  // }
}
