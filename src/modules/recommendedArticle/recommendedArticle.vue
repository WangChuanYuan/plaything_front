<template>
  <div>
    <el-container>
      <el-header>
        <Navigation></Navigation>
      </el-header>

      <!--标签-->
      <el-tabs class="TAG" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>

      <!--卡片-->
      <el-row class="CARD">
        <el-col :span="16">
          <el-card v-for="(item,index) in addCard" :body-style="{ padding: '0px' }">
            <img :src="item.src" class="image">
            <div style="padding: 20px;">
              <span>{{item.title}}</span>
              <div class="bottom clearfix">
                <el-button type="text" class="button">阅读全文</el-button>
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
    import $ from 'jquery';
    export default {
        name: "recommendedArticle",
        components: {Footer, Navigation},
      data() {
        return {
          editableTabsValue: '2',
          editableTabs: [{
            title: 'test1',
            name: '1',
            content: ''
          }, {
            title: 'test2',
            name: '2',
            content: ''
          }],
          tabIndex: 2,

          addCard: [{
            title: "文章标题",
            "src": require('../../assets/banner1.jpg')
          },{
            title: "文章标题2",
            "src": require('../../assets/banner2.jpg')
          }]
        }
      },
      methods: {
      }
    }
</script>

<style scoped>
  .TAG{
    margin-right:430px;
    margin-left:430px;

    text-align: center;
  }

  .CARD{
    margin-left:430px;
  }
  .bottom {
    margin-top: 12px;
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
