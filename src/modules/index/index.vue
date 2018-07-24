<template>
  <div class="back">
    <el-container>
      <el-header>
        <Navigation></Navigation>
      </el-header>
      <el-main>
        <el-carousel trigger="click" height="600px" interval="5000">
          <el-carousel-item v-for="item in imgs" :key="item">
            <img :src="item" style="width: 100%; height: inherit"/>
          </el-carousel-item>
        </el-carousel>
        <hr/>
        <div style="font-weight: 900; font-size: 20px">
          <p class="content">您可以用我们的网站做什么</p>
        </div>
        <el-row :gutter="3">
          <div v-for="service in services">
            <el-col :span="3" :offset="2">
              <div>
                <img :src="service.imgURL" class="serviceImg"/>
                <p class="content">{{service.content}}</p>
              </div>
            </el-col>
          </div>
        </el-row>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import Navigation from "../../components/Navigation";
  import Footer from "../../components/Footer";

  export default {
    name: "index",
    components: {Footer, Navigation},
    data() {
      return {
        imgs: [
          require('../../assets/banner1.jpg'),
          require('../../assets/banner2.jpg'),
          require('../../assets/banner3.jpg')
        ],
        services: [
          {
            "imgURL": require('../../assets/service1.jpg'),
            "content": "分享优质文章，记录你的所见所闻"
          },
          {
            "imgURL": require('../../assets/service2.jpg'),
            "content": "了解你所不知道的奇闻轶事"
          },
          {
            "imgURL": require('../../assets/service3.jpg'),
            "content": "留下你生活的足迹"
          },
          {
            "imgURL": require('../../assets/service4.jpg'),
            "content": "定制专属于你的纪念品"
          },
        ]
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

  .serviceImg {
    width: 200px;
    height: 200px;
    border-radius: 200px;
  }

  .content {
    font-weight: bold;
    text-align: center;
  }

  hr {
    size: 10px;
  }
</style>
