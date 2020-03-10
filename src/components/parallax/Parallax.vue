<template>
    <!--
        视差效果：让多层背景以不同的速度去进行移动。
        1、至少需要拥有两层背景（缓慢移动区、正常移动区）
        2、将背景设置为相对布局（为缓慢移动区设置 top 来缓冲掉 scroll 滚动）
        3、监听 Parallax 组件的滑动，根据滑动来计算 缓慢移动区 top 的值。
    -->
    <div class="parallax" @scroll="onScrollChange">
        <!-- 缓慢移动区 设置顶部的缓冲差值-->
        <div class="parallax-slow" :style="{top: slowTop}">
            <slot name="parallax-slow"></slot>
        </div>
        <div class="parallax-content z-index-2">
            <!-- 默认插槽，设置z-index为2 -->
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      // 速度差
      SPEED_DIFF: 2,
      parallaxScroll: 0
    }
  },
  methods: {
    onScrollChange: function ($event) {
      this.parallaxScroll = $event.target.scrollTop
      this.$emit('onScrollChange', this.parallaxScroll)
    }
  },
  computed: {
    slowTop: function () {
      // 缓冲的移动区的距离 = 当前滑动距离 - （当前滑动距离 / 速度差）
      return (this.parallaxScroll - (this.parallaxScroll / this.SPEED_DIFF)) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.parallax {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;
    &-slow {
        width: 100%;
        // 相对布局
        position: relative;
    }
    &-content {
        width: 100%;
        position: relative;
    }
}

</style>
