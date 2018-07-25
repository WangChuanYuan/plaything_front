<template>
  <div>
    <el-container>
      <el-header>
        <Navigation></Navigation>
      </el-header>
      <el-container>
        <el-main>
          <!--正文内容-->
          <div id="cover">
            <el-carousel trigger="click" height="530px" :interval="5000" style="width: 500px">
              <el-carousel-item v-for="pic in post.pics" :key="pic">
                <img :src="pic" style="margin-left:10%; width: 80%; height: inherit"/>
              </el-carousel-item>
            </el-carousel>
            <div>
              <el-row>
                <el-col :span="4" v-for="pic in post.pics" :key="pic">
                  <img :src="pic" class="thumbnail"/>
                </el-col>
              </el-row>
            </div>
            <div>
              <el-tag style="margin: 5px; border-color: #565656; color: #565656" color="white" size="medium" :key="tag"
                      v-for="tag in post.tags">
                {{tag}}
              </el-tag>
            </div>
          </div>
        </el-main>
        <el-aside width="600px">
          <!--侧边栏内容-->
          <div id="writerInfo">
            <div class="square">
              <div style="text-align: center">
                <label style="font-size: 30px; font-family: KaiTi">作者</label>
              </div>
              <hr/>
              <img :src="writer.display" class="avatar"/>
              <label style="vertical-align: top; margin-left: 50px">{{writer.userName}}</label>
              <label style="vertical-align: middle">{{writer.phone}}</label>
            </div>
          </div>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import Navigation from "../../components/Navigation";
  import $ from 'jquery'

  export default {
    name: "post",
    components: {Navigation},
    data() {
      return {
        post: {
          pics: [require('../../assets/banner1.jpg'),
            require('../../assets/banner2.jpg'),
            require('../../assets/banner3.jpg')],
          tags: ['美食', '风景', '手艺'],
        },
        writer: {
          userName: '王川源',
          phone: '12345567',
          display: require('../../assets/banner1.jpg')
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

  #writerInfo {
    top: 100px;
    position: absolute;
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

  .avatar {
    height: 80px;
    width: 80px;
    border-radius: 80px;
    margin-left: 20px;
  }

</style>
