<template>
  <div>
    <el-menu background-color="#ffffff" mode="horizontal" active-text-color="#000000"
             @select="handleSelect">
      <span id="logo">玩意儿</span>
      <el-menu-item index="1" style="margin-left: 150px;" class="largeFont">首页</el-menu-item>
      <el-menu-item index="2" style="margin-left: 50px;" class="largeFont">社区</el-menu-item>
      <el-menu-item index="3" style="margin-left: 50px;" class="largeFont">一期一会</el-menu-item>
      <el-menu-item index="4" style="margin-left: 50px;" class="largeFont">杂货</el-menu-item>
      <div class="login" v-if="hasLogin">
        <el-submenu index="5">
          <template slot="title">
            <img id="usrImg" :src="display"/>
          </template>
          <el-menu-item index="5-1" class="largeFont">空间</el-menu-item>
          <el-menu-item index="5-2" class="largeFont">分享</el-menu-item>
          <el-menu-item index="5-3" class="largeFont" @click="messageVisible = true">
            消息
            <el-badge value="new" :hidden="allChecked"></el-badge>
          </el-menu-item>
          <el-menu-item index="5-4" class="largeFont">登出</el-menu-item>
        </el-submenu>
      </div>
      <div class="login" v-else>
        <el-submenu index="6">
          <el-menu-item index="6-1" style="font-size: large">登录</el-menu-item>
          <el-menu-item index="6-2" style="font-size: large">注册</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
    <el-dialog :visible.sync="messageVisible" title="玩意儿聊天室">
      <Message :usr-id="usrId"></Message>
    </el-dialog>
    <el-dialog :visible.sync="loginVisible" title="登录" width="25%">
      <Login></Login>
    </el-dialog>
  </div>
</template>

<script>
  import Message from "./Message";
  import ajaxHelper from '../assets/ajaxHelper';
  import Login from "./Login";

  export default {
    name: "Navigation",
    components: {Login, Message},
    data() {
      return {
        usrId: null,
        timer: null,
        hasLogin: false,
        allChecked: true,
        messageVisible: false,
        loginVisible: false,
        display: require('../assets/defaultDisplay.jpg')
      };
    },
    mounted: function () {
      this.init();
      this.timer = setInterval(this.hasNewMessage, 1000);
    },
    beforeDestroy: function () {
      clearInterval(this.timer);
    },
    methods: {
      init() {
        // $.ajax({
        //   url: '/api/current_user',
        //   dataType: 'json',
        //   type: 'get',
        //   scriptCharset: 'utf-8',
        //   success: function (data) {
        //     var usr = data;
        //     if (usr) {
        //       this.usrId = usr.id;
        //       this.hasLogin = true;
        //       this.display = (usr.display) ? usr.display : require('../assets/defaultDisplay.jpg');
        //     }
        //   },
        //   error: function (error) {
        //   }
        // });
        ajaxHelper.getCurrentUser().then((data) => {
          var usr = data;
          if (usr) {
            this.usrId = usr.id;
            this.hasLogin = true;
            this.display = (usr.display) ? usr.display : require('../assets/defaultDisplay.jpg');
          }
        })
      },
      //当前登录的用户是否有未读消息
      hasNewMessage() {
        if (this.hasLogin) {
        //   $.ajax({
        //     url: '/api/hasAllMessageChecked',
        //     dataType: 'json',
        //     type: 'get',
        //     scriptCharset: 'utf-8',
        //     success: function (data) {
        //       this.allChecked = data;
        //     },
        //     error: function () {
        //     }
        //   })
          ajaxHelper.hasAllMessageChecked().then((data) => {
            this.allChecked = data;
          })
        }
      },
      handleSelect(key, keyPath) {
        switch (key) {
          case "1":
            window.location.href = "./";
            break;
          case "2":
            window.location.href = "./community.html";
            break;
          case "3":
            window.location.href = "./recommendedArticle.html";
            break;
          case "4":
            window.location.href = "./mall.html";
            break;
          case "5-1":
            window.location.href = "./personalInfo.html";
            break;
          case "5-2":
            window.location.href = "./edit-post.html";
            break;
          case "5-4":
            this.logout();
            break;
          case "6-1":
            this.loginVisible = true;
            break;
          case "6-2":
            window.location.href = "./register.html";
            break;
        }
      },
      logout() {
        this.$confirm('确认退出?', '提示', {}).then(() => {
          // $.ajax({
          //   url: '/api/logout',
          //   type: 'post',
          //   scriptCharset: 'utf-8',
          //   dataType: 'json',
          //   success: function (data) {
          //     this.usrId = null;
          //     this.hasLogin = false;
          //   },
          //   error: function (error) {
          //   }
          // });
          ajaxHelper.logout().then(() => {
            this.usrId = null;
            this.hasLogin = false;
          })
          window.location.href = './';
        }).catch(() => {
        });
      }
    }
  }
</script>

<style scoped>
  #logo {
    float: left;
    font-size: 50px;
    font-family: FZShuTi;
    margin-left: 150px;
    margin-top: 3px;
    color: #ff1627;
  }

  .login {
    float: right;
  }

  #usrImg {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }

  .largeFont {
    font-size: large;
  }
</style>
