module.exports = {
    devServer: {
        // port: 8080, //前端服务启动的端口号
        // host: 'localhost', //前端服务启动后的访问ip，默认为localhost, host和port组成了前端服务启动后的访问入口。
        https: false,
        open: true,
        proxy: {
            '/api': { //拦截上下文
                target: 'http://localhost:8008', //匹配到要代理的上下文后，将上下文前面的地址替换为此代理地址
                changeOrigin: true, //是否跨域
            }
        }
    }
}
