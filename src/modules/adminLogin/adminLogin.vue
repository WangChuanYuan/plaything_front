<template>
  <!--背景图-->
  <div class = "note" :style = "note">


    <!--login框，表单+tab标签页的组合-->
    <div class = "loginFrame">

      <!--表单组件放在外面，标签栏在里面-->
      <el-form ref = "AccountForm" :model = "AccountForm"   rules = "rules"  class = "demo-ruleForm login-container">

        <div class="title">
          <el-form-item style="width: 100%; text-align: center;">
            <span style=" font-size: 40px">管理员登录</span>
          </el-form-item>
        </div>

        <div class = "formGroup">
          <el-form-item  label = "账号" prop = "user" >
            <el-input type = "text"  auto-complete = "off" placeholder = "请输入管理员账号" class = "form-control" ></el-input></el-form-item>
          <el-form-item label = "密码" prop = "password" class = "form-inline">
            <el-input type = "password" auto-complete = "off" placeholder = "请输入密码" class = "form-control" ></el-input></el-form-item>
        </div>

        <div class = "formButton">
          <el-form-item style = "width:100%;">
            <el-button type = "primary" style = "width:100%;" @click =  "login('AccountForm')">登录</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>

</template>

<script>
  export default {
    name: '登录',
    data() {
      return {
        logining : false,
        note: {
          position:"absolute",
          top:"0px",
          left:"0px",
          width: "100%",
          height:"100%",
          backgroundImage: "url(" + require("../../assets/adminLoginBackground.jpeg") + ")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",


        },
        AccountForm : {
          username:'',
          password:'',
        },
        rules: {
          username :[
            {required: true, message: '请输入账号',trigger: 'blur'},
            //{ validator: validaePass }
          ],
          password: [
            {required: true,message: '请输入密码', trigger: 'blur'},
            //{ validator: validaePass2 }
          ]
        },
        checked: false

      };


    },
    methods:{
      login(formName){
        console.log(this.AccountForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let model = this.registerForm;
            let form = new FormData();
            form.append("userName", model.username);
            form.append("password", model.password);
            $.ajax({
              url: '/api/login',
              processData: false,
              cache: false,
              contentType: false,
              dataType: 'json',
              type: 'post',
              data: form,
              success: function (data) {
                if (data == 'SUCCESS') {
                  window.location.href = '/';

                }
                else {
                  this.$message.error("用户名或密码错误");
                }
              },
              error: function (error) {
                this.$message.error("错误");
              }
            })
          } else {
            this.$message.error('填写信息错误，请检查');
            return false;
          }
        });

      },
    }
  }</script>

<style>

  .login-container {

    -webkit-border-radius: 5px;
    border-radius: 15px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgba(255,255,255,0.7)

  ;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  }
  label{
    width:70px;
    text-align:left;


  }

  .form-control{
    width:270px;
    flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;

  }


</style>

