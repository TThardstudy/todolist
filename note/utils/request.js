import axios from 'axios'

const http = axios.create({
    //通用地址前缀
    baseURL:'/api',
    timeout:10000,
    //超越时间
})
//请求拦截器
http.interceptors.request.use(
    function(config){
        return config
    },
    function(error) {
        //返回带有拒绝原因的信息
        return Promise.reject(error)
    }
)
// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

export default http