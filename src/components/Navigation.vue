<template>
  <div>
    <el-menu :default-active="activeIndex" background-color="#ffffff" mode="horizontal" active-text-color="#000000"
             @select="handleSelect">
      <span id="logo">玩意儿</span>
      <el-menu-item index="1" style="margin-left: 150px; font-size: large">首页</el-menu-item>
      <el-menu-item index="2" style="margin-left: 50px; font-size: large">社区</el-menu-item>
      <el-menu-item index="3" style="margin-left: 50px; font-size: large">一期一会</el-menu-item>
      <el-menu-item index="4" style="margin-left: 50px; font-size: large">杂货</el-menu-item>
      <div class="login" v-if="usr">
        <el-submenu index="5">
          <template slot="title">
            <img id="usrImg" v-bind:src="imgURL"/>
          </template>
          <el-menu-item index="5-1" style="font-size: large">我的信息</el-menu-item>
          <el-menu-item index="5-2" style="font-size: large">分享</el-menu-item>
          <el-menu-item index="5-3" style="font-size: large">登出</el-menu-item>
        </el-submenu>
      </div>
      <div class="login" v-else>
        <el-submenu index="6">
          <el-menu-item index="6-1" style="font-size: large">登录</el-menu-item>
          <el-menu-item index="6-2" style="font-size: large">注册</el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "Navigation",
    data() {
      return {
        activeIndex: '1',
        usr: false,
        imgURL: require('../assets/defaultDisplay.jpg')
      };
    },
    mounted: function(){
      $.ajax({
        url:'/api/current_user',
        dataType:'json',
        type:'get',
        scriptCharset:'utf-8',
        success:function (data) {
          this.usr = data;
          this.imgURL = this.usr.display;
        },
        error:function (error) {
        }
      });
    },
    methods: {
      handleSelect(key, keyPath) {
        switch (key) {
          case "1":
            window.location.href = "./";
            this.activeIndex = "1";
            break;
          case "2":
            window.location.href = "./";
            this.activeIndex = "2";
            break;
          case "3":
            window.location.href = "./";
            this.activeIndex = "3";
            break;
          case "4":
            window.location.href = "./";
            this.activeIndex = "4";
            break;
          case "5-1":
            window.location.href = "./";
            this.activeIndex = "5-1";
            break;
          case "5-2":
            window.location.href = "./edit-post.html";
            this.activeIndex = "5-2";
            break;
          case "5-3":
            this.logout();
            break;
          case "6-1":
            window.location.href = "./";
            this.activeIndex = "6-1";
            break;
          case "6-2":
            window.location.href = "./register.html";
            this.activeIndex = "6-2";
            break;
        }
      },
      logout(){
        this.$confirm('确认退出?', '提示', {
        }).then(() => {
          $.ajax({
            url:'/api/logout',
            type:'post',
            scriptCharset: 'utf-8',
            dataType:'json',
            success:function (data) {
            },
            error:function (error) {
            }
          });
          window.location.href='/login.html';
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
</style>
