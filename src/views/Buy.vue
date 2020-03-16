<template>
    <div class="buy-page">
        <navigation-bar :pageName="'立即购买'" @onLeftClick="onBackClick">
        </navigation-bar>
        <!-- 内容区 -->
        <div class="buy-page-content">
            <!-- 购买商品 -->
            <div class="buy-page-content-goods">
                <!-- 商品图片 -->
                <img class="buy-page-content-goods-img" :src="goodsData.img" alt="">
                <!-- 商品描述 -->
                <div class="buy-page-content-goods-desc">
                    <!-- 商品名称 -->
                    <p class="buy-page-content-goods-desc-name">{{goodsData.name}}</p>
                    <!-- 商品价格 -->
                    <p class="buy-page-content-goods-desc-price">￥{{goodsData.price | priceValue}}</p>
                </div>
            </div>
            <!-- 支付方式 -->
            <ul class="buy-page-content-list">
                <li class="buy-page-content-list-item" v-for="(item, index) in paymentDatas" :key="index" @click="onPaymentItemClick(item)">
                    <img class="buy-page-content-list-item-icon" :src="item.icon" alt="">
                    <div class="buy-page-content-list-item-desc">
                        <p class="buy-page-content-list-item-desc-name">{{item.name}}</p>
                        <p class="buy-page-content-list-item-desc-desc">{{item.desc}}</p>
                    </div>
                    <!-- 选中支付方式标记 -->
                    <img class="buy-page-content-list-item-check" :src="getCheckIcon(selectPayment.id === item.id)" alt="">
                </li>
            </ul>
        </div>
        <!-- 立即购买 -->
        <div class="pay page-commit" @click="onPayClick">
            立即购买
        </div>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar'
export default {
  name: 'buy',
  data: function () {
    return {
      goodsData: {},
      // 支付方式
      paymentDatas: [
        {
          id: '1',
          name: '支付宝支付',
          desc: '数亿用户都在用，安全可信托',
          icon: require('@img/alipay.svg')
        },
        {
          id: '2',
          name: '微信支付',
          desc: '亿万用户选择，更快更安全',
          icon: require('@img/weichat.png')
        }
      ],
      // 当前选择的支付方式
      selectPayment: {}
    }
  },
  created: function () {
    this.loadGoodsData()
    this.selectPayment = this.paymentDatas[0]
  },
  components: {
    NavigationBar
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
    },
    loadGoodsData: function () {
      this.$http.get('/goodsDetail', {
        params: {
          goodsId: this.$route.query.goodsId
        }
      }).then(data => {
        this.goodsData = data.goodsData
      })
    },
    getCheckIcon: function (isCheck) {
      return isCheck ? require('@img/check.svg') : require('@img/no-check.svg')
    },
    onPaymentItemClick: function (item) {
      this.selectPayment = item
    },
    onPayClick: function () {
      if (this.selectPayment.id === '1') {
        // 支付宝支付
        this.aliPay()
      } else if (this.selectPayment.id === '2') {
        // 微信支付
        this.wxPay()
      }
    },
    aliPay: function () {
      if (window.androidJSBridge) {
        // 这里不处理回调，原生支付返回，停留在原页面
        window.androidJSBridge.aliPay(JSON.stringify(this.goodsData))
      }
    },
    wxPay: function () {
      if (window.androidJSBridge) {
        window.wxPay(JSON.stringify(this.goodsData))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.buy-page {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: $bgColor;
    &-content {
        overflow: hidden;
        height: 100%;
        &-goods {
            background-color: white;
            padding: $marginSize;
            display: flex;
            border-bottom: px2rem(1) solid $lineColor;
            border-top: px2rem(1) solid $lineColor;
            margin-top: $marginSize;
            &-img {
                width: px2rem(100);
                height: px2rem(100);
            }
            &-desc {
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 0 $marginSize;
                &-name {
                    font-size: $infoSize;
                    line-height: px2rem(18);
                }
                &-price {
                    font-size: $titleSize;
                    color: $mainColor;
                    font-weight: 500;
                }
            }
        }
        &-list {
            margin-top: $marginSize;
            &-item {
                display: flex;
                background-color: white;
                border-bottom: px2rem(1) solid $lineColor;
                padding: $marginSize;
                align-items: center;
                &-icon {
                    height: px2rem(30);
                }
                &-desc {
                    margin-left: px2rem(12);
                    flex-grow: 1;
                    &-name {
                        font-size: $infoSize;
                    }
                    &-desc {
                        font-size: $minInfoSize;
                        margin-top: px2rem(6);
                        color: $hintColor;
                    }
                }
                &-check {
                    width: px2rem(16);
                    height: px2rem(16);
                }
            }
        }
    }
    // 立即支付
    .pay {
        position: absolute;
        bottom: px2rem(52);
    }
}

</style>
