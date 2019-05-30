<!-- alert.vue -->
<template>
  <transition-group class="alert" name="fade" tag="div">
    <div class="alert-main" v-for="item in notices" :key="item.name">
        <div class="alert-content">
          <!-- <svg-icon class="close" icon-class="close" @click.native="remove(item.name)"></svg-icon> -->
          {{ item.content }}
        </div>
    </div>
  </transition-group>
</template>
<script>
let seed = 0;

function getUuid() {
  return `alert_${seed++}`;
}

export default {
  data() {
    return {
      notices: []
    }
  },
  methods: {
    add(notice) {
      const name = getUuid();
      const _notice = Object.assign({
        name
      }, notice);
      const { duration } = notice;
      _notice.timeout = setTimeout(() => {
        this.remove(name);
      }, duration * 1000);
      this.notices.push(_notice);
    },
    remove(name) {
      const { notices } = this;
      for (let i = 0; i < notices.length; i++) {
        if (notices[i].name === name) {
          clearTimeout(this.notices[i].timeout)
          this.notices.splice(i, 1);
          break;
        }
      }
    }
  }
}
</script>
<style lang="scss" scope>
.alert{
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none; // 禁止所有事件
}
.alert-content{
  position: relative;
  display: inline-block;
  min-width: 100px;
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
  margin-bottom: 8px;
}
.close{
  position: absolute;
  right:4px;
  top:4px;
  cursor: pointer;
  font-size: 12px;
}
</style>