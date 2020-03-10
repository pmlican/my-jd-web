<template>
    <swiper :options="swiperOptions">
        <swiper-slide v-for="(item, index) in swiperImgs" :key="index">
            <img class="swiper-slide-img" :style="{height: height}" :src="item" alt="">
        </swiper-slide>
        <!-- <template v-slot:pagination>
            <div class="swiper-pagination">
            </div>
        </template> -->
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    // 驼峰引入组件相当于 'swiper-slide': swiperSlide
    swiperSlide
  },
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    swiperImgs: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    // 新增分页器样式
    paginationType: {
      type: String,
      default: '1'
    }
  },
  data: function () {
    return {
      swiperOptions: {
        autoplay: true,
        autoHeight: true,
        pagination: {
          // 绑定对应的html元素
          el: '.swiper-pagination',
          type: 'bullets',
          // 绑定类名，修改样式,原始样式为蓝色，灰底
          bulletClass: 'custom-bullet-class'
        }
      }
    }
  },
  created: function () {
    this.initPaginationLayout()
  },
  methods: {
    initPaginationLayout: function () {
      switch (this.paginationType) {
        case '1':
          this.swiperOptions.pagination = {
            // 绑定对应的html元素
            el: '.swiper-pagination',
            type: 'bullets',
            // 绑定类名，修改样式,原始样式为蓝色，灰底
            bulletClass: 'custom-bullet-class'
          }
          break

        case '2':
          this.swiperOptions.pagination = {
            el: '.swiper-pagination',
            type: 'fraction'
          }
          break
      }
    }
  }
}
</script>

<style lang="scss">
//这里style不能加scoped
@import '@css/style.scss';
    .swiper-slide-img {
        width: 100%;
    }
    .swiper-pagination {
        bottom: px2rem(12);
        .custom-bullet-class {
            box-sizing: border-box;
            border-radius: 100%;
            height: px2rem(6);
            width: px2rem(6);
            border: px2rem(1) solid #fff;
            margin: 0 px2rem(4);
            display: inline-block;
            opacity: 1;
        }
        .swiper-pagination-bullet-active {
            background: white;
        }
    }
    // 数字分页器样式
    .swiper-pagination-fraction {
      left: auto;
      right: 0;
      width: auto;
      font-size: $infoSize;
      background-color: rgba(0, 0, 0, 0.3);
      padding: px2rem(6) px2rem(16);
      bottom: px2rem(32);
      color: white;
      border-top-left-radius: px2rem(16);
      border-bottom-left-radius: px2rem(16);
      //当前页码样式
      .swiper-pagination-current {
        font-size: $titleSize;
        font-weight: bold;
      }
    }

</style>
