<template>
  <div class="login_wrap">
    <div class="login_box">
      <form class="login_form">
        <h1>Login</h1>
        <hr class="sep" />
        <div class="group">
          <input class="login_input" type="text" required="required" /><span class="highlight"></span><span class="bar"></span>
          <label class="login_label">Name</label>
        </div>
        <div class="group">
          <input class="login_input" type="password" required="required" /><span class="highlight"></span><span class="bar"></span>
          <label class="login_label">Password</label>
        </div>
        <div class="btn-box">
          <span class="btn btn-link" href="javascript:void(0)">登录</span>
        </div>
      </form>
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
$bg-color: #424242;
$hl-color: #2196F3;
$muted-color: mix(white, $bg-color, 70%);
$trans-time: 300ms;
$width: 340px;

.login_wrap {
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(to top left, #c3e9fb, #a1c4fd);
  font-family: Avenir;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
}


.login_form {
  width: $width;
  padding:40px 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px 0px rgba(0, 0, 0, 0.2);
  background: #fff;
  margin: 45px auto;
  h1 {
    font-size: 3em;
    font-weight: 300;
    text-align: center;
    color: $hl-color;
  }
  h5 {
    text-align: center;
    text-transform: uppercase;
    color: $muted-color;
  }
  hr.sep {
    background: $hl-color;
    box-shadow: none;
    border: none;
    height: 2px;
    width: 25%;
    margin: 0px auto 45px auto;
  }
  .emoji {
    font-size: 1.2em;
  }
}

.group {
  position: relative;
  margin: 45px 0;
}
textarea {
  resize: none;
}
.login_input{
  background: none;
  color: $muted-color;
  font-size: 18px;
  padding: 10px 10px 10px 5px;
  display: block;
  width: calc(100%);
  border: none;
  border-radius: 0;
  border-bottom: 1px solid $muted-color;
  &:focus {
    outline: none;
  }
  &:focus ~ label,
  &:valid ~ label {
    top: -14px;
    font-size: 12px;
    color: $hl-color;
  }
  &:focus ~ .bar:before {
  width: calc(100%);
  }
  &[type="password"] {
  letter-spacing: 0.3em;
  }
}

.login_label {
  color: $muted-color;
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: $trans-time ease all;
}

.bar {
  position: relative;
  display: block;
  width: calc(100%);
  &:before {
    content: '';
    height: 2px;
    width: 0;
    bottom: 0px;
    position: absolute;
    background: $hl-color;
    transition: $trans-time ease all;
    left: 0%;
  }
}

.btn {
  background: #fff;
  color: mix(black, $muted-color, 25%);
  border: none;
  padding: 10px 20px;
  border-radius: 3px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  outline: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);
  &:hover {
    color: mix(black, $muted-color, 30%);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.18), 0 5px 5px rgba(0, 0, 0, 0.12);
  }
  &.btn-link {
    background: $hl-color;
    cursor: pointer;
    color: mix(white, $hl-color, 80%);
    &:hover {
      background: darken($hl-color, 5%);
      color: mix(white, $hl-color, 85%);
    }
  }
}

.btn-box {
  text-align: center;
  margin: 50px 0;
}
</style>