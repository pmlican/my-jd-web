<template>
    <div class="goods-list-page">
        <navigation-bar @onLeftClick="onBackClick" :pageName="'商品列表'">
          <template v-slot:nav-right>
            <img :src="layoutType.icon" @click="onChangeLayoutType()" alt="">
          </template>
        </navigation-bar>
        <div class="goods-list-page-content" :class="{'iphonex-bottom': $store.state.isIphoneX}">
            <!-- 监听回调 -->
            <goods-options @optionsChange="onGoodsOptionsChange"></goods-options>
            <goods :layoutType="layoutType.type" :sort="sortType"></goods>
        </div>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import GoodsOptions from '@c/goods/GoodsOptions.vue'
import Goods from '@c/goods/Goods.vue'
export default {
  name: 'goodsList',
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  },
  created: function () {
    // 初始化方法设置默认值
    this.layoutType = this.layoutTypeDatas[0]
  },
  methods: {
    onBackClick: function () {
      // 返回上一级菜单
      this.$router.go(-1)
    },
    onChangeLayoutType: function () {
      if (this.layoutType.type === '1') {
        this.layoutType = this.layoutTypeDatas[1]
      } else if (this.layoutType.type === '2') {
        this.layoutType = this.layoutTypeDatas[2]
      } else {
        this.layoutType = this.layoutTypeDatas[0]
      }
    },
    onGoodsOptionsChange: function (sortType) {
      this.sortType = sortType
    }
  },
  data: function () {
    return {
      // 当前的布局
      layoutType: {},
      layoutTypeDatas: [
        {
          type: '1',
          icon: require('@img/list-type.svg')
        },
        {
          type: '2',
          icon: require('@img/grid-type.svg')
        },
        {
          type: '3',
          icon: require('@img/waterfall-type.svg')
        }
      ],
      sortType: '1'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-list-page {
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: $bgColor;
    &-content {
        height: 100%;
        display: flex;
        flex-direction: column;
    }
}

</style>
