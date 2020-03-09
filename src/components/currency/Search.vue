<template>
    <div class="search" :style="{backgroundColor: bgColor}">
        <img class="search-icon" :src="icon" alt="">
        <span class="search-hint" :style="{color: hintColor}">请搜索商品名称</span>
    </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#ffffff'
    },
    icon: {
      type: String,
      default: require('@img/search.svg')
    },
    hintColor: {
      type: String,
      default: '#999999'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.search {
    background-color: white;
    width: 100%;
    margin: px2rem(6);
    border-radius: px2rem(22);
    display: flex;
    align-items: center;
    &-icon {
        margin-left: $marginSize;
        width: px2rem(16);
    }
    &-hint {
        margin-left: $marginSize;
        font-size: $minInfoSize;
        color: $hintColor;
    }
}
</style>
