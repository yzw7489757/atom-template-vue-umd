<template>
  <div class="aaa">
    <y-dialog :visible.sync="show">
    123
    </y-dialog>
    <button @click="show = !show">click</button>
    <button @click="clickMessage">弹窗</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      show: false
    }
  },
  methods: {
    clickMessage() {
      this.$msg.success('123')
    }
  }
}
</script>

<style lang="scss" scoped>
.aaa{
  height:100vh;
  width:100vw;
}
</style>