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
                  v-for="(item, index) in editableTabs"
                  :key="item.name"
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
                  <video v-if="item.len=='1'" :src="item.video" controls="controls" style="display: block;width: 100%" height="250px">您的浏览器不支持video</video>
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
  export default {
    name: "community",
    components: {Footer, Navigation},
    data() {
      return {
        searchText:"",
        editableTabsValue: '1',
        editableTabs: [
          {title: '', name: '', content: '',len:''}],
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
        var tag;
        ajaxHelper.getCurrentUser().then((data) => {
          var usr = data;
          if (usr) {
            tag=usr.tags;
            while(this.editableTabs.length>1){
              this.editableTabs.pop();
            }
            for (var i=0;i<tag.length;i++){
              this.editableTabs.push({ title: tag[i].content,
                name: tag[i].content,
                content: '',
                len:'1'})
            }
            this.showCard(tag[0].content);
          }
        });
      },
      searchPosts(){
        //alert("i want show you something!")
        this.showCard(this.searchText)
        /*ajaxHelper.get_recent_posts(this.searchText).then((data)=>{
          var posts = data
          if(posts){
            this.showSearchedCards(posts)
          }
        })*/
      },
/*      showSearchedCards(posts){
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
      },*/
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClick(tab,event){
        this.showCard(tab.label)
      },

      ReadArticle(id){
        window.location.href = '/post.html?postID='+id+'&type=SHARE';
      },
      showCard(tn) {
        //alert("success0")
        let cards = this.addCard;
        cards.forEach((card, index) => {
          if (card.len === "1") {
            let nextCard = cards[index + 1] || cards[index - 1];
          }
        });
        this.addCard = cards.filter(card => card.len !== '1');
        var postList;
        ajaxHelper.receive_posts(tn).then((data) => {
          postList = data;
          //alert(postList.length)
          //alert("success1")
          for (var i = 0; i < postList.length; i++) {
            if(data[i].postType=='PIC'){
              //alert("success2")
              this.addCard.push({type:postList[i].type,title: postList[i].tilte, src: postList[i].covers[0], len: '1', id: postList[i].messageId,fileType:postList[i].postType});
            }
            else{
              //alert("success2")
              this.addCard.push({type:postList[i].type,title: postList[i].tilte, video:postList[i].video, len: '1', id: postList[i].messageId,fileType: postList[i].postType});
            }
          }
        });
        /*$.ajax({
          url: '/api/receive_posts',
          processData: false,
          cache: false,
          contentType: false,
          dataType: 'json',
          type: 'post',
          data: tn,
          success: function (data) {
            for (var i = 0; i < data.length; i++) {
              if(data[i].postType=='PIC'){
                this.addCard.push({type:data[i].type,title: data[i].tilte, src: data[i].covers[0].src, len: '1', id: data[i].messageId,fileType:data[i].postType});
              }
              else{
                this.addCard.push({type:data[i].type,title: data[i].tilte, video:data[i].video, len: '1', id: data[i].messageId,fileType: data[i].postType});
              }
            }
          },
          error: function (error) {
            this.$message.error("错误");
          }
        })*/
/*        if (tn == "传统") {
          var srcList = new Array();
          srcList[0] = require('../../assets/5.mp4');
          srcList[1] = require('../../assets/5.mp4');
          var titleList = new Array();
          titleList[0] = "视频1";
          titleList[1] = "视频2";
          for (var i = 0; i < 2; i++) {
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
