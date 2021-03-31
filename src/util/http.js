// function http (url, xHost) {
//   return axios({
//     url: `https://m.maizuo.com/${url}`,
//     method: 'GET',
//     headers: {
//       'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"1606697250632532718583809","bc":"310100"}',
//       'X-Host': xHost
//     }
//   })
// }
// import { Toast } from 'vant'
import axios from 'axios'
const http = axios.create({
  baseURL: 'http://www.xiongmaoyouxuan.com',
  timeout: 10000
})
// http 进行拦截（发请求之前，收到相应之后可以提前拦截？？？）

// Add a request interceptor
// http.interceptors.request.use(function (config) {
//   // 显示loading
//   Toast.loading({
//     message: '加载中...',
//     forbidClick: true,
//     duration: 0
//   })
//   return config
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error)
// })

// // Add a response interceptor
// http.interceptors.response.use(function (response) {
//   // Any status code that lie within the range of 2xx cause this function to trigger
//   // 隐藏loading
//   Toast.clear()
//   return {
//     ...response,
//     name: 'kerwin',
//     age: 100
//   }
// }, function (error) {
//   // Any status codes that falls outside the range of 2xx cause this function to trigger
//   // 隐藏loading
//   Toast.clear()
//   return Promise.reject(error)
// })

export default http
