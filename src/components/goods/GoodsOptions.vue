<template>
  <!-- z-index-2让它不会被列表页遮住  -->
  <div class="goods-options z-index-2">
    <!-- 一级选项 列表标签 -->
    <ul class="goods-options-list">
      <li class="goods-options-list-item" v-for="(item, index) in optionsDatas" :key="index">
        <!-- 包一层a标签的原因是： a标签可以接受点击事件 -->
        <a class="goods-options-list-item-content" @click="onOptionsItemClick(item, index)">
          <!-- 标签名 -->
          <span
            class="goods-options-list-item-content-name"
            :class="{'goods-options-list-item-content-name-active' : selectOptions.id == item.id}"
          >{{item.name}}</span>
          <!-- 三角形  当有subs时展示-->
          <span class="goods-options-list-item-content-caret caret" v-if="item.subs.length > 0"
            :class="[isShowSubContent && selectOptions.id === item.id ? 'goods-options-list-item-content-caret-open' : 'goods-options-list-item-content-caret-close']"></span>
        </a>
      </li>
    </ul>
    <!-- transion动画 -->
    <transition name="fold-height">
      <!-- 二级选项内容  通过属性控制-->
      <div class="options-sub-content z-index-2" v-show="isShowSubContent">
        <!-- 二级标签列表 -->
        <ul class="options-sub-content-list">
          <li
            class="options-sub-content-list-item"
            v-for="(item, index) in selectOptions.subs"
            :key="index"
          >
            <a class="options-sub-content-list-item-content" @click="onSubOptionsItemClick(item, index)">
              <!-- 标签名 -->
              <span class="options-sub-content-list-item-content-name" :class="{'options-sub-content-list-item-content-name-active' : selectOptions.id == item.id}">{{item.name}}</span>
              <!-- 选中图片 -->
              <img
                class="options-sub-content-list-item-content-select"
                src="@img/options-select.svg"
                v-show="selectOptions.id === item.id"
              />
            </a>
          </li>
        </ul>
      </div>
    </transition>
    <!-- 遮盖层 增加点击事件-->
    <div class="cover" v-show="isShowSubContent" @click="isShowSubContent = false"></div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      optionsDatas: [
        {
          id: '1',
          name: '默认',
          subs: [
            {
              id: '1',
              name: '默认'
            },
            {
              id: '1-2',
              name: '价格由高到低'
            },
            {
              id: '1-3',
              name: '销量由高到低'
            }
          ]
        },
        {
          id: '2',
          name: '有货优先',
          subs: []
        },
        {
          id: '3',
          name: '直营有先',
          subs: []
        }
      ],
      // 选中的筛选项
      selectOptions: {},
      // 标记是否展开子选项
      isShowSubContent: false
    }
  },
  created: function () {
    this.selectOptions = this.optionsDatas[0]
  },
  methods: {
    /***
     * 一级事件点击：
     * 1.如果子选项处于展开状态，则关闭子选项视图
     * 2.当包含subs.length>0, 当钱item处于选中状态，设置为用户点击的item
     */
    onOptionsItemClick: function (item, index) {
      if (this.isShowSubContent) {
        this.isShowSubContent = false
        return
      }
      if (item.subs.length > 0 && this.selectOptions.id === item.id) {
        this.isShowSubContent = true
      }
      this.selectOptions = item
    },
    onSubOptionsItemClick: function (item, index) {
      this.selectOptions = item
      // 遍历找到对应选项，置顶到父选项
      this.optionsDatas.forEach(options => {
        options.subs.forEach(subOptions => {
          if (subOptions.id === this.selectOptions.id) {
            options.id = subOptions.id
            options.name = subOptions.name
          }
        })
      })
      // 关闭子选项视图
      this.isShowSubContent = false
    }
  },
  watch: {
    // 监听当前选中选项变化
    selectOptions: function (newV) {
      // 把id传递出去
      this.$emit('optionsChange', newV.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.goods-options {
  width: 100%;
  border-bottom: 1px solid $lineColor;
  // 一级选项
  &-list {
    display: flex;
    width: 100%;
    height: px2rem(46);
    background-color: white;
    &-item {
      flex-grow: 1;
      &-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &-name {
          font-size: $infoSize;
          margin-right: $marginSize;
          &-active {
            color: $mainColor;
          }
        }
        // 三角形动画
        &-caret {
          &-open {
            transform: rotate(-180deg);
            transition: all 0.3s;
          }
          &-close {
            transform: rotate(0deg);
            transition: all 0.3s;
          }
        }
      }
    }
  }
  // 二级选项
  .options-sub-content {
    position: absolute;
    width: 100%;
    // 设置超过最大180后y轴滚动
    max-height: px2rem(180);
    overflow: hidden;
    overflow-y: auto;
    background-color: white;
    &-list {
      &-item {
        &-content {
          display: flex;
          align-items: center;
          border-top: 1px solid $lineColor;
          padding: $marginSize;
          height: px2rem(44);
          box-sizing: border-box;
          &-name {
            font-size: $infoSize;
            display: inline-block;
            flex-grow: 1;
            &-active {
              color: $mainColor;
            }
          }
          &-select {
            width: px2rem(18);
            height: px2rem(18);
          }
        }
      }
    }
  }
  // transition动画 -enter-active
  .fold-height-enter-active {
    animation-duration: 0.3s;
    animation-name: fold-height-open;
  }
  @keyframes fold-height-open {
    0% {
      max-height: 0;
    }
    100% {
      max-height: px2rem(180);
    }
  }
    // transition动画 -leave-active
  .fold-height-leave-active {
    animation-duration: 0.3s;
    animation-name: fold-height-close;
  }
  @keyframes fold-height-close {
    0% {
      max-height: px2rem(180);
    }
    100% {
      max-height: 0;
    }
  }

}
</style>
