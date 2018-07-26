<template>
  <div>
    <el-container>
      <el-header>
        <Navigation></Navigation>
      </el-header>
      <el-container>
        <el-main>
          <!--主要区域内容-->
          <!--封面，包含封面图，标签，标题-->
          <div id="cover">
            <el-carousel ref="carousel" trigger="click" height="530px" :interval="5000" style="width: 500px">
              <el-carousel-item v-for="pic in post.pics" :key="pic" name="index">
                <img :src="pic" style="margin-left:10%; width: 80%; height: inherit"/>
              </el-carousel-item>
            </el-carousel>
            <div>
              <el-row>
                <el-col :span="4" v-for="(pic,index) in post.pics" :key="pic">
                  <img :src="pic" @click="changeCarousel(index)" class="thumbnail"/>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-tag style="margin: 5px; border-color: #565656; color: #565656" color="white" size="medium" :key="tag"
                      v-for="tag in post.tags">
                {{tag}}
              </el-tag>
              <h1 style="text-align: center">{{post.title}}</h1>
            </div>
          </div>
          <!--正文内容用jQuery追加html代码-->
          <div id="article">
            <div id="content" style="word-break: break-all"></div>
            <!--浏览模式下显示留言板，审批模式下显示审批选项-->
            <hr/>
            <div v-show="mode == 'check'">
              <el-radio-group v-model="checkResult">
                <el-radio label="fail">不通过</el-radio>
                <el-radio label="pass">通过</el-radio>
                <el-radio label="recommend">加精</el-radio>
              </el-radio-group>
              <el-button style="margin-left: 120px" icon="el-icon-check" @click="check">提交</el-button>
            </div>
            <div v-show="mode == 'read'">

            </div>
          </div>
        </el-main>
        <el-aside width="600px">
          <!--侧边栏内容，固定在右侧-->
          <div id="writerInfo">
            <div class="square">
              <div style="text-align: center">
                <label style="font-size: 20px; font-family: KaiTi">作者</label>
              </div>
              <hr/>
              <img :src="writer.display" class="display" style="border-radius: 80px"/>
              <label style="vertical-align: top; margin-left: 50px">{{writer.userName}}</label>
              <el-button icon="el-icon-message" circle></el-button>
              <el-button icon="el-icon-star-on" circle></el-button>
            </div>
          </div>
          <div id="recentPosts">
            <div class="square">
              <div style="text-align: center">
                <label style="font-size: 20px; font-family: KaiTi">与他相关</label>
              </div>
              <hr/>
              <div v-for="(post, index) in recentPosts">
                <div style="margin-bottom: 10px">
                  <img :src="post.covers[0]" class="display" style="vertical-align: middle"/>
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
  </div>
</template>

<script>
  import Navigation from "../../components/Navigation";
  import $ from 'jquery';
  import UE from "../../components/UE";

  export default {
    name: "post",
    components: {UE, Navigation},
    data() {
      return {
        mode: 'check', //默认为浏览模式
        checkResult: 'fail', //审核模式下的审查状态，不通过，通过，加精
        post: {
          pics: [require('../../assets/banner1.jpg'),
            require('../../assets/banner2.jpg'),
            require('../../assets/banner3.jpg')],
          tags: ['美食', '风景', '手艺'],
          title: '疯了疯了疯了',
          content: '<p>哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈' +
          '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈' +
          '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈' +
          '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈' +
          '<img src="http://img.baidu.com/hi/jx2/j_0057.gif"/>\n' +
          '</p>',
        },
        writer: {
          userName: '王川源',
          phone: '12345567',
          display: require('../../assets/banner1.jpg')
        }, //作者
        recentPosts: [
          {
            covers: [require('../../assets/banner1.jpg')],
            title: '推荐游玩地点&购物指南',
            content: ''
          },
          {
            covers: [require('../../assets/banner2.jpg')],
            title: '购物指南和购物指南',
            content: ''
          }
        ], //最近几篇发帖
        editorConfig: {
          elementPathEnabled: false,
          wordCount: false,
          enableContextMenu: false,
          initialFrameWidth: 300,
          autoHeightEnabled: true
        }
      }
    },
    mounted: function () {
      //初始化页面，从url中得到要显示的文章编号
      this.init();
    },
    methods: {
      init() {
        $('#content').append(this.post.content);
      },
      //点击缩略图更改轮播图显示
      changeCarousel(index) {
        this.$refs.carousel.setActiveItem(index);
      },
      //阅读作者最近发帖
      readPost(index) {
        alert(this.recentPosts[index].title);
      },
      //审核
      check(){

      }
    }
  }
</script>

<style scoped>
  #cover {
    top: 100px;
    left: 400px;
    position: absolute;
  }

  #article {
    top: 780px;
    left: 400px;
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
    width: 320px;
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
