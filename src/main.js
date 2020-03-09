import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 这里引入htmlFontSize.js文件,设置html.style.fontSize
import '@js/htmlFontSize.js'
// 导入axios
import '@js/axios.config.js'
// 过滤器
import '@js/filters.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
