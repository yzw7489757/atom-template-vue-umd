<template>
  <div class="deleteButton_warp">
      <div class="btn" ref="btn">
        <div class="btn-back">
          <p>你确定要删除？</p>
          <button class="yes" @click="triggerToEnterDelete">确定</button>
          <button class="no" @click="triggerToCancelDelete">取消</button>
        </div>
        <div class="btn-front" @click="triggerToDelete">删除</div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'deleteButton',
  data() {
    return {
      mx: 0,
      my: 0,
      m: 0,
      h: 0
    }
  },
  computed: {
    directions() {
      const {
        w, h, my, mx
      } = this
      const directives = [
        { id: 'top', x: w / 2, y: 0 },
        { id: 'right', x: w, y: h / 2 },
        { id: 'bottom', x: w / 2, y: h },
        { id: 'left', x: 0, y: h / 2 }
      ].sort((a, b) => this.distance(mx, my, a.x, a.y) - this.distance(mx, my, b.x, b.y))
      return directives;
    },
    btn() {
      return this.$refs.btn
    }
  },
  methods: {
    triggerToDelete(event) {
      this.mx = event.clientX - this.btn.offsetLeft;
      this.my = event.clientY - this.btn.offsetTop;
      this.m = this.btn.offsetWidth;
      this.h = this.btn.offsetHeight;
      this.btn.setAttribute('data-direction', this.directions.shift().id);
      this.btn.classList.add('is-open');
    },
    distance(x1, y1, x2, y2) {
      const dx = x1 - x2;
      const dy = y1 - y2;
      return Math.sqrt(dx * dx + dy * dy);
    },
    triggerToEnterDelete() {
      this.btn.classList.remove('is-open');
    },
    triggerToCancelDelete() {
      this.btn.classList.remove('is-open');
    }
  }
}
</script>

<style lang="scss" scoped>
$transition-duration: 0.8s;
$transition-easing: cubic-bezier(0.230, 1.000, 0.320, 1.000);
$bounce-easing: cubic-bezier(0.175, 0.885, 0.320, 1.275);
$closed-width: 200px;
$closed-height: 80px;
$opened-width: 400px;
$opened-height: 160px;

// @import url(https://fonts.googleapis.com/css?family=Roboto:400,700);
.deleteButton_warp {
  display: flex;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  font-size: 18px;
  perspective: 1000px;
  background-color: #f5f5f5;
  flex-direction: column;
  justify-content: center;
  user-select: none;
  align-items: center;
}

.description {
  margin-top: 50px;
  text-align: center;
  color: #999;
  transition: opacity 0.3s ease;
}

.description a {
  color: #4A9DF6;
  text-decoration: none;
}

.btn.is-open ~ .description {
  opacity: 0;
}

.btn {
  display: block;
  position: relative;
  width: $closed-width;
  height: $closed-height;
  transition: width $transition-duration $transition-easing,
              height $transition-duration $transition-easing,
              transform $transition-duration $bounce-easing;
  transform-style: preserve-3d;
  transform-origin: 50% 50%;
  text-align: center;
}

.btn-front {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  line-height: $closed-height;
  background-color: #F44336;
  color: #fff;
  cursor: pointer;
  backface-visibility: hidden;
  -webkit-tap-highlight-color: rgba( 0, 0, 0, 0 );
  transition: background 0.15s ease,
              line-height $transition-duration $transition-easing;
}
.btn-front:hover {
  background-color: lighten(#F44336, 10%);
}
.btn.is-open .btn-front {
  pointer-events: none;
  line-height: $opened-height;
}

.btn-back {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #eee;
  color: #222;
  transform: translateZ(-2px) rotateX(180deg);
  overflow: hidden;
  transition: box-shadow $transition-duration ease;
}
.btn-back p {
  margin-top: 27px;
  margin-bottom: 25px;
}
.btn-back button {
  padding: 12px 20px;
  width: 30%;
  margin: 0 5px;
  background-color: transparent;
  border: 0;
  border-radius: 2px;
  font-size: 1em;
  cursor: pointer;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba( 0, 0, 0, 0 );
  transition: background 0.15s ease;

  &:focus {
    outline: 0;
  }

  &.yes {
    background-color: #2196F3;
    color: #fff;

    &:hover {
      background-color: lighten(#2196F3, 10%);
    }
  }

  &.no {
    color: #2196F3;

    &:hover {
      background-color: #ddd;
    }
  }
}

.btn.is-open .btn-back {
  box-shadow: 0 8px 25px rgba(0,0,0,0.4);
}

.btn[data-direction="left"] .btn-back,
.btn[data-direction="right"] .btn-back {
  transform: translateZ(-2px) rotateY(180deg);
}

.btn.is-open {
  width: $opened-width;
  height: $opened-height;
}

.btn[data-direction="top"].is-open {
  transform: rotateX(180deg);
}

.btn[data-direction="right"].is-open {
  transform: rotateY(180deg);
}

.btn[data-direction="bottom"].is-open {
  transform: rotateX(-180deg);
}

.btn[data-direction="left"].is-open {
  transform: rotateY(-180deg);
}

</style>