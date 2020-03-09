<template>
    <div class="main">
      <component :is="currentComponent"></component>
      <!-- main接收toolbar回调事件 -->
       <tool-bar @onChangeFragment='onChangeFragment'></tool-bar>
    </div>
</template>

<script>
import toolBar from '@c/currency/ToolBar.vue'
export default {
  components: {
    'tool-bar': toolBar,
    // 异步引入组件，相当于懒加载
    home: () => import('@c/Home'),
    shopping: () => import('@c/Shopping'),
    my: () => import('@c/My')
  },
  data: function () {
    return {
      currentComponent: 'home'
    }
  },
  methods: {
    onChangeFragment: function (componentName) {
      this.currentComponent = componentName
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
  .main {
    // position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

</style>
