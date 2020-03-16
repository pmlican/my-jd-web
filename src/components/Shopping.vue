<template>
    <div class="shopping">
        <navigation-bar :pageName="'购物车'" :isShowBack="false"></navigation-bar>
        <div class="shopping-content">
          <!-- 商品列表 -->
          <div class="shopping-content-list">
            <!-- 从商品数据源遍历 -->
            <div class="shopping-content-list-item" v-for="(item, index) in shoppingDatas" :key="index">
              <!-- 勾选图标 -->
              <img class="shopping-content-list-item-check" :src="checkImg(item.isCheck)" @click="onGoodsCheckClick(item)" alt="">
              <img class="shopping-content-list-item-img" :src="item.img" alt="">
              <div class="shopping-content-list-item-desc">
                <p class="shopping-content-list-item-desc-name text-line-2">
                  <direct v-if="item.isDirect"></direct>
                  {{item.name}}
                </p>
                <div class="shopping-content-list-item-desc-data">
                  <!-- 价格 -->
                  <p class="shopping-content-list-item-desc-data-price">￥{{item.price | priceValue}}</p>
                  <!-- 商品数量 -->
                  <number-manager :defaultNumber="item.number" @onChangeNumber="onNumberChange(arguments, item, index)"></number-manager>
                </div>
              </div>
            </div>
          </div>
          <!-- 统计 -->
          <div class="shopping-content-total">
            <!-- 全选 -->
            <div class="shopping-content-total-check">
              <img :src="checkImg(totalData.isAll)" @click="onAllCheckClick" alt="">
              <p>全选</p>
            </div>
            <!-- 总价格 -->
            <div class="shopping-content-total-price">
              <p class="shopping-content-total-price-total">合计：<span>￥{{totalData.totalPrice | priceValue}}</span></p>
              <p class="shopping-content-total-price-all">总额：
                <span>￥{{totalData.totalPrice | priceValue}}</span>
                &nbsp;&nbsp;立减
                <span>￥0.00</span>
              </p>
            </div>
            <!-- 结算 -->
            <div class="shopping-content-total-commit">去结算({{totalData.goodsNumber}})</div>
          </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import Direct from '@c/goods/Direct.vue'
import NumberManager from '@c/goods/NumberManager.vue'
export default {
  components: {
    NavigationBar,
    Direct,
    NumberManager
  },
  data: function () {
    return {
      // 获取购物车数据
      shoppingDatas: this.$store.state.shoppingDatas,
      // 总计
      totalData: {
        isAll: false,
        totalPrice: 0,
        goodsNumber: 0
      }
    }
  },
  methods: {
    // $arguments js中提供类数组对象，如果要获取第一个参数 $arguments[0]
    onNumberChange: function ($arguments, item, index) {
      const number = $arguments[0]
      this.$store.commit('changeShoppingDataNumber', {
        index: index,
        number: number
      })
      // 当商品数量变化时，并且处于选中状态
      if (item.isCheck) {
        this.computeGoodsTotal()
      }
    },
    onGoodsCheckClick: function (item) {
      item.isCheck = !item.isCheck
      this.computeGoodsTotal()
    },
    onAllCheckClick: function () {
      this.totalData.isAll = !this.totalData.isAll
      // 为每个商品标记为勾选
      this.shoppingDatas.forEach(item => {
        item.isCheck = this.totalData.isAll
      })
      // 统计数据
      this.computeGoodsTotal()
    },
    checkImg: function (isCheck) {
      return isCheck ? require('@img/check.svg') : require('@img/no-check.svg')
    },
    computeGoodsTotal: function () {
      // 重置totalData
      this.totalData = {
        isAll: true,
        totalPrice: 0,
        goodsNumber: 0
      }
      // 计算
      this.shoppingDatas.forEach(item => {
        if (item.isCheck) {
          this.totalData.totalPrice += parseFloat(item.price) * parseInt(item.number)
          this.totalData.goodsNumber += parseInt(item.number)
        } else {
          this.totalData.isAll = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.shopping {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    &-content {
      background-color: $bgColor;
      border-top: px2rem(1) solid $lineColor;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      &-list {
        height: 100%;
        overflow: hidden;
        overflow-y: auto;
        &-item {
          background-color: white;
          padding: $marginSize;
          display: flex;
          border-bottom: px2rem(1) solid $lineColor;
          &-check {
            width: $checkSize;
            align-self: center;
            padding: px2rem(6);
          }
          &-img {
            width: $listGoodsImgSize;
            height: $listGoodsImgSize;
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
            &-data {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: $marginSize;
              &-price {
                font-size: $titleSize;
                color: $mainColor;
                font-weight: 500;
              }
            }
          }
        }
      }
      &-total {
        height: px2rem(56);
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-color: white;
        border-top: px2rem(1) solid $lineColor;
        &-check {
          display: flex;
          align-items: center;
          margin: 0 $marginSize;
          img {
            width: $checkSize;
            height: $checkSize;
            padding: px2rem(6);
          }
          p {
            font-size: $infoSize;
          }
        }
        &-price {
          flex-grow: 2;
          display: flex;
          flex-direction: column;
          &-total {
            font-size: $titleSize;
            margin-bottom: px2rem(6);
            span {
              font-weight: bold;
            }
          }
          &-all {
            font-size: $minInfoSize;
            span {
              font-weight: bold;
            }
          }
        }
        &-commit {
          width: px2rem(120);
          height: 100%;
          font-size: $titleSize;
          background-color: $mainColor;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
}

</style>
