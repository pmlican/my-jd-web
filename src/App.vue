<template>
  <div id="app">
    <transition :name="transitionName">
      <!-- 所有通过router-view加载的页面组件都会被缓存 -->
      <keep-alive :include="virtualTaskStack">
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      transitionName: 'fold-left',
      virtualTaskStack: [
        // 默认加入main
        'imooc'
      ]
    }
  },
  created: function () {
    // 在App.vue created设置是否为IphoneX
    this.$store.commit('setIsIphoneX', window.isIphoneX)
    // 原生app启动会调用这个方法，用于自动登录
    window.nativeFunctionUserLogin = this.nativeFunctionUserLogin
  },
  methods: {
    nativeFunctionUserLogin: function (username) {
      this.$store.commit('setUsername', username)
    }
  },
  watch: {
    // 监听route push和pop
    '$route' (to, from) {
      const routerType = to.params.routerType
      if (routerType === 'push') {
        this.transitionName = 'fold-left'
        // 当push时加入栈
        this.virtualTaskStack.push(to.name)
      } else {
        this.transitionName = 'fold-right'
        // 当pop时弹出栈
        this.virtualTaskStack.pop()
      }
      // 还原虚拟任务栈为初始状态
      if (to.params.clearTask) {
        this.virtualTaskStack = [
          'imooc'
        ]
      }
    }
  }
}
</script>

<style lang="scss">
@import '@css/style.scss';
  #app {
    width: 100%;
    height: 100%;
    // 定义四个动画
    // push 页面动画
    .fold-left-enter-active {
      animation-name: fold-left-in;
      animation-duration: .4s;
    }
    // push 动画
    @keyframes fold-left-in {
      0% {
        transform: translate(100%, 0);
      }
      100% {
        transform: translate(0, 0);
      }
    }
    .fold-left-leave-active {
      animation-name: fold-left-out;
      animation-duration: .4s;
    }
    @keyframes fold-left-out {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(-100%, 0);
      }
    }
    .fold-right-enter-active {
      animation-name: fold-right-in;
      animation-duration: .4s;
    }
    // pop动画
    @keyframes fold-right-in {
      0% {
        transform: translate(-100%, 0);
      }
      100% {
        transform: translate(0 ,0);
      }
    }
    .fold-right-leave-active {
      animation-name: fold-right-out;
      animation-duration: .4s;
    }
    @keyframes fold-right-out {
      0% {
        transform: translate(0, 0);
      }
      100% {
        transform: translate(100%, 0);
      }
    }
  }
</style>
