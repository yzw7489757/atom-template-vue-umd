<template>
  <div class="fullPage">
      <div class="box">
        <h1>Hello, Development</h1>
      </div>
    </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    };
  }
};
</script>

<style lang="scss" scoped>
.fullPage {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(253deg, #0cc898, #1797d2, #864fe1);
  background-size: 300% 300%;
  animation: Background 25s ease infinite;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  font-family: Avenir;
  .login_input:-webkit-autofill {
    animation: autofill-fix 1s infinite;
    -webkit-text-fill-color: #ccc;
  }

  @keyframes autofill-fix {
    from {
      background-color: transparent;
    }
    to {
      background-color: transparent;
    }
  }

  .box {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url("../../assets/images/background.png");
    background-size: cover;
    background-position: center;
    background-repeat: repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    h1{
      font-size: 30px;
      color: #fff;
    }
  }
}

@keyframes Background {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>