<template>
    <div class="register-page">
        <navigation-bar :pageName="'注册'" @onLeftClick="onBackClick"></navigation-bar>
        <div class="register-page-content">
            <div class="input-container">
                <input type="text" v-model="username" placeholder="用户名">
            </div>
            <div class="input-container">
                <input type="password" v-model="password" placeholder="密码">
            </div>
            <div class="input-container">
                <input type="password" v-model="confirmPassword" placeholder="确认密码">
            </div>
            <div class="register-page-content-register page-commit" @click="onRegisterClick">注册</div>
        </div>
    </div>
</template>

<script>
import NavigationBar from '@c/currency/NavigationBar'
import md5 from '@js/md5.min.js'
export default {
  name: 'register',
  components: {
    NavigationBar
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
    },
    onRegisterClick: function () {
      if (this.username.length === 0) {
        alert('请完善用户名')
        return
      }
      if (this.password.length === 0 || this.password !== this.confirmPassword) {
        alert('请完善密码')
        return
      }
      // 原生注册
      this.md5password = md5(this.password)
      if (window.androidJSBridge) {
        this.onRegisterToAndroid()
      } else {
        this.onRegisterToIOS()
      }
    },
    onRegisterToAndroid: function () {
      const json = JSON.stringify({
        username: this.username,
        password: this.md5password
      })
      const result = window.androidJSBridge.register(json)
      this.onRegisterCallBack(result)
    },
    onRegisterToIOS: function () {
      const obj = {
        username: this.username,
        password: this.md5password
      }
      window.registerCallback = this.onRegisterCallBack
      window.webkit.messageHandlers.register.postMessage(obj)
    },
    onRegisterCallBack: function (result) {
      if (result) {
        alert('注册成功')
        this.onBackClick()
      } else {
        alert('注册失败，请重试')
      }
    }
  },
  data: function () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      md5password: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.register-page {
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: white;
    &-content {
        width: 100%;
        height: 100%;
        &-register {
            margin-top: 40%;
        }
    }
}

</style>
