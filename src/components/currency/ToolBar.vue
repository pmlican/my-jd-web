<template>
    <div class="tool-bar" :class="{'iphonex-bottom': $store.state.isIphoneX}">
       <!-- barItem点击事件 -->
        <div class="tool-bar-item" v-for="(item,index) in toolBarData" :key="index" @click="onChangeFragment(item, index)">
        <img class="tool-bar-item-img" :src="[index === selectItemIndex ? item.hIcon : item.nIcon]" alt="altText"/>
        <p class="tool-bar-item-name" :class="{'tool-bar-item-name-h' : index === selectItemIndex}">{{item.name}}</p>
        </div>
    </div>
</template>

<script>
/**
 * 1.位于页面底部
 * 2.点击toolbar,发生状态切换
 * 3.按钮分为默认和选中两种状态
 */
export default {
  data () {
    return {
      toolBarData: [
        {
          nIcon: require('@img/home-n.svg'),
          hIcon: require('@img/home-h.svg'),
          name: '首页',
          componentName: 'home'
        },
        {
          nIcon: require('@img/shopping-n.svg'),
          hIcon: require('@img/shopping-h.svg'),
          name: '购物车',
          componentName: 'shopping'
        },
        {
          nIcon: require('@img/my-n.svg'),
          hIcon: require('@img/my-h.svg'),
          name: '我的',
          componentName: 'my'
        }
      ],
      selectItemIndex: 0
    }
  },
  methods: {
    onChangeFragment: function (item, index) {
      this.selectItemIndex = index
      // 回调到父组件
      this.$emit('onChangeFragment', item.componentName)
    },
    // 切换页面方法
    pushFragment: function (index) {
      // 调用这个方法回调
      this.onChangeFragment(this.toolBarData[index], index)
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
    .tool-bar {
        width: 100%;
        height: px2rem(46);
        display: flex;
        justify-content: space-around;
        background-color: white;
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
        border-top: 1px solid $lineColor;

        &-item {
            text-align: center;
            padding: px2rem(4) px2rem(12);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &-img {
                width: px2rem(22);
                height: px2rem(22);
            }

            &-name {
                font-size: $infoSize;
                margin-top: px2rem(4);

                &-h {
                    color: $mainColor;
                }
            }
        }
    }
</style>
