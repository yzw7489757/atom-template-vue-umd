<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" id="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar"></hamburger>
    <breadcrumb class="breadcrumb-container"/>
    <div class="logo-hangyeyun">
      <!-- <img src="./../../../assets/img/logo.png"> -->
    </div>
    <el-dropdown class="avatar-container" id="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <!-- <img class="user-avatar" src="./../../../assets/img/logout.gif?imageView2/1/w/80/h/80"> -->
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <el-dropdown-item>
            <router-link class="inlineBlock" to="/">首页</router-link>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      const userInfo = {
        uid: this.$store.getters.uid
      }
      console.log('登出操作')
      this.$store.dispatch('LogOut', userInfo).then((res) => {
        console.log('清除缓存')
        this.$router.push({ path: '/login' })
      })
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .logo-hangyeyun {
    position: absolute;
    right: 100px;
    height: 30px;
    margin-top: 10px;
    img {
      height: inherit;
      cursor: pointer;
    }
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
