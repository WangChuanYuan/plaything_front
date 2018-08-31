<template>
  <div class="back">
    <el-container>
      <el-header>

        <Navigation></Navigation>

      </el-header>
      <el-main>

        <div>
          <el-menu>
            <el-col :span="1">
              <div>
                <span>&nbsp;</span>
              </div>
            </el-col>
            <el-col :span="18">
              <el-tabs class="TAG"  @open="handleOpen" @close="handleClose" @tab-click="handleClick">
                <el-tab-pane
                  :key="item.name"
                  v-for="(item, index) in editableTabs"
                  :label="item.title"
                  :name="index">
                </el-tab-pane>
              </el-tabs>
            </el-col>
            <el-col :span="4">
              <el-input placeholder="请输入内容" v-model=searchText clearable class="input">
                <el-button slot="append" icon="el-icon-search" @click="searchPosts()"></el-button>
              </el-input>
            </el-col>
          </el-menu>
        </div>

        <!--卡片-->
        <div class="CardContainer" style="margin-left: 25px">
          <el-col class="CARDS" v-for="(item) in addCard"  v-if="item.len=='1'">
            <el-row :span="4" v-if="item.len=='1'" style="padding: 10px">
              <el-card class="card" v-if="item.len=='1'" :body-style="{ padding: '0px'}" shadow="hover">
                <div v-if="item.fileType=='PIC'">
                  <img v-if="item.len=='1'" :src="item.src" class="image" height="250px">
                </div>
                <div v-else>
                  <video :src="item.video" controls="controls" style="display: block;width: 100%" height="250px">您的浏览器不支持video</video>
                </div>
                <div v-if="item.len=='1'" style="padding: 0px;">
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <div v-if="item.len=='1'" class="bottom clearfix" style="height: 20px">
                    <span v-if="item.len=='1'"  >{{item.title}}</span>
                    <el-button v-if="item.len=='1'" style="right: initial; height:20px;width: 20px" type="success" icon="el-icon-view" circle size="medium" class="button" @click="ReadArticle(item.id)">
                    </el-button>
                  </div>
                </div>
              </el-card>
            </el-row>
          </el-col>
        </div>

      </el-main>
      <el-footer style="bottom: auto">
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
    name: "mall",
    components: {Footer, Navigation},
    data() {
      return {
        searchText:"",
        editableTabsValue: '0',
        editableTabs: [
          {title: '推荐', name: '推荐', content: ''},
          {title: '美食', name: '美食', content: ''},
          {title: '书籍', name: '书籍', content: ''},
          {title: '母婴', name: '母婴', content: ''},
          {title: '服饰', name: '服饰', content: ''},
          {title: '家居', name: '家居', content: ''},
          {title: '护肤', name: '护肤', content: ''},
          {title: '运动', name: '运动', content: ''},
          {title: '宠物', name: '宠物', content: ''},
          {title: '保健品', name: '保健品', content: ''},
          {title: '数码', name: '数码', content: ''},
          {title: '护理', name: '护理', content: ''},
          {title: '其他', name: '其他', content: ''}],
        input: "",
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
        tempCard: [{
          title: "",
          src: '',
          len: '0',
          id:'testID'
        }],
        cardIndex:0
      }
    },
    created: function(){
      this.init()
    },
    methods: {
      init(){
        this.showCard('推荐');
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      searchPosts(){
        alert("i want show you something!")
        /*ajaxHelper.get_recent_posts(this.searchText).then((data)=>{
          var posts = data
          if(posts){
            this.showSearchedCards(posts)
          }
        })*/
      },
      showSearchedCards(posts){
        let cards=this.addCard;
        cards.forEach((card,index)=>{
          if(card.len==="1") {
            let nextCard = cards[index + 1] || cards[index - 1];
          }
        });
        this.addCard=cards.filter(card=>card.len!=='1');
        for(var i=0;i<posts.length;i++){
          this.addCard.push({title: posts[i].tilte, src: posts[i].src, len: '1',id:posts[i].id});
        }
      },
      handleClick(tab,event){
        this.showCard(tab.label)
      },
      ReadArticle(id){
        window.location.href = '/post.html?postID='+id+'&type=SELL';
      },

      showCard(tn){
        /*alert(tn)*/
        let cards=this.addCard;
        cards.forEach((card,index)=>{
          if(card.len==="1") {
            let nextCard = cards[index + 1] || cards[index - 1];
          }
        });
        this.addCard=cards.filter(card=>card.len!=='1');
        var postList;
        ajaxHelper.receive_commodities(tn).then((data) => {
          postList = data;
          //alert(postList.length)
          //alert("success1")
          for (var i = 0; i < postList.length; i++) {
            if(data[i].postType=='PIC'){
              //alert("success2")
              this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].cid,fileType:postList[i].postType});
            }
            else{
              //alert("success2")
              this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].cid,fileType: postList[i].postType});
            }
          }
        });
        /*$.ajax({
          url: '/api/receive_commodities',
          processData: false,
          cache: false,
          contentType: false,
          dataType: 'json',
          type: 'post',
          data: tn,
          success: function (data) {
            alert("mall cards success!")
            for(var i=0;i<data.length;i++){
              if(data[i].postType=='PIC'){
                this.addCard.push({type:data[i].type,title: data[i].tilte, src: data[i].covers[0].src, len: '1', id: data[i].cid,fileType:data[i].postType});
              }
              else{
                this.addCard.push({type:data[i].type,title: data[i].tilte, video:data[i].video, len: '1', id: data[i].cid,fileType: data[i].postType});
            }
            }
            alert("success!")
          },
          error: function (error) {
            this.$message.error("错误");
          }
        })*/
/*        if(tn=="0") {
          var srcList = new Array();
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
          }
        }*/
      }
    }
  }
</script>

<style scoped>
  .back::before {
    content: '';
    background: url(../../assets/plaything.jpg) no-repeat;
    background-size: cover;
    opacity: 0.5;
    position: absolute;
    z-index: -1;
  }

  .CardContainer{
    width: 1500px;
  }
  .card{
  }
  .CARDS{
    width: 300px;
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
