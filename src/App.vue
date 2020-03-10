<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      transitionName: 'fold-left'
    }
  },
  watch: {
    // 监听route push和pop
    '$route' (to, from) {
      const routerType = to.params.routerType
      if (routerType === 'push') {
        this.transitionName = 'fold-left'
      } else {
        this.transitionName = 'fold-right'
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
