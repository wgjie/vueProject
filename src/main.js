// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'

import router from './router'

import ElementUI from 'element-ui'

// 导入element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'

// 导入通用样式
import '@/assets/base.css'

// 导入axios
import axios from 'axios'

// 将axios绑定到vue的原型上
Vue.prototype.axios = axios

// 给axios设置一个全局默认的baseURL，在后续的请求中可以不加这一段
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 给axios配置请求拦截器
axios.interceptors.request.use(
  function(config) {
    config.headers.Authorization = localStorage.getItem('token')
    // 在请求之前做些什么
    return config
  },
  function(error) {
    // 请求错误时做些什么
    return Promise.reject(error)
  }
)

// 给axios配置响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // 响应数据有很多，现在只响应data
    return response.data
  },
  function(error) {
    // 响应错误时做些什么
    return Promise.reject(error)
  }
)

// 安装使用插件
Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
