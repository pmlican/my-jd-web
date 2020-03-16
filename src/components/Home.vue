<template>
    <div class="home" @scroll="onScrollChange" ref="home">
        <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
        <!-- 左侧插槽 -->
        <template v-slot:nav-left>
          <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
        </template>
        <!-- 中间插槽 -->
        <template v-slot:nav-center>
          <search :bgColor="navBarCurrentSlotStyle.search.bgColor"
          :hintColor="navBarCurrentSlotStyle.search.hintColor"
          :icon="navBarCurrentSlotStyle.search.icon">
          </search>
        </template>
        <!-- 右侧插槽 -->
        <template v-slot:nav-right>
          <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
        </template>
        </navigation-bar>
        <div class="home-content">
            <!-- swiperData.map(item => item.icon) -->
            <my-swiper :swiperImgs="swiperData" :height="swiperHeight"></my-swiper>
            <activity>
              <div class="activity-520">
                <img v-for="(item, index) in activityDatas" :key="index" :src="item.icon" alt="">
              </div>
            </activity>
            <mode-options></mode-options>
            <seconds :dataSource='secondsData'></seconds>
            <activity>
              <div class="activity-pin-gou-jie">
                <img src="@img/pinGouJie.gif" alt="">
              </div>
            </activity>
            <goods :layoutType="'3'" :isScroll="false"></goods>
        </div>
    </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue'
import Activity from '@c/currency/Activity.vue'
import ModeOptions from '@c/currency/ModeOptions.vue'
import Seconds from '@c/seconds/Seconds.vue'
import Goods from '@c/goods/Goods.vue'
import NavigationBar from '@c/currency/NavigationBar.vue'
import Search from '@c/currency/Search.vue'
export default {
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search
  },
  data: function () {
    return {
      swiperData: [],
      activityDatas: [],
      // 如果是iPhoneX，轮播图高度增加44px
      swiperHeight: this.$store.state.isIphoneX ? '228px' : '184px',
      secondsData: [],
      // navBar的定制样式
      navBarStyle: {
        // 位置固定不随着父组件移动
        position: 'fixed',
        // 背景色透明
        backgroundColor: ''
      },
      // 插槽的样式数据，normal和highlight两种
      navBarSlotStyle: {
        normal: {
          leftIcon: require('@img/more-white.svg'),
          search: {
            bgColor: '#ffffff',
            hintColor: '#999999',
            icon: require('@img/search.svg')
          },
          rightIcon: require('@img/message-white.svg')
        },
        highlight: {
          leftIcon: require('@img/more.svg'),
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#ffffff',
            icon: require('@img/search-white.svg')
          },
          rightIcon: require('@img/message.svg')
        }
      },
      // navBar 当前使用的插槽样式
      navBarCurrentSlotStyle: {},
      // 记录页面滚动值
      scrollTopValue: -1,
      // 锚点值，样式发生改变的距离顶部的滚动距离
      ANCHOR_SCROLL_TOP: 160
    }
  },
  methods: {
    initData: function () {
      // this.$http.get('/swiper').then(data => {
      //   // console.log(data.list.map(item => item.icon))
      //   this.swiperData = data.list.map(item => item.icon)
      // }).catch(err => {
      //   console.log(err)
      // })
      // this.$http.get('/activitys').then(data => {
      //   this.activityDatas = data.list
      // }).catch(err => {
      //   console.log(err)
      // })
      // axios 并行请求多个接口方式
      this.$http.all([
        this.$http.get('swiper'),
        this.$http.get('activitys'),
        this.$http.get('seconds')
      ]).then(this.$http.spread((swiperData, activityDatas, secondsData) => {
        this.swiperData = swiperData.list.map(item => item.icon)
        this.activityDatas = activityDatas.list
        this.secondsData = secondsData.list
        // console.log(secondsData)
      }))
    },
    /*
     * 监听home滚动事件回调
     * 1.获取当前滚动距离
     * 2.计算navBar背景透明度
     * 3.如果opacity >= 1,为高亮样式,反之为默认样式
     *
    */
    onScrollChange: function ($event) {
      this.scrollTopValue = $event.target.scrollTop
      // 计算透明度
      const opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
      // 根据透明度，改变插槽样式
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
      }
      // 根据透明度设置navbar背景颜色
      this.navBarStyle.backgroundColor = 'rgba(255,255,255,' + opacity + ')'
    }
  },
  created: function () {
    // 设置默认navbar样式
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
    // 调用initData方法加载数据
    this.initData()
  },
  // keepAlive组件被激活的时候调用
  // 为这个模块指定滑动距离
  activated: function () {
    this.$refs.home.scrollTop = this.scrollTopValue
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
    .home {
        // position: absolute;
        width: 100%;
        height: 100%;
        background-color: $bgColor;
        overflow: hidden;
        overflow-y: auto;
        &-content {
            height: 100%;
            .activity-520 {
                margin-top: px2rem(-8);
                border-top-right-radius: px2rem(8);
                border-top-left-radius: px2rem(8);
              img {
                display: inline-block;
                width: 33.33%;
              }
            }
            .activity-pin-gou-jie {
              background-color: white;
              margin-top: $marginSize;
              img {
                width: 100%;
              }
            }
        }
    }
</style>
