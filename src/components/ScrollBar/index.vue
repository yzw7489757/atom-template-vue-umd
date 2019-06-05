<template>
  <span class="scroll-container" ref="scrollContainer" @wheel.prevent="handleScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{top: top + 'px'}">
      <slot></slot>
    </div>
    <!-- <span class="footer"><span style="font-size:17px">用户名: </span><span style="margin-left:3px;font-size:17px">{{username}}</span></span> -->
  </span>
</template>

<script>
const delta = 15

export default {
  name: 'scrollBar',
  data() {
    return {
      top: 0,
      username: ''
    }
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 3
      const $container = this.$refs.scrollContainer
      const $containerHeight = $container.offsetHeight
      const $wrapper = this.$refs.scrollWrapper
      const $wrapperHeight = $wrapper.offsetHeight
      if (eventDelta > 0) {
        this.top = Math.min(0, this.top + eventDelta)
      } else {
        if ($containerHeight - delta < $wrapperHeight) {
          if (this.top < -($wrapperHeight - $containerHeight + delta)) {
            this.top = this.top
          } else {
            this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
          }
        } else {
          this.top = 0
        }
      }
    },
    getusername() {
      this.username = sessionStorage.getItem('username')
    }
  },
  created() {
    this.getusername()
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '@/styles/var.scss';

.scroll-container {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: $menuBg;
  .scroll-wrapper {
    position: absolute;
     width: 100%!important;
  }
  .footer{
    // line-height: 50px;
    font-size: 18px;
    position: fixed;
    bottom: 30px;
    left:25px;
    color: #ffffff;
    font-size: 14px;
    z-index: 10000;
    background-color: rgb(48, 65, 86);
  }
}
</style>
