<template>
  <el-container>
    <el-header>
      <Navigation></Navigation>
    </el-header>

    <el-container>
      <el-aside width="200px" style="height: max-content">
        <el-menu @select="handleSelect" style="height: complex">
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>我的笔记</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">待审核</el-menu-item>
              <el-menu-item index="2-2">通过</el-menu-item>
              <el-menu-item index="2-3">不通过</el-menu-item>
              <el-menu-item index="2-4">加精</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <el-col>
          <el-card class="box-card" v-for="(item,index) in administratorInfo"  v-if="item.len=='1'">
            <div >
              <img  :src="displayURL" class="avatar">
            </div>
            <div  class="text item" >
              {{'用户名：    ' + item.username }}
            </div>
            <div  class="text item"  >
              {{'地址：        ' + item.address }}
            </div>
            <div  class="text item"  >
              {{'邮箱：        ' + item.email }}
            </div>
            <div  class="text item"  >
              {{'联系方式： ' + item.phone }}
            </div>
          </el-card>
        </el-col>

          <el-col :span="2">
            <div class="CardContainer">
              <el-col class="CARDS" v-for="(item,index) in addCard"  v-if="item.len=='1'">
                <el-row :span="4" v-if="item.len=='1'">
                  <el-card  v-if="item.len=='1'" :body-style="{ padding: '0px'}" shadow="hover">
                    <img v-if="item.len=='1'" :src="item.src" class="image">
                    <div v-if="item.len=='1'" style="padding: 0px;">
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <div v-if="item.len=='1'" class="bottom clearfix" style="height: 10px">
                        <span v-if="item.len=='1'"  >{{item.title}}</span>
                        <el-button v-if="item.len=='1'" style="right: initial" type="warning" icon="el-icon-star-off" circle size="medium" class="button" @click="ReadArticle(item.id)">
                        </el-button>
                      </div>
                    </div>
                  </el-card>
                </el-row>
              </el-col>
            </div>
          </el-col>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
    import Navigation from "../../components/Navigation";
    export default {
        name: "c",
      components: {Navigation},
      data(){
        return{
          displayURL: require('../../assets/defaultDisplay.jpg'),
          administratorInfo:{
            uid:"007",
            username:"中国网管",
            address:"behind you",
            email:"007@superman.cn",
            phone:"4008123123",
            head:"",
            //avatar:null,
            len:'1'
          },
          addCard: [{
            title: "",
            src: '',
            len: '0',
            id:'testID'
          }],
          cardIndex:0
        }
      },
      methods:{
          clearCards(){

          },
          showAdminister(){

          },
          loadUnchecked(){
            var srcList = new Array();
            srcList[0] = require('../../assets/banner1.jpg');
            srcList[1] = require('../../assets/banner2.jpg');
            srcList[2] = require('../../assets/banner3.jpg');
            var titleList = new Array();
            titleList[0] = "未审批1";
            titleList[1] = "未审批2";
            titleList[2] = "未审批3";
            for (var i = 0; i < 3; i++) {
              this.addCard.push({title: titleList[i], src: srcList[i], len: '1', id: "testID"});
            }
          },
          loadPassed(){

          },
          loadUnpass(){

          },
          loadHighlight(){

          },
          handleSelect(key){

            switch (key) {
              case "1":
                alert("管理员")
                this.perInfo.push({username:this.personalInfomation.username,address:this.personalInfomation.address,email:this.personalInfomation.email,phone:this.personalInfomation.phone,tags:this.personalInfomation.tags,x:'1'});
                break;
              case "2-1":
                alert("待审核")
                this.loadUnchecked()
                break;
              case "2-2":
                alert("审核通过")
                this.loadPassed()
                break;
              case "2-3":
                alert("审核未通过")
                this.loadUnpass()
                break;
              case "2-4":
                alert("加精")
                this.loadHighlight()
                break;
            }
          }
      }
    }
</script>

<style scoped>
  .box-card {
    margin-left: 50%;
    width: 880px;
  }

  .CardContainer{
    width: 200px;
  }
  .CARDS{
    width: 60px;
    margin-left:10px;
  }
  .bottom {
    margin-top: 1px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 30%;
    display: block;
  }

</style>
