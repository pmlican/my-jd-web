import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    // vue-router 懒加载 - > GoodsList
    // chunkName -> GoodsList.[hash].js, 对打包时有影响
    component: () => import('../views/GoodsList.vue')
  },
  {
    path: '/goodsDetail',
    name: 'goodsDetail',
    // 异步加载组件
    component: () => import('../views/GoodsDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
