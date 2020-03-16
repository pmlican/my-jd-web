import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    shoppingDatas: [],
    // 当前设备是否为IPhoneX
    isIphoneX: false,
    // 登录用户名
    username: undefined
  },
  mutations: {
    // 添加商品到购物车数据源
    addShoppingData: function (state, goods) {
      // fix: 添加相同商品重复问题
      // 遍历shoppingDatas查看是否已经添加过该商品
      const isExist = state.shoppingDatas.some(item => {
        if (item.id === goods.id) {
          item.number += 1
          return true
        }
      })
      if (!isExist) {
      // 通过Vue.set添加的属性是响应式数据
        Vue.set(goods, 'isCheck', false)
        Vue.set(goods, 'number', 1)
        state.shoppingDatas.push(goods)
      }
    },
    // 更改商品数量
    changeShoppingDataNumber: function (state, data) {
      /**
       * data {
       * index: 指定商品下标
       * number: 商品数量
       * }
      */
      state.shoppingDatas[data.index].number = data.number
    },
    // 修改是否为iPhoneX
    setIsIphoneX: function (state, isIphoneX) {
      state.isIphoneX = isIphoneX
    },
    setUsername: function (state, username) {
      state.username = username
    },
    clearUsername: function (state) {
      state.username = undefined
    }
  },
  actions: {
  },
  modules: {
  }
})
