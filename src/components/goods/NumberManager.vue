<template>
    <div class="number-manager">
        <span class="number-manager-less" :class="{'number-manager-disabled' : number === 1}" @click="onLessClick">-</span>
        <span class="number-manager-number">{{number}}</span>
        <span class="number-manager-add" @click="onAddClick">+</span>
    </div>
</template>

<script>
export default {
  props: {
    defaultNumber: {
      type: Number,
      default: 1
    }
  },
  data: function () {
    return {
      number: 1
    }
  },
  methods: {
    onLessClick: function () {
      if (this.number === 1) {
        return
      }
      this.number -= 1
    },
    onAddClick: function () {
      this.number += 1
    }
  },
  watch: {
    defaultNumber: function (newV) {
      this.number = newV
    },
    // 监听数量变化
    number: function (newV) {
      this.$emit('onChangeNumber', newV)
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.number-manager {
    display: flex;
    font-size: $infoSize;
    height: px2rem(20);
    line-height: px2rem(20);
    span {
        width: px2rem(30);
        text-align: center;
        display: inline-block;
        font-weight: 500;
    }
    &-number {
        background-color: $bgColor;
        padding: 0 px2rem(4);
    }
    &-disabled {
        color: $hintColor;
    }
}

</style>
