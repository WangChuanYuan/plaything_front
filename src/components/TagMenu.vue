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
            <el-tab-pane
              ：key="item.name"
              v-for="(item) in editableTabs"
              :label="item.title"
              :name="item.name"
            >
            </el-tab-pane>
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
    import Card from "./Card";
    export default {
        name: "TagMenu",
      data() {
        return {
          editableTabsValue:'12',
          editableTabs:[
            {title: '推荐',name:'推荐',content:''},
            {title: '人文',name:'人文',content:''},
            {title: '风景',name:'风景',content:''},
            {title: '习俗',name:'习俗',content:''},
            {title: '手工',name:'手工',content:''},
            {title: '文化',name:'文化',content:''},
            {title: '服饰',name:'服饰',content:''},
            {title: '自然',name:'自然',content:''},
            {title: '科技',name:'科技',content:''},
            {title: '传统',name:'传统',content:''},
            {title: '地标',name:'地标',content:''},
            {title: '音乐',name:'音乐',content:''}],
          input:""
        };
      },
      created: function(){
        this.handleClick()
      },
      methods: {
        handleClick(tab, event) {
          console.log('hello');
        }
      }
    }
</script>

<style scoped>
  #input{
    margin: 0;
  }

</style>
