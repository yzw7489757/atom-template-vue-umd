<template>
  <div class="y-button-group">
    <slot/>
  </div>
</template>
<script>
export default {
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
.y-button-group {
  display: inline-flex;
  vertical-align: middle;
  > .g-button {
    border-radius: 0;
    &:not(:first-child) {
      margin-left: -1px;
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