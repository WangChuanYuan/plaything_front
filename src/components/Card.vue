<template>
  <div class="card-vue">
    <a target="_blank" href="http://static.runoob.com/images/demo/demo1.jpg">
    <el-card class="box-card" shadow="hover":body-style="{ padding: '0px' }">
      <img src="http://static.runoob.com/images/demo/demo1.jpg" class="image">
      <div style="padding: 8px;">
        <span>emm</span>
        <div class="bottom clearfix">
          <span>Nori</span>
          <el-button type="love" id="love" icon="el-icon-star-off" circle></el-button>
        </div>
      </div>
    </el-card>
    </a>
  </div>
</template>

<script>
    export default {
        name: "Card",
        data(){
          return{
            imgURL:imgURL
          }
        }
    }
</script>

<style scoped>
  .card-vue{
    margin: 5px;
    border: 1px solid #ccc;
    float: left;
    width: 180px;
  }
  .image {
    width: 100%;
    display: block;
  }
  #love{
    padding: 0;
    float: right;
  }
</style>
