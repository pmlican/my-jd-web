<template>
    <!--
        三种布局方式：垂直列表（goods-list）, 网格布局（goods-grid），瀑布流布局（goods-waterfall）
        瀑布流的布局：
        1、创建商品列表的基本html 和 css ， 让 item 相对于 goods（div）进行排列(相对布局)
        2、生成不同高度的图片，撑起不同高度的 item。
        3、计算 item 的位置，来达到 从上到下，从左到右依次排列的目的
     -->
    <!-- 新增一个类名能否滚动 -->
    <div class="goods" :class="[layoutClass, {'goods-scroll' : isScroll}]" :style="{height: goodsViewHeight}" ref="goods" @scroll="onScrollChange">
      <div class="goods-item" :class="layoutItemClass" @click="onItemClick(item)" ref="goodsItem" :style="goodsItemStyles[index]" v-for="(item, index) in sortGoodsData" :key="index">
          <!-- 图片 -->
          <img class="goods-item-img" :src="item.img" alt="" :style="imgStyles[index]">
          <!-- 商品描述 -->
          <div class="goods-item-desc">
            <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-hint' : !item.isHave}">
                <!-- 是否直营，是否有库存 -->
                <direct v-if="item.isDirect"></direct>
                <no-have v-if="!item.isHave"></no-have>
                {{item.name}}
            </p>
            <div class="goods-item-desc-data">
                <p class="goods-item-desc-data-price">￥{{item.price | priceValue}}</p>
                <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import Direct from '@c/goods/Direct.vue'
import NoHave from '@c/goods/NoHave.vue'
export default {
  components: {
    Direct,
    NoHave
  },
  props: {
    /**
     * 传入布局参数：1.垂直列表 2.网格 3.瀑布流
     *
    */
    layoutType: {
      type: String,
      default: '1'
    },
    // 是否允许单独滑动，瀑布流布局时会出现顶部界面错位
    isScroll: {
      type: Boolean,
      default: true
    },
    // 提供一个参数来排序
    sort: {
      type: String,
      default: '1'
    }
  },
  data: function () {
    return {
      // 网络数据源
      dataSource: [],
      // 排序的数据源
      sortGoodsData: [],
      MAX_IMG_HEIGHT: 230,
      MIN_IMG_HEIGHT: 178,
      imgStyles: [],
      // item距离上一个item间距
      ITEM_MARGIN_SIZE: 8,
      goodsItemStyles: [],
      // 暂时修改为100%
      goodsViewHeight: '100%',
      // 布局类名 默认为垂直布局
      // 1.垂直列表（goods-list） 2. 网格布局（goods-grid） 3. 瀑布流布局（goods-waterfall）
      layoutClass: 'goods-list',
      layoutItemClass: 'goods-list-item',
      scrollTopValue: 0
    }
  },
  created: function () {
    this.initData()
  },
  activated: function () {
    // 定位活动距离
    this.$refs.goods.scrollTop = this.scrollTopValue
  },
  methods: {
    onScrollChange: function ($event) {
      this.scrollTopValue = $event.target.scrollTop
    },
    initData: function () {
      this.$http.get('goods').then(data => {
        // console.log(data)
        this.dataSource = data.list
        // 这里调用排序方法
        this.setSortGoodsData()
        // 设置布局
        this.initLayout()
      }).catch(err => {
        console.log(err)
      })
    },
    // 商品排序方法
    setSortGoodsData: function () {
      switch (this.sort) {
        // 默认
        case '1':
          // 深拷贝一份数组
          this.sortGoodsData = this.dataSource.slice(0)
          break
        // 价格由高到低
        case '1-2':
          this.getSortGoodsFromKey('price') // key不要写错
          break
        // 销量由高到低
        case '1-3':
          this.getSortGoodsFromKey('volume')
          break
          // 有货优先
        case '2':
          this.getSortGoodsFromKey('isHave')
          break
          // 直营优先
        case '3':
          this.getSortGoodsFromKey('isDirect') // key不要写错
          break
      }
    },
    // 封装一个排序方法 return 1(为升序) -1(为降序) 0(不变)
    // 根据key取到对应模型, 根据不同数据类型来做判断排序
    getSortGoodsFromKey: function (key) {
      this.sortGoodsData.sort((goods1, goods2) => {
        const v1 = goods1[key]; const v2 = goods2[key]
        // boolean 类型为（有货优先，直营优先）
        if (typeof v1 === 'boolean') {
          if (v1) {
            return -1
          }
          if (v2) {
            return 1
          }
          return 0
        }
        if (parseFloat(v1) >= parseFloat(v2)) {
          return -1
        }
        return 1
      })
    },
    onItemClick: function (item) {
      if (!item.isHave) {
        alert('该商品无库存')
        return
      }
      this.$router.push({
        name: 'goodsDetail',
        params: {
          // goods: item,
          routerType: 'push'
        },
        // 把传递的数据拼接到URL
        query: {
          goodsId: item.id
        }
      })
    },
    initLayout: function () {
      // 重置初始化数据
      this.goodsViewHeight = '100%'
      this.goodsItemStyles = []
      this.imgStyles = []
      switch (this.layoutType) {
        case '1':
          this.layoutClass = 'goods-list'
          this.layoutItemClass = 'goods-list-item'
          break
        case '2':
          this.layoutClass = 'goods-grid'
          this.layoutItemClass = 'goods-grid-item'
          break
        case '3':
          this.layoutClass = 'goods-waterfall'
          this.layoutItemClass = 'goods-waterfall-item'
          // 计算瀑布流布局
          this.initImgStyles()
          this.$nextTick(() => {
            this.initWaterfall()
          })
          break
      }
    },
    imgHeight: function () {
      const randomHeight = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT)
      return randomHeight
    },
    initImgStyles: function () {
      this.dataSource.forEach(item => {
        const imgHeight = this.imgHeight() + 'px'
        this.imgStyles.push({ height: imgHeight })
      })
    },
    initWaterfall: function () {
      // 获取所有item元素
      const $goodsItem = this.$refs.goodsItem
      if (!$goodsItem) return
      let leftHeightTotal = 0; let rightHeightTotal = 0
      $goodsItem.forEach(($el, index) => {
        let goodItemStyle = {}
        const elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE
        if (leftHeightTotal <= rightHeightTotal) {
          // item放在左侧
          goodItemStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          // 更新左侧leftHeightTotal高度
          leftHeightTotal += elHeight
        } else {
          goodItemStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }
          rightHeightTotal += elHeight
        }
        // 保存到item样式数组
        this.goodsItemStyles.push(goodItemStyle)
      })
      // 这里解决错位问题, 设置为100%就不会有错位
      if (!this.isScroll) {
      // 对比左右最大高度为goods组件的最大高度
        this.goodsViewHeight = (leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal) + 'px'
      }
    }
  },
  watch: {
    // 监听layoutType值变化
    layoutType: function () {
      this.initLayout()
    },
    // 监听外界传值sort
    sort: function () {
      this.setSortGoodsData()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods {
    background-color: $bgColor;
    // 是否允许滑动
    &-scroll {
      overflow: hidden;
      overflow-y: auto;
    }
    &-item {
        background-color: white;
        padding: $marginSize;
        box-sizing: border-box;
        &-desc {
            width: 100%;
            &-name {
                font-size: $infoSize;
                line-height: px2rem(18);
                &-hint {
                  color: $hintColor;
                }
            }
            &-data {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: $marginSize;
                &-price {
                    font-size: $titleSize;
                    font-weight: 500;
                    color: $mainColor;
                }
                &-volume {
                    font-size: $infoSize;
                    color: $hintColor;
                }
            }
        }
    }

}
// 瀑布流布局
.goods-waterfall {
    position: relative;
    margin: $marginSize;
    &-item {
        position: absolute;
        width: 49%;
        .goods-item-img {
            width: 100%;
        }
    }
}
// 垂直列表布局
.goods-list {
  &-item {
    display: flex;
    border-bottom: 1px solid $lineColor;
    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
    }
    .goods-item-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: $marginSize;
    }
  }
}
// 网格布局
.goods-grid {
  padding: $marginSize;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &-item {
    width: 49%;
    border-radius: $radiusSize;
    margin-bottom: $marginSize;
    .goods-item-img {
      width: 100%;
    }
  }
}
</style>
