<template>
    <div class="login-page">
        <navigation-bar :pageName="'登录'" @onLeftClick="onBackClick"></navigation-bar>
        <div class="login-page-content">
            <div class="input-container">
                <input v-model="username" placeholder="用户名" type="text">
            </div>
            <div class="input-container">
                <input v-model="password" placeholder="密码" type="password">
            </div>
            <div class="login-page-content-login page-commit" @click="onLoginClick">登录</div>
            <a class="login-page-content-register" @click="onToRegisterClick">注册新用户</a>
        </div>
    </div>
</template>

<script>
import md5 from '@js/md5.min.js'
import NavigationBar from '@c/currency/NavigationBar'
export default {
  name: 'login',
  components: {
    NavigationBar
  },
  methods: {
    onBackClick: function () {
      this.$router.go(-1)
    },
    onLoginClick: function () {
      if (this.username.length === 0 || this.password.length === 0) {
        alert('用户名或密码未输入')
        return
      }
      // 与原生交互
      this.md5Password = md5(this.password)
      if (window.androidJSBridge) {
        this.onLoginToAndroid()
      } else {
        this.onLoginToIOS()
      }
    },
    onLoginToAndroid: function () {
      const userJson = JSON.stringify({
        username: this.username,
        password: this.md5Password
      })
      const result = window.androidJSBridge.login(userJson)
      this.onLoginCallback(result)
    },
    onLoginToIOS: function () {
      const obj = {
        username: this.username,
        password: this.md5Password
      }
      window.loginCallback = this.onLoginCallback
      window.webkit.messageHandlers.login.postMessage(obj)
    },
    onLoginCallback: function (result) {
      switch (result) {
        case '-1':
          alert('系统内部错误')
          break
        case '0':
          // 保存主动登录的用户名
          this.$store.commit('setUsername', this.username)
          this.onBackClick()
          break
        case '1':
          alert('登录用户不存在')
          break
        case '2':
          alert('用户密码错误')
          break
      }
    },
    onToRegisterClick: function () {
      this.$router.push({
        name: 'register',
        params: {
          routerType: 'push'
        }
      })
    }
  },
  data: function () {
    return {
      username: '',
      password: '',
      md5Password: ''
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.login-page {
    // 页面过渡动画，脱离标准文档流
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: white;
    &-content {
        width: 100%;
        height: 100%;
        &-login {
            margin-top: 40%;
        }
        &-register {
            font-size: $infoSize;
            color: $hintColor;
            margin-top: $marginSize;
            padding: $marginSize;
            float: right;
        }
    }
}

</style>
