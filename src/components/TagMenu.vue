<template>
  <div>
    <el-menu>
      <el-col :span="1">
        <div>
          <span>&nbsp;</span>
        </div>
      </el-col>
      <el-col :span="18">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="推荐" name="1"></el-tab-pane>
            <el-tab-pane label="人文" name="2"></el-tab-pane>
            <el-tab-pane label="自然" name="3"></el-tab-pane>
            <el-tab-pane label="风景" name="4"></el-tab-pane>
            <el-tab-pane label="美食" name="5"></el-tab-pane>
            <el-tab-pane label="服饰" name="6"></el-tab-pane>
            <el-tab-pane label="传统" name="7"></el-tab-pane>
            <el-tab-pane label="手工" name="8"></el-tab-pane>
            <el-tab-pane label="习俗" name="9"></el-tab-pane>
            <el-tab-pane label="文化" name="10"></el-tab-pane>
            <el-tab-pane label="科技" name="11"></el-tab-pane>
          </el-tabs>
      </el-col>
      <el-col :span="4">
        <el-input
          id="input"
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input">
        </el-input>
      </el-col>
    </el-menu>
  </div>
</template>

<script>
    export default {
        name: "TagMenu",
      data() {
        return {
          activeName: '1',
          input:""
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      }
    }
</script>

<style scoped>
  #input{
    margin: 0;
  }

</style>
