<template>
  <div class="y-button-group">
    <slot/>
  </div>
</template>
<script>
export default {
  name: 'y-button-group',
  mounted() {
    for (let i = 0; i < this.$el.children.length; i++) {
      const name = this.$el.children[i].nodeName.toLowerCase();
      if (name !== 'button') {
        console.warn(
          `el:${this.$el.outerHTML} \n\n第${i
            + 1}个子元素应该是button，而你写的是${name}，请按照规范填写`
        );
      }
    }
  }
};
</script>
<style lang="scss">
$button-color: #606266;
$plain-border-color:#dcdfe6;
$primary:#ffd800;
$danger:#F56C6C;
.y-button-group {
  display: inline-flex;
  vertical-align: middle;
  > .y-button {
    border-radius: 0;
    &:not(:first-child) {
      margin-left: -1px;
      &:not(.plain-button){
        z-index:99999;
          border-left-color:#fff;
        &:active,&:hover{
          border-left-color:#fff;
          border-right-color:#fff;
        }
      }
      &.plain-button{
        &:active,&:hover{
          border-top-color: rgba($plain-border-color,.8);
          border-bottom-color: rgba($plain-border-color,.8);
        }
      }
    }
    &:hover {
      position: relative;
      z-index: 1;
    }
    &:first-child{
      border-top-left-radius: var(--border-radius);
      border-bottom-left-radius: var(--border-radius);
    }
    &:last-child {
      border-top-right-radius: var(--border-radius);
      border-bottom-right-radius: var(--border-radius);
    }
  }
}
</style>