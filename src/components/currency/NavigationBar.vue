<template>
    <!-- 当pageName有值时展示分割线 -->
    <div class="nav-bar z-index-max" :style="navBarStyle" :class="[{'bottom-line' : pageName},{'iphonex-top': $store.state.isIphoneX}]">
        <div class="left" @click="$emit('onLeftClick')">
            <img src="@img/back.svg" v-if="isShowBack" alt="">
            <!-- 具名插槽 -->
            <slot name="nav-left"></slot>
        </div>
        <div class="center">
            <!-- 当pageName存在时展示标题 -->
            <span class="page-title" v-if="pageName">{{pageName}}</span>
            <!-- 具名插槽 -->
            <slot name="nav-center"></slot>
        </div>
        <div class="right">
            <!-- 具名插槽 -->
            <slot name="nav-right"></slot>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    pageName: {
      type: String,
      default: ''
    },
    isShowBack: {
      type: Boolean,
      default: true
    },
    navBarStyle: {
      type: Object,
      default: function () {
        return {
          backgroundColor: 'white'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.nav-bar {
    width: 100%;
    height: px2rem(44);
    line-height: px2rem(44);
    display: flex;
    justify-content: space-between;
    // 适配沉浸式手机 statusBar
    padding-top: $statusBarHeight;
    .left, .right {
        display: flex;
        height: 100%;
        width: px2rem(26);
        padding: 0 $marginSize;
        img {
            width: 100%;
            align-self: center;
        }
    }
    .center {
        display: flex;
        height: 100%;
        // 让中间插槽占满剩余空间
        flex-grow: 1;
        .page-title {
            font-size: $titleSize;
            align-self: center;
            margin: 0 auto;
        }
    }
}
.bottom-line {
    border-bottom: 1px solid $lineColor;
}
</style>
