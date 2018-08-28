<template>
  <div style="position: relative;top: 100px;left:130px;">
    <el-row>
      <el-col :span="4" v-for="(cardItem,index) in allCards" :key="index " :offset="1" style="magrin-bottom:40px">
        <el-card :body-style="{padding: '0px',height:'360px'}" shadow="hover" style="width:260px; height: 320px ">
          <div style="padding: 6px;height:310px;">
            <div style="position: relative;top:30px;">
              <img :src="cardItem.csrc" class="image" >
              <div style="position: relative;top: 10px;left: 66px;">
                {{cardItem.userImage}}{{cardItem.userName}}
              </div>
              <div style="position: relative;top:45px;">
                &nbsp;{{cardItem.ctags}}&nbsp;&nbsp;&nbsp;
              </div>
              <el-button type="icon" class="button">
                <el-icon type="warning" class="icon" icon="el-icon-star-off" @click="loveArticle(cardItem.userName)">
                </el-icon>
              </el-button>
             </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "Card",
        data(){
          return{
              allcards:[{
                userImage:"",
                userName:"",
                csrc:"http://static.runoob.com/images/demo/demo1.jpg",
                ctags:"",
              }]
          }
        }
    }
</script>

<style scoped>
  .image {
    width: 100%;
    display: block;
  }
</style>
