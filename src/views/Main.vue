<template>
    <div class="main">
      <keep-alive>
        <component :is="currentComponent"></component>
      </keep-alive>
      <!-- main接收toolbar回调事件 -->
       <tool-bar ref="toolBar" @onChangeFragment='onChangeFragment'></tool-bar>
    </div>
</template>

<script>
import toolBar from '@c/currency/ToolBar.vue'
export default {
  name: 'imooc',
  components: {
    'tool-bar': toolBar,
    // 异步引入组件，相当于懒加载
    home: () => import('@c/Home'),
    shopping: () => import('@c/Shopping'),
    my: () => import('@c/My')
    // 'my': () => import('./my-async-component')
  },
  data: function () {
    return {
      currentComponent: 'home'
    }
  },
  activated: function () {
    // 通过这个方法，获取push的参数才有效果
    this.pushFragment()
  },
  methods: {
    onChangeFragment: function (componentName) {
      this.currentComponent = componentName
    },
    pushFragment: function () {
      // 获取参数中的index
      const componentIndex = this.$route.params.componentIndex
      // 判断不存在时返回
      if (componentIndex === undefined) return
      // 调用toolbar方法切换页面
      this.$refs.toolBar.pushFragment(componentIndex)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

</style>
