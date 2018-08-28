<template>
  <div>
    <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="Form">
      <el-form-item>
        <h2>Casual用户登录</h2>
      </el-form-item>

      <el-form-item prop="username">
        <label style="color: red">*</label>
        <label>用户名: </label>
        <el-input v-model="loginForm.username" name="username"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <label style="color: red">　*</label>
        <label>密码: </label>
        <el-input type="password" v-model="loginForm.password" name="password"></el-input>
      </el-form-item>

      <el-checkbox v-model="loginForm.checked" style="margin-left: 23%;">记住密码</el-checkbox>

      <el-form-item>
        <p class="change_link" style="margin-left: 27%;margin-top: 0;">
          还未拥有账号？点击这里
          <a href="#" @click="toRegister" class="to_register">注册</a>
        </p>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')" style="margin-left: 17%;" :loading="loading">登录
        </el-button>
        <el-button @click="resetForm('loginForm')" style="margin-left: 10%">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import ajaxHelper from '../assets/ajaxHelper.js';

  export default {
    name: "Login",
    data() {
      return {
        loginForm: {
          username: null,
          password: null
        }
      }
    },
    methods: {
      login() {
        ajaxHelper.login({"username": this.loginForm.username, "password": this.loginForm.password}).then((data)=> {
          if(data == 'SUCCESS'){

          } else if(data == 'INEXISTENCE'){

          } else{

          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
