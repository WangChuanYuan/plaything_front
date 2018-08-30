<template>
  <div>
    <el-container>
      <el-header>
        <Navigation></Navigation>
      </el-header>

      <!--标签-->
      <el-tabs v-modle="0" class="TAG" v-model="activeName" @open="handleOpen" @close="handleClose" @tab-click="handleClick">
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="index"
        >
        </el-tab-pane>
      </el-tabs>

      <!--卡片-->
      <el-row class="CARD" v-for="(item,index) in addCard"  v-if="item.len=='1'">
        <el-col :span="16" v-if="item.len=='1'">
          <el-card  v-if="item.len=='1'" :body-style="{ padding: '0px' }">
            <div v-if="item.fileType=='PIC'">
            <img  :src="item.src" class="image">
            </div>
            <div v-else>
              <video :src="this.post.video" controls="controls" style="display: block;width: 100%" width="100%">您的浏览器不支持video</video>
            </div>
            <div v-if="item.len=='1'" style="padding: 20px;">
              <span v-if="item.len=='1'">{{item.title}}</span>
              <div v-if="item.len=='1'" class="bottom clearfix">
                <el-button v-if="item.len=='1'" type="text" class="button" @click="ReadArticle(item.id,item.type)">阅读全文</el-button>
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
    import ajaxHelper from  "../../assets/ajaxHelper";
    import $ from 'jquery';
    export default {
        name: "recommendedArticle",
        components: {Footer, Navigation},

      data() {

        return {
          editableTabsValue: '2',
          editableTabs: [{
            title: '自然',
            name: '自然',
            len: '1',
            content: ''
          }, {
            title: '经济',
            name: '经济',
            len: '1',
            content: ''
          }],
          tabIndex: 2,
          addCard: [{
            title: "",
            src: '',
            len: '0',
            id:'testID',
            fileType:'',
            video:null,
            type:'',
          }],
          cardIndex:0
        }
      },
      created: function(){
          this.init()
      },
      methods: {
          init(){
            var tag=[];
            ajaxHelper.getCurrentUser().then((data) => {
              var usr = data;
              if (usr) {
                tag=usr.tags;
              }
            });
/*            let tabs=this.editableTabs;
            tabs.forEach((tab,index)=>{
              if(tab.len==="1") {
                let nextTab = tabs[index + 1] || tabs[index - 1];
              }
            });
            this.editableTabs=tabs.filter(tab=>tab.len!=='1');*/
            for (var i=0;i<tag.length;i++){
              this.editableTabs.push({ title: tag[i],
                name: tag[i],
                content: '',
                len:'1'})
            }
            this.showCard(tag[0]);
          },

        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        },

          handleClick(tab,event){
            this.showCard(tab.label);
          },

          ReadArticle(id,type){
            window.location.href="./post.html??postID="+id+'&type='+type;
          },

          showCard(tn){
            let cards=this.addCard;
            cards.forEach((card,index)=>{
              if(card.len==="1") {
                let nextCard = cards[index + 1] || cards[index - 1];
              }
            });
            this.addCard=cards.filter(card=>card.len!=='1');
            $.ajax({
              url: '/api/showArticle',
              processData: false,
              cache: false,
              contentType: false,
              dataType: 'json',
              type: 'post',
              data: JSON.stringify({"kind":tn}),
              success: function (data) {
                for(var i=0;i<data.length;i++){
                  if(data[i].fileType==='PIC') {
                    this.addCard.push({type:data[i].type, title: data[i].tilte, src: data[i].covers[0], len: '1', id: data[i].messageId,fileType: data[i].postType});
                  }
                  else{
                    this.addCard.push({type:data[i].type, title: data[i].tilte, video:data[i].video, len: '1', id: data[i].messageId,fileType: data[i].postType});
                  }
                }
              },
              error: function (error) {
                this.$message.error("错误");
              }
            })
/*            if(tn=="自然") {
              var srcList = new Array();
              srcList[0] = require('../../assets/banner1.jpg');
              srcList[1] = require('../../assets/banner2.jpg');
              srcList[2] = require('../../assets/banner3.jpg');
              var titleList = new Array();
              titleList[0] = "自然1";
              titleList[1] = "自然2";
              titleList[2] = "自然3";
              for (var i = 0; i < 3; i++) {
                this.addCard.tilte = titleList[i];
                this.addCard.src = srcList[i];
                this.addCard.push({title: titleList[i], src: srcList[i], len: '1',id:"testID"});
              }
            }
            if(tn=="经济"){
              var srcList = new Array();
              srcList[0] = require('../../assets/service1.jpg');
              srcList[1] = require('../../assets/service2.jpg');
              var titleList = new Array();
              titleList[0] = "经济1";
              titleList[1] = "经济2";
              for (var i = 0; i < 2; i++) {
                this.addCard.tilte = titleList[i];
                this.addCard.src = srcList[i];
                this.addCard.push({title: titleList[i], src: srcList[i], len: '1',id:"TESTid"});
              }
            }*/
          }
      }
    }
</script>

<style scoped>
  .TAG{
    margin-left:470px;
    text-align: center;
  }

  .CARD{
    margin-left:470px;
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
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
