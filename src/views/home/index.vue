<template>
  <div class="aaa">
    <button @click="clickMessage">123</button>
    <y-button-group>
      <y-button>123</y-button>
      <y-button>123</y-button>
    <y-button type="info">456</y-button>
    <y-button type="info">456</y-button>
    <y-button type="danger">789</y-button>
    <y-button type="danger">789</y-button>
    <y-button type="plain">100</y-button>
    <y-button type="plain">100</y-button>
    </y-button-group>
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
    /**
     *
     */
    clickMessage() {
      this.$alert('123')
    }
  }
}
</script>

<style lang="scss" scoped>
.aaa{
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>