<template>
  <div>
    <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm">

      <el-form-item prop="username">
        <label style="color: red">*</label>
        <label>用户ID: </label>
        <el-input v-model="loginForm.username" name="username" style="width: 250px"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <label style="color: red">　*</label>
        <label>密码: </label>
        <el-input type="password" v-model="loginForm.password" name="password" style="width: 250px;"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login('loginForm')" style="margin-left: 20%">登录</el-button>
        <el-button type="plain" @click="toRegister">注册</el-button>
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
        },
        loginRules: {
          username: [
            {
              required: true,
              message: "请输入用户ID",
              trigger: "blur"
            },
            {
              validator: (rule, value, callback) => {
                if (/^[1-9]\d*$/.test(value) == false) {
                  callback(new Error("用户ID为数字"));
                } else {
                  callback();
                }
              }, trigger: 'change'
            }
          ],
          password: [
            {
              required: true,
              message: "请输入密码",
              trigger: "blur"
            }
          ]
        }
      }
    },
    methods: {
      toRegister() {
        window.location.href = './register.html';
      },
      login(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            ajaxHelper.login({
              "username": this.loginForm.username,
              "password": this.loginForm.password
            }).then((data) => {
              if (data == 'SUCCESS') {
                sessionStorage.setItem('user', JSON.stringify(this.loginForm.username));
                window.location.href = './';
              } else if (data == 'INEXISTENCE') {
                this.$message.warning("用户不存在");
              } else if (data == 'WRONG_PASS') {
                this.$message.warning("密码错误");
              } else {
                this.$message.warning("用户名或密码错误")
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
