<template>
  <el-menu :default-active="activeIndex" background-color="#545c64" mode="horizontal" active-text-color="#ffd04b" @select="handleSelect">
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">社区</el-menu-item>
    <el-menu-item index="3">一期一会</el-menu-item>
    <el-menu-item index="4">杂货</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "Navigation",
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>

</style>
