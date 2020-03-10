<template>
    <div class="goods-detail">
        <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
            <template v-slot:nav-left>
                <div class="goods-detail-nav-left" @click="onBackClick">
                    <img src="@img/back-2.svg" alt="" :style="{opacity: leftImgOpacity}">
                    <img src="@img/back-white.svg" alt="" :style="{opacity: navBarSlotOpacity}">
                </div>
            </template>
            <template v-slot:nav-center>
              <p class="goods-detail-nav-title" :style="{opacity: navBarSlotOpacity}">商品详情</p>
            </template>
        </navigation-bar>
        <div class="goods-detail-content">
            <!-- 监听滚动事件放到这里 -->
            <parallax @onScrollChange="onScrollChange">
              <!-- 缓慢移动区 -->
              <template v-slot:parallax-slow>
            <!-- 轮播图 -->
                <my-swiper :height="SWIPER_IMAGE_HEIGHT + 'px'" :swiperImgs="goodsData.swiperImgs" :paginationType="'2'">
                </my-swiper>
              </template>
              <!-- 正常移动区 -->
              <template>
                <!-- 内容 -->
                <div class="goods-detail-content-desc">
                  <div class="goods-detail-content-desc-item">
                    <!-- 商品价格 -->
                    <p class="goods-detail-content-desc-item-price">
                      ￥{{goodsData.price | priceValue}}
                    </p>
                    <!-- 商品名称 -->
                    <p class="goods-detail-content-desc-item-name">
                      <!-- 是否直营 -->
                      <direct v-if="goodsData.isDirect"></direct>
                      {{goodsData.name}}
                    </p>
                  </div>
                  <div class="goods-detail-content-desc-item">
                    <!-- 已选商品 -->
                    <p class="goods-detail-content-desc-item-select">
                      已选<span class="single-row-text">{{goodsData.name}}</span>
                    </p>
                    <!-- 附加服务 -->
                    <div class="goods-detail-content-desc-item-support">
                      <ul class="goods-detail-content-desc-item-support-list">
                        <li class="goods-detail-content-desc-item-support-list-item"
                        v-for="(item, index) in attachDatas" :key="index">
                          <img src="@img/support.svg" alt="">
                          <span>{{item}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- 商品描述 -->
                  <div class="goods-detail-content-desc-detail">
                    <img v-for="(item, index) in goodsData.detailImgs" :key="index" :src="item" alt="">
                  </div>
                </div>
              </template>
            </parallax>
        </div>
          <!-- 购买工具条 -->
        <div class="goods-detail-buy">
          <div class="goods-detail-buy-add">加入购物车</div>
          <div class="goods-detail-buy-now">立即购买</div>
        </div>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import MySwiper from '@c/swiper/MySwiper.vue'
import Direct from '@c/goods/Direct'
import Parallax from '@c/parallax/Parallax'
export default {
  components: {
    NavigationBar,
    MySwiper,
    Direct,
    Parallax
  },
  data: function () {
    return {
      SWIPER_IMAGE_HEIGHT: 364,
      // 锚点值
      ANCHOR_SCROLL_TOP: 310,
      // 记录滚动距离
      scrollValue: 0,
      goodsData: {},
      attachDatas: [
        '可配送海外',
        '京东发货&售后',
        '京准达',
        '211限时达',
        '可自提',
        '不可使用优惠券'
      ]
    }
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
    },
    // 监听内容滚动
    onScrollChange: function (scrollTop) {
      this.scrollValue = scrollTop
    }
  },
  created: function () {
    // console.log(this.$route.params.goods)
    // 注意这里是用 route 不是router
    this.goodsData = this.$route.params.goods
  },
  computed: {
    // 计算属性
    leftImgOpacity: function () {
      // 相反操作，逐渐隐藏
      return 1 - this.scrollValue / this.ANCHOR_SCROLL_TOP
    },
    navBarSlotOpacity: function () {
      // 逐渐显示
      return 1 - this.leftImgOpacity
    },
    navBarStyle: function () {
      return {
        backgroundColor: 'rgba(216,30,6,' + this.navBarSlotOpacity + ')',
        position: 'fixed',
        top: 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.goods-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  &-nav-left {
    width: 100%;
    display: flex;
    // 两个图片重合写法
    position: relative;
    img {
      position: absolute;
      align-self: center;
    }
  }
  &-nav-title {
    width: 100%;
    height: 100%;
    font-size: $titleSize;
    font-weight: bold;
    text-align: center;
    color: white;
  }
  &-content {
    // 这里不需要滚动
    // overflow: hidden;
    // overflow-y: auto;
    height: 100%;

    &-desc {
      width: 100%;
      background-color: $bgColor;
      box-shadow: 0 0 px2rem(16) 0 rgba(0, 0, 0, 0.2);
      &-item {
        background-color: white;
        padding: $marginSize;
        margin-bottom: $marginSize;
        // 价格
        &-price {
          font-size: px2rem(20);
          color: $mainColor;
          font-weight: 500;
        }
        // 名称
        &-name {
          margin-top: $marginSize;
          font-size: $titleSize;
          font-weight: 500;
          line-height: px2rem(20);
        }
        // 已选商品
        &-select {
          font-size: $infoSize;
          color: $hintColor;
          height: px2rem(44);
          display: flex;
          align-items: center;
          border-bottom: px2rem(1) solid $lineColor;
          span {
            color: $textColor;
            font-size: $titleSize;
            font-weight: bold;
            margin-left: px2rem(4);
          }
        }
        // 附加服务
        &-support {
          margin-top: $marginSize;
          &-list {
            display: flex;
            flex-wrap: wrap;
            &-item {
              display: flex;
              align-items: center;
              padding: px2rem(6) 0;
              margin-right: $marginSize;
              img {
                width: px2rem(12);
                margin-right: px2rem(4);
              }
              span {
                font-size: $minInfoSize;
                color: $hintColor;
              }
            }
          }
        }
      }
      // 描述
      &-detail {
        img {
          width: 100%;
        }
      }
    }
  }
  &-buy {
      background-color: white;
      border-top: px2rem(1) solid $lineColor;
      height: px2rem(46);
      line-height: px2rem(46);
      text-align: right;
      div {
        display: inline-block;
        width: px2rem(100);
        text-align: center;
        font-size: $infoSize;
        color: white;
      }
      &-add {
        background-color: $mainColor;
      }
      &-now {
        background-color: darkgoldenrod;
      }
    }
}

</style>
