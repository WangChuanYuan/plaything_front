<template>
  <div>
    <el-container>
      <el-header>
        <Navigation></Navigation>
      </el-header>
      <el-container>
        <el-main>
          <!--主要区域内容-->
          <!--封面，包含封面图，标签，可能有价格-->
          <div id="cover">
            <div v-if="this.post.fileType == 'PIC'">
              <el-carousel ref="carousel" trigger="click" height="530px" :interval="5000" style="width: 500px">
                <el-carousel-item v-for="cover in post.covers" :key="cover" name="index">
                  <img :src=cover style="margin-left:10%; width: 80%; height: inherit"/>
                </el-carousel-item>
              </el-carousel>
              <div>
                <el-row>
                  <el-col :span="4" v-for="(cover,index) in post.covers" :key="cover">
                    <img :src="cover" @click="changeCarousel(index)" class="thumbnail"/>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div v-else>
              <video :src="this.post.video" controls="controls" height="600px" width="500px">您的浏览器不支持video</video>
            </div>
            <div>
              <el-tag style="margin: 5px; border-color: #565656; color: #565656" color="white" size="medium" :key="tag"
                      v-for="tag in post.tags">
                {{tag}}
              </el-tag>
            </div>
            <h2 v-if="post.type == 'SELL'" style="color: red">{{post.price}}￥</h2>
          </div>
          <!--正文内容用jQuery追加html代码-->
          <div id="article">
            <h3 style="text-align: center">{{post.title}}</h3>
            <div id="content" class="square" style="word-break: break-all; margin-bottom: 45px"></div>
            <!--浏览模式下显示留言板，审批模式下显示审批选项-->
            <hr/>
            <div v-show="mode == 'CHECK'">
              <el-radio-group v-model="checkResult">
                <el-radio label="DENIED">不通过</el-radio>
                <el-radio label="PERMITTED">通过</el-radio>
                <el-radio label="RECOMMENDED">加精</el-radio>
              </el-radio-group>
              <el-button style="margin-left: 120px" icon="el-icon-check" @click="check">提交</el-button>
            </div>
            <div v-show="mode == 'READ'">
              <Comment :post-id="post.id" :type="post.type"></Comment>
            </div>
          </div>
        </el-main>
        <el-aside width="600px">
          <!--侧边栏内容，固定在右侧-->
          <div id="writerInfo">
            <div class="square" style="width: 320px">
              <div style="text-align: center">
                <label style="font-size: 20px; font-family: KaiTi">作者</label>
              </div>
              <hr/>
              <img :src="writer.display" class="display" style="border-radius: 80px"/>
              <label style="vertical-align: top; margin-left: 50px">{{writer.userName}}</label>
              <el-button icon="el-icon-message" circle @click="chatRoomVisible = true"></el-button>
              <el-button icon="el-icon-star-on" circle></el-button>
            </div>
          </div>
          <div id="recentPosts">
            <div class="square" style="width: 320px">
              <div style="text-align: center">
                <label style="font-size: 20px; font-family: KaiTi">与他相关</label>
              </div>
              <hr/>
              <div v-for="(post, index) in recentPosts">
                <div style="margin-bottom: 10px">
                  <img v-if="post.fileType == 'PIC'" :src="post.covers[0]" class="display"
                       style="vertical-align: middle"/>
                  <video v-else :src="post.video" class="display" autoplay muted loop style="vertical-align: middle">
                    您的浏览器不支持video
                  </video>
                  <label class="linkText" style="font-size: 15px; margin-left: 10px" @click="readPost(index)">{{post.title}}</label>
                  <div style="position: relative; left: 260px; top: -25px">
                    <el-button icon="el-icon-star-on" circle></el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-aside>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="chatRoomVisible" width="30%">
      <Talk :receiver-id="writer.id"></Talk>
    </el-dialog>
  </div>
</template>

<script>
  import Navigation from "../../components/Navigation";
  import $ from 'jquery';
  import UE from "../../components/UE";
  import util from '../../assets/util.js';
  import Talk from "../../components/Talk";
  import ajaxHelper from '../../assets/ajaxHelper';
  import Comment from "../../components/Comment";

  export default {
    name: "post",
    components: {Comment, Talk, UE, Navigation},
    data() {
      return {
        chatRoomVisible: false,
        mode: 'READ', //默认为浏览模式
        checkResult: 'DENIED', //审核模式下的审查状态，不通过，通过，加精
        post: {
          id: '',
          covers: [],
          video: null,
          tags: [],
          title: '',
          type: 'SHARE',
          fileType: 'PIC',
          price: 0,
          content: '',
        },
        writer: {
          id: '',
          userName: '',
          phone: '',
          display: require('../../assets/defaultDisplay.jpg')
        }, //作者
        recentPosts: [], //最近几篇发帖
      }
    },
    mounted: function () {
      //初始化页面，从url中得到要显示的文章编号
      this.init();
    },
    methods: {
      init() {
        var mode = util.getParameter('mode');
        var type = util.getParameter('type');
        if (mode)
          this.mode = mode;
        var postID = util.getParameter('postID');
        ajaxHelper.getPostByIdAndType({"postID": postID, "type": type}).then((data) => {
          this.post = data;
        });
        ajaxHelper.getRecentPostsByWriter({"writer": this.post.writer}).then((data) => {
          this.recentPosts = data;
        });
        ajaxHelper.getUserById({"user": this.post.writer}).then((data) => {
          this.writer = data;
        });
        $('#content').append(this.post.content);
      },
      //点击缩略图更改轮播图显示
      changeCarousel(index) {
        this.$refs.carousel.setActiveItem(index);
      },
      //阅读作者最近发帖
      readPost(index) {
        window.location.href = './post.html?postId=' + this.recentPosts[index].id + '&mode=READ&' + 'type=' + this.recentPosts[index].type;
      },
      //审核
      check() {
        ajaxHelper.checkPost({"checkResult": this.checkResult, "postID": this.post.id, "type": this.post.type}).then((data) => {
          if (data == 'SUCCESS')
            this.$message("审核成功");
        });
      }
    }
  }
</script>

<style scoped>
  #cover {
    top: 100px;
    left: 300px;
    position: absolute;
  }

  #article {
    top: 800px;
    left: 300px;
    width: 500px;
    position: absolute;
  }

  #writerInfo {
    top: 100px;
    position: fixed;
  }

  #recentPosts {
    top: 300px;
    position: fixed;
  }

  .thumbnail {
    border: 1px dashed #d9d9d9;
    width: 60px;
    height: 60px;
    pointer: cursor;
    margin: 5px 20px 0px 30px;
  }

  .thumbnail:hover {
    border-color: #409EFF;
  }

  .square {
    border: 1px solid #c1bcb9;
    border-radius: 12px;
  }

  .display {
    height: 80px;
    width: 80px;
    margin-left: 20px;
  }

  .linkText:hover {
    color: #409EFF;
  }

</style>
