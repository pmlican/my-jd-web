<template>
    <div class="my">
        <navigation-bar :pageName="'我的'" :isShowBack="false"></navigation-bar>
        <h1>我的</h1>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  components: {
    NavigationBar
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.my {
    width: 100%;
    height: 100%;
    font-size: 32px;
}

</style>
