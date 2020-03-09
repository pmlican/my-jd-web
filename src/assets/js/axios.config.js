import Vue from 'vue'
import axios from 'axios'

// 配置baseURL 部署到本地的easy-mock 官方服务器经常挂掉
axios.defaults.baseURL = 'http://localhost:7300/mock/5e4b893fcaab5b2184962829'

// 设置拦截器, interceptors不能写错
axios.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  return response.data.data
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  return Promise.reject(error)
})

// 绑定到vue原型中，直接使用$http发起请求
Vue.prototype.$http = axios
