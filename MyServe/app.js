// 服务器的入口文件
const route = require('./middleware/koa-router');
const {koaBody} = require('koa-body');
// const cors = require('cors')
// 1.创建KOA的实例对象
const Koa = require('koa')
const app = new Koa();
//跨域
// app.use(cors())

// 2.绑定中间件
app.use(koaBody())
app.use(route)
// 绑定第一层中间件
const respDurationMiddleware =  require('./middleware/koa_response_duration')
app.use(respDurationMiddleware)
 // 绑定第二层中间件
const respHeaderMiddleware = require('./middleware/koa_response_header')
app.use(respHeaderMiddleware)
 // 绑定第三层中间件
const respDataMiddleware = require('./middleware/koa_response_data')
app.use(respDataMiddleware)
// 3.绑定端口号 8008
app.listen(8008,()=>{
    console.log("服务器正常启动http://localhost:8008")
})
