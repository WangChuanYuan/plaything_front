<template>
  <div>
    <el-container>
      <el-header>
        <Navigation></Navigation>
      </el-header>

      <el-row>
        <el-col :span="1" style="margin-right: 15%">
          <el-menu default-active="1" class="left-director" @open="handleOpen" @close="handleClose" :collapse="isCollapse" @select="handleSelect">
            <el-menu-item index="1" style="top: 10px">
              <i class="el-icon-menu"></i>
              <span slot="title" style="font-size: 10px">管理员信息</span>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title" style="font-size: 10px">全部笔记</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">待审批</el-menu-item>
                <el-menu-item index="2-2">审核通过</el-menu-item>
                <el-menu-item index="2-3">审核未通过</el-menu-item>
                <el-menu-item index="2-4">加精</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

          </el-menu>
        </el-col >
        <el-col :span="4">
          <el-card class="box-card" v-for="(item,index) in perInfo" v-if="item.x=='1'" body-style="padding:0px">
            <div >
              <img  :src="displayURL" class="avatar" style="margin-left: 40%">
            </div>
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
            <div class="bottom clearfix">
              <el-button type="text" class="button" style="margin-left: 80%;font-size: 20px" @click="editPerInfo(item.username,item.address,item.email,item.phone,item.tags,displayURL)">修改信息</el-button>
            </div>
          </el-card>
        </el-col>

        <el-col :span="2" style="margin-left: 3.5%">
          <el-card class="edit-card" v-for="(item,index) in editInfo" v-if="item.x=='1'" style="margin-left: 10%">


            <div>
              <el-form ref="registerForm" :model="registerForm" :rules="rules" :label-position="labelPosition">

                <el-form-item  style="margin-left: 35%; overflow: hidden">
                  <!--上传头像，此处只是添加，最后注册时上传至服务器 multiple 表示是否支持多选文件-->
                  <el-upload class="avatar-uploader" action="mock" :multiple="false" :auto-upload="false"
                             :on-change="addDisplay" :accept="'image/*'" style="overflow: hidden">
                    <img :src=displayURL class="avatar" style="overflow: hidden" >
                  </el-upload>
                </el-form-item>

                <div>
                  <label style="font-size: 20px; margin-left: 15%">用户名：{{registerForm.userName}}</label>
                  <br>
                  <br>
                </div>

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
              </el-form>
            </div>
            <div style="margin-left: 70%">

              <el-button type="text"  @click="confirmEdit('registerForm')">确认</el-button>
              <el-button type="text"  @click="handleSelect('1',0)">取消</el-button>
            </div>
          </el-card>
        </el-col>

        <el-col :span="10">
          <el-card  class="CARD" v-for="(item,index) in addCard"  v-if="item.len=='1'" :body-style="{ padding: '0px' }">
            <img v-if="item.len=='1'" :src="item.src" class="image">
            <div v-if="item.len=='1'" style="padding: 20px;">
              <span v-if="item.len=='1'">{{item.title}}</span>
              <div style="top: initial">
                <el-button v-if="item.len=='1'"  type="text" class="button" @click="checkPost(item.id)" style="font-size: large">审核文章</el-button>
              </div>
            </div>
          </el-card>
        </el-col>

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
  import ajaxHelper from "../../assets/ajaxHelper";
  import util from '../../assets/util.js'
  import $ from 'jquery';
  export default {
    name: "personalInfo",
    components: {Footer, Navigation},
    data() {
      return {
        labelPosition: 'left',
        isCollapse: false,
        displayURL: require('../../assets/cc.jpg'),
        perInfo: [{
          username: "",
          address: '',
          email: '',
          phone:'',
          tags:[],
          head:require('../../assets/cc.jpg'),
          x:'0',
        }],
        editInfo:[{
          x:'0',
        }],
        addCard: [{
          title: "123",
          src: require('../../assets/banner1.jpg'),
          len: '0',
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
          uid: "123",
          username: "Nori",
          address: 'China',
          email: '123@ssss.com',
          phone:'123456789',
          tags:"",
          head:require('../../assets/cc.jpg'),
          avatar:null,
        },
      };
    },
    created: function(){
      this.init();
    },
    methods: {
      checkPost(id){
        window.location.href = '/post.html?postID='+id+'&mode=check';
      },
      init(){
        ajaxHelper.getCurrentUser().then((data) => {
          var usr = data;
          if (usr) {
            this.personalInfomation.username=usr.userName;
            this.personalInfomation.address=usr.location;
            this.personalInfomation.email=usr.mail;
            this.personalInfomation.phone=usr.phone;
            this.personalInfomation.uid=usr.id;
            this.displayURL=usr.display;
          }
        })
        this.perInfo.push({username:this.personalInfomation.username,address:this.personalInfomation.address,email:this.personalInfomation.email,phone:this.personalInfomation.phone,tags:this.personalInfomation.tags,x:'1',head:this.displayURL});
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
            form.append("avatar", model.avatar);
            for (var i = 0; i < model.tags.length; i++)
              form.append("tags", model.tags[i]);
            $.ajax({
              url: '/api/editPerInfo',
              processData: false,
              cache: false,
              contentType: false,
              dataType: 'json',
              type: 'post',
              data: form,
              success: function (data) {
                if (data != 'FAILURE') {
                  this.$alert('修改成功', {
                    confirmButtonText: '确定',
                    callback: action => {
                      sessionStorage.setItem('user', JSON.stringify(this.registerForm.userName));
                      window.location.href = '/c.html';
                    }
                  });
                }
                else {
                  this.$message.error("修改失败");
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

      addDisplay(file, fileList) {
        this.displayURL=file.url;
        this.personalInfomation.head = file.url;
        this.personalInfomation.avatar = file.raw;
      },

      clearCards(){
        //清除个人信息卡片
        let cards=this.perInfo;
        cards.forEach((card,index)=>{
          if(card.x==="1") {
            let nextCard = cards[index + 1] || cards[index - 1];
          }
        });
        this.perInfo=cards.filter(card=>card.x!=='1');

        //清除修改个人信息卡片
        let cards2=this.editInfo;
        cards2.forEach((card,index)=>{
          if(card.x==="1") {
            let nextCard = cards2[index + 1] || cards2[index - 1];
          }
        });
        this.editInfo=cards.filter(card=>card.x!=='1');

        //清除我的笔记卡片
        let cards3=this.addCard;
        cards3.forEach((card,index)=>{

          let nextCard = cards3[index + 1] || cards3[index - 1];

        });
        this.addCard=cards3.filter(card=>card.x!=='1');
      },
      editPerInfo(username,address,email,phone,tags,head){
        this.clearCards();
        this.registerForm.userName=username;
        this.registerForm.location=address;
        this.registerForm.mail=email;
        this.registerForm.phone=phone;
        this.registerForm.head=head;
        for (var i = 0; i < tags.length; i++)
          this.registerForm.tags.push(tags[i]);
        this.editInfo.push({x:'1'})
      },

      loadUncheck(){
        var postList=new Array();
        ajaxHelper.getPosts({"state":"uncheck"}).then((data) => {
          postList=data;
        });
        for (var i=0;i<postList.length;i++){
          this.addCard.push({title: postList[i].title, src: postList[i].covers[0], len: '1',id:postList[i].id});
        }
        //以下注释为demo
                  var srcList = new Array();
                  srcList[0] = require('../../assets/banner1.jpg');
                  srcList[1] = require('../../assets/banner2.jpg');
                  srcList[2] = require('../../assets/banner3.jpg');
                  var titleList = new Array();
                  titleList[0] = "未审批1";
                  titleList[1] = "未审批2";
                  titleList[2] = "未审批3";
                  for (var i = 0; i < 3; i++) {
                    this.addCard.push({title: titleList[i], src: srcList[i], len: '1',id:"testID"});
                  }
      },

      loadPass(){
        var postList=new Array();
        ajaxHelper.getPosts({"state":"pass"}).then((data) => {
          postList=data;
        });
        for (var i=0;i<postList.length;i++){
          this.addCard.push({title: postList[i].title, src: postList[i].covers[0], len: '1',id:postList[i].id});
        }
      },

      loadUnpass(){
        var postList=new Array();
        ajaxHelper.getPosts({"state":"fail"}).then((data) => {
          postList=data;
        });
        for (var i=0;i<postList.length;i++){
          this.addCard.push({title: postList[i].title, src: postList[i].covers[0], len: '1',id:postList[i].id});
        }
      },

      loadHighlight(){
        var postList=new Array();
        ajaxHelper.getPosts({"state":"recommend"}).then((data) => {
          postList=data;
        });
        for (var i=0;i<postList.length;i++){
          this.addCard.push({title: postList[i].title, src: postList[i].covers[0], len: '1',id:postList[i].id});
        }
      },

      handleSelect(key, keyPath) {

        this.clearCards();
        switch (key) {
          case "1":
            this.perInfo.push({username:this.personalInfomation.username,address:this.personalInfomation.address,email:this.personalInfomation.email,phone:this.personalInfomation.phone,tags:this.personalInfomation.tags,x:'1'});
            break;

          case "2-1":
            this.loadUncheck();
            break;

          case "2-2":
            this.loadPass();
            break;

          case "2-3":
            this.loadUnpass();
            break;

          case "2-4":
            this.loadHighlight();
            break;
        }
      },

      ReadArticle(id){
        window.location.href = '/post.html?postID='+id;
      },
    }
  }
</script>

<style scoped>
  .image {
    width: 100%;
    display: block;
  }


  .left-director:not(.el-menu--collapse) {
    margin-left: 10%;
    width: 140px;
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

  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 120px;
    display: block;
    margin-left: 40%;
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

  .avatar-uploader {
    height: 120px;
    border-radius: 120px;
    cursor: pointer;
    overflow: hidden;
  }

  .CARD{
    width: 880px;
  }

  #tagCloud {
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
  }
</style>
