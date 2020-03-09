<template>
    <div class="activity">
        <!-- 展示插槽 -->
        <slot></slot>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.activity {
    max-height: px2rem(180);
    position: relative;
    z-index: 2;
}

</style>
