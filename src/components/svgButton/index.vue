<template>
  <div class="svg-wrapper">
    <svg class="svg-wrap" xmlns="http://www.w3.org/2000/svg">
      <rect class="shape"/>
    </svg>
    <div class="text">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.svg-wrapper {
  height:60px;
  margin: 0 auto;
  position: relative;
  text-align: center;
  cursor: pointer;
  width: 320px;
}
.shape {
  width:100%;
  height:calc(100%);
  fill: transparent;
  stroke-dasharray: 140 540;
  stroke-dashoffset: -474;
  stroke-width: 8px;
  stroke: #19f6e8;
  transition: all .5s linear;
}
.svg-wrap{
  width:100%;
  height:calc(100%);
}
.text {
  color: rgba(0,0,0,.65);
  font-family: 'Roboto Condensed';
  font-size: 22px;
  line-height: 32px;
  position: relative;
  top: -48px;
}
.svg-wrapper:hover .shape {
  stroke-dasharray: 760;
  stroke-dashoffset: 0;
  stroke-width: 4px;
}
</style>
