<template>
  <div>
    <el-container>
      <el-header>
        <Navigation></Navigation>
      </el-header>
      <el-form ref="registerForm" :model="registerForm" :rules="rules">
        <el-steps :active="step" simple>
          <el-step icon="el-icon-edit" title="填写个人信息"></el-step>
          <el-step icon="el-icon-menu" title="选择适合你的个性标签"></el-step>
        </el-steps>
        <!--第一步-->
        <div v-show="step == 0">
          <el-steps class="verticalSteps" :space="170" direction="vertical">
            <el-step icon="el-icon-upload" status="process" title="步骤一" description="上传用户头像，可选择默认"></el-step>
            <el-step icon="el-icon-document" status="process" title="步骤二" description="完善个人信息"></el-step>
            <el-step icon="el-icon-star-off" status="process" title="步骤三" description="输入密码"></el-step>
            <el-step icon="el-icon-star-on" status="process" title="步骤四" description="确认密码"></el-step>
          </el-steps>
          <el-form-item id="uploader">
            <!--上传头像，此处只是添加，最后注册时上传至服务器 multiple 表示是否支持多选文件-->
            <el-upload class="avatar-uploader" action="mock" :multiple="false" :auto-upload="false"
                       :on-change="addDisplay">
              <img v-if="displayURL" :src="displayURL" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-table"></i>
            </el-upload>
          </el-form-item>
          <div id="info">
            <el-form-item prop="userName">
              <label class="necessary">*</label>
              <label>用户名</label>
              <el-input v-model="registerForm.userName" class="input"></el-input>
            </el-form-item>
            <el-form-item prop="location">
              <label style="padding-left: 1.8em">地址</label>
              <el-input v-model="registerForm.location" class="input"></el-input>
            </el-form-item>
            <el-form-item prop="mail">
              <label style="padding-left: 1.8em">邮箱</label>
              <el-input v-model="registerForm.mail" class="input"></el-input>
            </el-form-item>
            <el-form-item prop="phone">
              <label>联系方式</label>
              <el-input v-model="registerForm.phone" class="input"></el-input>
            </el-form-item>
          </div>
          <div id="password">
            <el-form-item prop="password">
              <label style="padding-left: 1.5em" class="necessary">*</label>
              <label>密码</label>
              <el-input type="password" v-model="registerForm.password" class="input"></el-input>
            </el-form-item>
            <el-form-item prop="checkPassword">
              <label class="necessary">*</label>
              <label>确认密码</label>
              <el-input type="password" v-model="registerForm.checkPassword" class="input"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-button class="rightButton" circle icon="el-icon-arrow-right" @click="next">下一项</el-button>
          </div>
        </div>
        <!--第二步-->
        <div v-show="step == 1">
          <tag-cloud id="tagCloud" :config="option" :data="hotTag" @clickTag="clickTagItem"></tag-cloud>
          <div class="tag">
            <p>您为自己选择的标签有：</p>
            <el-tag style="margin: 5px;" size="medium" :key="tag" v-for="tag in registerForm.tags" closable
                    :disable-transitions=false
                    @close="removeTag(tag)">
              {{tag}}
            </el-tag>
          </div>
          <div>
            <el-button class="leftButton" circle icon="el-icon-arrow-left" @click="last">上一项</el-button>
            <el-button class="rightButton" circle icon="el-icon-check" @click="register('registerForm')">确定</el-button>
          </div>
        </div>
      </el-form>
      <Footer id="specialFooter"></Footer>
    </el-container>
  </div>
</template>

<script>
  import Navigation from "../../components/Navigation";
  import Footer from "../../components/Footer";
  import util from  '../../assets/util.js'
  import $ from 'jquery';

  export default {
    name: "register",
    components: {Footer, Navigation},
    data: function () {
      var passwordRule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerForm.checkPassword !== '') {
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };
      var checkPasswordRule = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          userName: "",
          password: "",
          checkPassword: "",
          avatar: null,
          location: "",
          mail: "",
          phone: "",
          tags: []
        },
        rules: {
          userName: [{required: true, message: "请输入用户名", trigger: 'blur'}],
          mail: [{type: 'email', message: '请正确输入邮箱地址', trigger: 'blur'}],
          password: [{required: true, validator: passwordRule, trigger: 'blur'}],
          checkPassword: [{required: true, validator: checkPasswordRule, trigger: 'blur'}]
        },
        displayURL: require('../../assets/defaultDisplay.jpg'),
        hotTag: util.tags,
        option: {
          radius: 200,
          maxFont: 32
        },
        step: 0,
      }
    },
    methods: {
      register(formName) {
        console.log(this.registerForm);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            $.ajax({
              url: '/api/register',
              type: 'post',
              data: this.registerForm,
              success: function (data) {
                if (data == 'SUCCESS') {
                  this.$message.success('注册成功');
                  sessionStorage.setItem('user', JSON.stringify(this.registerForm.userName));
                  window.location.href = '/';
                }
                else {
                  this.$message.error("用户名已被注册")
                }
              },
              error: function (error) {
                this.$message.error("错误")
              }
            })
          } else {
            this.$message.error('填写信息错误，请检查');
            return false;
          }
        });
      },
      addDisplay(file, fileList) {
        this.displayURL = file.url;
        this.registerForm.avatar = file.raw;
      },
      clickTagItem: function (tag) {
        if (this.registerForm.tags.indexOf(tag.name) < 0)
          this.registerForm.tags.push(tag.name);
      },
      removeTag(tag) {
        this.registerForm.tags.splice(this.registerForm.tags.indexOf(tag), 1);
      },
      next() {
        if (this.step++ > 1)
          this.step = 1;
      },
      last() {
        if (this.step-- < 0)
          this.step = 0;
      }
    }
  }
</script>

<style scoped>
  #uploader {
    left: 40%;
    top: 150px;
    position: absolute;
  }

  #info {
    left: 35%;
    top: 300px;
    position: absolute;
  }

  #password {
    left: 35%;
    top: 580px;
    position: absolute;
  }

  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    width: 120px;
    height: 120px;
    border-radius: 120px;
    cursor: pointer;
    overflow: hidden;
  }

  .avatar-uploader:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-table {
    font-size: 20px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 120px;
    display: block;
  }

  .necessary {
    color: red;
  }

  .input {
    width: 270px;
  }

  .verticalSteps {
    margin-left: 320px;
    margin-top: 40px;
  }

  #tagCloud {
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
  }

  .tag {
    position: absolute;
    left: 400px;
    top: 600px;
    font-weight: bold;
    color: #565656;
    font-size: 18px;
  }

  .leftButton {
    position: absolute;
    left: 300px;
    top: 730px;
  }

  .rightButton {
    position: absolute;
    right: 300px;
    top: 730px;
  }

  /*标签云有上下浮动，未能找到解决办法，只能固定位置*/
  #specialFooter {
    position: absolute;
    width: 100%;
    top: 770px;
    bottom: 0px;
    text-align: center;
  }
</style>
