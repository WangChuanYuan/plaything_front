<template>
  <div>
    <el-container>
<!--      <el-header>
        <Navigation></Navigation>
      </el-header>-->

      <el-row>
        <el-col :span="1" style="margin-right: 15%">
          <el-menu default-active="1" class="left-director" @open="handleOpen" @close="handleClose" @select="handleSelect">
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

        <el-col :span="10">
          <el-card  class="CARD" v-for="(item,index) in addCard"  v-if="item.len=='1'" :body-style="{ padding: '0px' }">
            <div v-if="item.fileType=='PIC'">
              <img v-if="item.len=='1'" :src="item.src" class="image" height="250px">
            </div>
            <div v-else>
              <video v-if="item.len=='1'" :src="item.video" controls="controls" style="display: block;width: 100%" height="250px">您的浏览器不支持video</video>
            </div>
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
  import ajaxHelper from '../../assets/ajaxHelper';
  import $ from 'jquery';
  export default {
    name: "c",
    components: {Footer, Navigation},
    data() {
      return {
        addCard: [{
          title: "",
          src: '',
          len: '0',
          id:'testID',
          fileType:'',
          video:null,
          type:'',
        }],
      };
    },
    methods: {
      checkPost(id){
        window.location.href = '/post.html?postID='+id+'&mode=check';
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      clearCards(){
        //清除我的笔记卡片
        let cards=this.addCard;
        cards.forEach((card,index)=>{
          if(card.len==="1") {
            let nextCard = cards[index + 1] || cards[index - 1];
          }
        });
        this.addCard=cards.filter(card=>card.len!=='1');
      },

      loadUncheck(){
        var postList;
        ajaxHelper.receive_all_posts("WAITING").then((data) => {
          postList=data;
          //alert(postList.length)
          for (var i=0;i<postList.length;i++){
            if(postList[i].postType=='PIC'){
              //console.log(postList[i])
              if(postList[i].type=='SELL'){
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].cid,fileType:postList[i].postType});
              }
              else{
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].messageId,fileType:postList[i].postType});
              }
            }
            else{
              if(postList[i].type=='SELL'){
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].cid,fileType: postList[i].postType});
              }
              else{
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].messageId,fileType: postList[i].postType});
              }
            }
          }
        });
        /*$.ajax({
          url:'/api/receive_all_posts',
          dataType: 'json',
          type: 'post',
          data:{"status":"WAITING"},
          success:function (data) {
            var postList ;
            postList=data;
            //alert(postList[0].postType)
            for (var i=0;i<postList.length;i++){
              if(postList[i].postType=='PIC'){
                //console.log(postList[i])
                if(postList[i].type=='SELL'){
                  this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].cid,fileType:postList[i].postType});
                }
                else{
                  this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].messageId,fileType:postList[i].postType});
                }
              }
              else{
                if(postList[i].type=='SELL'){
                  this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].cid,fileType: postList[i].postType});
                }
                else{
                  this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].messageId,fileType: postList[i].postType});
                }
              }
            }
          },
          error:function (error) {
            alert(error)
          }
        })*/
        //alert(postList.length)
        //alert("yyy")
        //以下注释为demo
       /* var srcList = new Array();
        srcList[0] = require('../../assets/5.mp4');
        srcList[1] = require('../../assets/5.mp4');
        srcList[2] = require('../../assets/5.mp4');
        srcList[3] = require('../../assets/5.mp4');
        srcList[4] = require('../../assets/5.mp4');
        srcList[5] = require('../../assets/5.mp4');
        srcList[6] = require('../../assets/5.mp4');
        srcList[7] = require('../../assets/5.mp4');
        srcList[8] = require('../../assets/5.mp4');
        var titleList = new Array();
        titleList[0] = "自然1";
        titleList[1] = "自然2";
        titleList[2] = "自然3";
        titleList[3] = "自然3";
        titleList[4] = "自然3";
        titleList[5] = "自然3";
        titleList[6] = "自然3";
        titleList[7] = "自然3";
        titleList[8] = "自然3";
        for (var i = 0; i < 9; i++) {
          this.addCard.tilte = titleList[i];
          this.addCard.video = srcList[i];
          this.addCard.push({type:'VIDEO',title: titleList[i], video: srcList[i], len: '1',id:"TESTid",fileType:'VIDEO'});
        }*/
      },

      loadPass(){
        var postList;
        ajaxHelper.receive_all_posts("PERMITTED").then((data) => {
          postList=data;
          //alert(postList.length)
          for (var i=0;i<postList.length;i++){
            if(postList[i].postType=='PIC'){
              //console.log(postList[i])
              if(postList[i].type=='SELL'){
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].cid,fileType:postList[i].postType});
              }
              else{
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].messageId,fileType:postList[i].postType});
              }
            }
            else{
              if(postList[i].type=='SELL'){
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].cid,fileType: postList[i].postType});
              }
              else{
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].messageId,fileType: postList[i].postType});
              }
            }
          }
        });
      },

      loadUnpass(){
        var postList;
        ajaxHelper.receive_all_posts("DENIED").then((data) => {
          postList=data;
          //alert(postList.length)
          for (var i=0;i<postList.length;i++){
            if(postList[i].postType=='PIC'){
              //console.log(postList[i])
              if(postList[i].type=='SELL'){
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].cid,fileType:postList[i].postType});
              }
              else{
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].messageId,fileType:postList[i].postType});
              }
            }
            else{
              if(postList[i].type=='SELL'){
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].cid,fileType: postList[i].postType});
              }
              else{
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].messageId,fileType: postList[i].postType});
              }
            }
          }
        });
      },

      loadHighlight(){
        var postList;
        ajaxHelper.receive_all_posts("RECOMMENDED").then((data) => {
          postList=data;
          //alert(postList.length)
          for (var i=0;i<postList.length;i++){
            if(postList[i].postType=='PIC'){
              //console.log(postList[i])
              if(postList[i].type=='SELL'){
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].cid,fileType:postList[i].postType});
              }
              else{
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].messageId,fileType:postList[i].postType});
              }
            }
            else{
              if(postList[i].type=='SELL'){
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].cid,fileType: postList[i].postType});
              }
              else{
                this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].messageId,fileType: postList[i].postType});
              }
            }
          }
        });
      },

      handleSelect(key, keyPath) {

        this.clearCards();

        switch (key) {

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

/*     ReadArticle(id){
        window.location.href = '/post.html?postID='+id;
      },*/
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

  .button {
    padding: 0;
    float: right;
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
