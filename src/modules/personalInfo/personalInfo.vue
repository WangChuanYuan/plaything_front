<template>
  <div>
<el-container>
  <el-header>
    <Navigation></Navigation>
  </el-header>

<!--  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px; margin-left: 20%">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group>-->
  <el-row>
    <el-col :span="2" style="margin-left: 10%">
  <el-menu default-active="1" class="left-director" @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select="handleSelect">
    <el-menu-item index="1" style="top: 10px">
      <i class="el-icon-menu"></i>
      <span slot="title" style="font-size: 20px">基本信息</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title" style="font-size: 20px">我的笔记</span>
      </template>
      <el-menu-item-group>
<!--        <span slot="title">我的笔记</span>-->
        <el-menu-item index="2-1">待审批</el-menu-item>
        <el-menu-item index="2-2">审核通过</el-menu-item>
        <el-menu-item index="2-3">审核未通过</el-menu-item>
        <el-menu-item index="2-4">加精</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
    </el-col >
    <el-col :span="2">
    <el-card class="box-card" v-for="(item,index) in perInfo" v-if="item.x=='1'">
      <div  class="text item" style="margin-left: 15%"  >
        {{'用户名：    ' + item.username }}
      </div>
      <div  class="text item" style="margin-left: 15%"  >
        {{'地址：        ' + item.address }}
      </div>
      <div  class="text item" style="margin-left: 15%"  >
        {{'邮箱：        ' + item.email }}
      </div>
      <div  class="text item" style="margin-left: 15%"  >
        {{'联系方式： ' + item.phone }}
      </div>
      <div class="tag">
        <div class="text item" style="margin-left: 15%" >标签：
        <el-tag style="margin: 5px;" :key="tag" v-for="tag in item.tags" :disable-transitions=false>
          {{tag}}
        </el-tag>
        </div>
      </div>
      <div class="bottom clearfix">
        <el-button type="text" class="button" style="margin-left: 80%;" @click="editPerInfo(item.username,item.address,item.email,item.phone,item.tags)">修改信息</el-button>
      </div>
    </el-card>
    </el-col>

    <el-col :span="2" style="margin-left: 3.5%">
      <el-card class="edit-card" v-for="(item,index) in editInfo" v-if="item.x=='1'" style="margin-left: 10%">
        <div>
            <label style="font-size: 20px; margin-left: 15%">用户名：{{registerForm.userName}}</label>
          <br>
          <br>
        </div>
        <div>
        <el-form ref="registerForm" :model="registerForm" :rules="rules" :label-position="labelPosition">

        <div>
          <el-form-item prop="location">
            <label style="font-size: 20px; margin-left: 15%">地址：</label>
            <el-input v-model="registerForm.location" class="input" style="font-size: 20px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item prop="mail">
            <label style="font-size: 20px; margin-left: 15%">邮箱：</label>
            <el-input v-model="registerForm.mail" class="input" style="font-size: 20px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item prop="phone">
            <label style="font-size: 20px; margin-left: 15%">联系方式：</label>
            <el-input v-model="registerForm.phone" class="input" style="font-size: 20px"></el-input>
          </el-form-item>
        </div>
          <div >
            <tag-cloud id="tagCloud" :config="option" :data="hotTag" @clickTag="clickTagItem"></tag-cloud>
            <div class="tag">
              <p>您为自己选择的标签有：</p>
              <el-tag style="margin: 5px;" size="medium" :key="tag" v-for="tag in registerForm.tags" closable
                      :disable-transitions=false
                      @close="removeTag(tag)">
                {{tag}}
              </el-tag>
            </div>
          </div>
        </el-form>
        </div>
        <div style="margin-left: 70%">

          <el-button type="text"  @click="confirmEdit('registerForm')">确认</el-button>
          <el-button type="text"  @click="handleSelect('1',0)">取消</el-button>
        </div>
      </el-card>
    </el-col>

<!--    <el-col :span="2">
      <el-card  class="CARD" v-for="(item,index) in addCard"  v-if="item.len=='1'" :body-style="{ padding: '0px' }">
        <img v-if="item.len=='1'" :src="item.src" class="image">
        <div v-if="item.len=='1'" style="padding: 20px;">
          <span v-if="item.len=='1'">{{item.title}}</span>
          <div  style="margin-left: 75%">
            <el-button v-if="item.len=='1'" type="text" class="button" @click="ReadArticle(item.id)">阅读全文</el-button>
          </div>
        </div>
      </el-card>
    </el-col>-->
  </el-row>


  <el-footer>
    <Footer></Footer>
  </el-footer>
</el-container>
  </div>
</template>

<script>
    import Navigation from "../../components/Navigation";
    import Footer from "../../components/Footer";
    import util from '../../assets/util.js'
    import $ from 'jquery';
    export default {
        name: "personalInfo",
      components: {Footer, Navigation},
      data() {
        return {
          labelPosition: 'left',
          isCollapse: false,
          perInfo: [{
            username: "",
            address: '',
            email: '',
            phone:'',
            tags:[],
            x:'0',
          }],
          editInfo:[{
            x:'0',
          }],
          addCard: [{
            title: "123",
            src: require('../../assets/banner1.jpg'),
            len: '1',
            id:'testID'
          }],
          rules: {
            userName: [{required: true, message: "请输入用户名", trigger: 'blur'}],
            mail: [{type: 'email', message: '请正确输入邮箱地址', trigger: 'blur'}],
          },
          hotTag: util.tags,
          option: {
            radius: 200,
            maxFont: 32
          },
          step: 0,
          registerForm: {
            userName: "",
            avatar: null,
            location: "",
            mail: "",
            phone: "",
            tags: [],
            x:"0"
          },
          personalInfomation:{
            username: "",
            address: '',
            email: '',
            phone:'',
            tags:[],
          },
        };
      },
      created: function(){
        this.init();
      },
      methods: {
          init(){
            this.personalInfomation.username='胖爷';
            this.personalInfomation.address='日本';
            this.personalInfomation.email='123@a.com';
            this.personalInfomation.phone='123456789';
            this.personalInfomation.tags=["肥宅","弟弟"]
            this.perInfo.push({username:this.personalInfomation.username,address:this.personalInfomation.address,email:this.personalInfomation.email,phone:this.personalInfomation.phone,tags:this.personalInfomation.tags,x:'1'});
          },
        clickTagItem: function (tag) {
          if (this.registerForm.tags.indexOf(tag.name) < 0)
            this.registerForm.tags.push(tag.name);
        },
        removeTag(tag) {
          this.registerForm.tags.splice(this.registerForm.tags.indexOf(tag), 1);
        },
        confirmEdit(formName) {
          console.log(this.registerForm);
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let model = this.registerForm;
              let form = new FormData();
              form.append("userName", model.userName);
              form.append("location", model.location);
              form.append("mail", model.mail);
              form.append("phone", model.phone);
              for (var i = 0; i < model.tags.length; i++)
                form.append("tags", model.tags[i]);
              $.ajax({
                url: '/api/register',
                processData: false,
                cache: false,
                contentType: false,
                dataType: 'json',
                type: 'post',
                data: form,
                success: function (data) {
                  if (data != 'FAILURE') {
                    this.$alert('恭喜您注册成功，您的id为：' + data, '注册成功', {
                      confirmButtonText: '确定',
                      callback: action => {
                        sessionStorage.setItem('user', JSON.stringify(this.registerForm.userName));
                        window.location.href = '/';
                      }
                    });
                  }
                  else {
                    this.$message.error("用户名已被注册");
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
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },
        editPerInfo(username,address,email,phone,tags){
          let cards=this.perInfo;
          cards.forEach((card,index)=>{
            if(card.x==="1") {
              let nextCard = cards[index + 1] || cards[index - 1];
            }
          });
          this.perInfo=cards.filter(card=>card.x!=='1');
          this.registerForm.userName=username;
          this.registerForm.location=address;
          this.registerForm.mail=email;
          this.registerForm.phone=phone;
          for (var i = 0; i < tags.length; i++)
            this.registerForm.tags.push(tags[i]);
          this.editInfo.push({x:'1'})
        },

        handleSelect(key, keyPath) {
          let cards=this.perInfo;
          cards.forEach((card,index)=>{
            if(card.x==="1") {
              let nextCard = cards[index + 1] || cards[index - 1];
            }
          });
          this.perInfo=cards.filter(card=>card.x!=='1');

          let cards2=this.editInfo;
          cards2.forEach((card,index)=>{
            if(card.x==="1") {
              let nextCard = cards2[index + 1] || cards2[index - 1];
            }
          });
          this.editInfo=cards2.filter(card=>card.x!=='1');
          switch (key) {
            case "1":
              this.perInfo.push({username:this.personalInfomation.username,address:this.personalInfomation.address,email:this.personalInfomation.email,phone:this.personalInfomation.phone,tags:this.personalInfomation.tags,x:'1'});
              break;
          }
        }
      }
    }
</script>

<style scoped>
  .left-director:not(.el-menu--collapse) {
    margin-left: 10%;
    width: 200px;
    min-height: 400px;
    margin-right: 50%;
  }

  .input {
    width: 270px;
  }
  .text {
    font-size: 20px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    margin-left: 50%;
    width: 880px;
  }
  .edit-card{
    margin-left: 50%;
    width: 880px;
  }

  .bottom {
    margin-top: 1px;
    line-height: 12px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .button {
    padding: 0;
    float: right;
  }

  .CARD{
    margin-left:10%;
    width: 880px;
    height: 500px;
  }

  #tagCloud {
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
  }
</style>
