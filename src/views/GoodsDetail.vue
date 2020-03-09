<template>
    <div class="goods-detail">
        <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
            <template v-slot:nav-left>
                <div class="goods-detail-nav-left" @click="onBackClick">
                    <img src="@img/back-2.svg" alt="">
                </div>
            </template>
        </navigation-bar>
        <div class="goods-detail-content">
            <my-swiper :height="SWIPER_IMAGE_HEIGHT + 'px'" :swiperImgs="goodsData.swiperImgs">

            </my-swiper>
        </div>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import MySwiper from '@c/swiper/MySwiper.vue'
export default {
  components: {
    NavigationBar,
    MySwiper
  },
  data: function () {
    return {
      SWIPER_IMAGE_HEIGHT: 364,
      navBarStyle: {
        backgroundColor: ''
      },
      goodsData: {}
    }
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
    }
  },
  created: function () {
    // console.log(this.$route.params.goods)
    // 注意这里是用 route 不是router
    this.goodsData = this.$route.params.goods
  }
}
</script>

<style lang="scss" scoped>

</style>
