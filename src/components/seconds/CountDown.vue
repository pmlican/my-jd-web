<template>
    <div class="count-down">
      <!-- 秒杀结束时间 -->
      <span class="count-down-end-time">{{endHours}}点场</span>
      <!-- 秒杀倒计时 -->
      <span class="count-down-surplus">{{surplus | filterTime}}</span>
    </div>
</template>

<script>
export default {
  props: {
    endHours: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data: function () {
    return {
      // 展示活动状态
      surplus: '',
      // 距离活动开始时间的秒数
      diffSeconds: 0,
      interval: undefined
    }
  },
  created: function () {
    this.computedSurplusTime()
  },
  methods: {
    computedSurplusTime: function () {
      // 判断如果已经存在，就清除定时器
      if (this.interval) {
        clearInterval(this.interval)
      }
      // 获取当前时间
      const date = new Date()
      // 如果超过当前时间，活动已结束
      if (date.getHours() > this.endHours) {
        this.surplus = '活动已经结束'
        return
      }
      if (date.getHours() === this.endHours) {
        this.surplus = '活动进行中'
        return
      }
      // 比如开始时间16点，当前12点，应该展示3：59：59
      const diffHours = this.endHours - date.getHours() - 1
      const diffMinutes = 60 - date.getMinutes() - 1
      const diffSeconds = 60 - date.getSeconds()
      // 转化为总秒数
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds
      // 开始定时器
      this.interval = setInterval(() => {
        this.diffSeconds -= 1
      }, 1000)
    }
  },
  // 监听器，vue文档有说明
  watch: {
    diffSeconds: function (newValue) {
      // 当前秒数/3600,向下取整
      const hours = Math.floor(newValue / 3600)
      // 取模，计算出超出一小时的分钟数
      const minutes = Math.floor(newValue / 60) % 60
      // 剩余秒数
      const seconds = newValue % 60
      // 拼接成时分秒
      this.surplus = hours + ':' + minutes + ':' + seconds
      // 当变成 0：0：0分时，还要手动调用一次计算时间差，把状态变成进行中
      if (newValue === 0) {
        this.computedSurplusTime()
      }
    },
    // 监听结束时间变化 也要开启定时器 不然还是上一次endHours结果
    endHours: function (newValue) {
      this.computedSurplusTime()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.count-down {
   font-size: $infoSize;
   margin-left: $marginSize;
   display: inline-block;
   span {
       display: inline-block;
       padding: px2rem(2) px2rem(4);
   }
   &-end-time {
       background-color: $mainColor;
       border-top-left-radius: px2rem(4);
       border-bottom-left-radius: px2rem(4);
       color: white;
       border: px2rem(1) solid $mainColor;
   }
    &-surplus {
       background-color: white;
       border-top-right-radius: px2rem(4);
       border-bottom-right-radius: px2rem(4);
       color: $mainColor;
       border: px2rem(1) solid $mainColor;
   }
}

</style>
