<template>
    <div class="back">
      <el-container>
        <el-header>
          <Navigation></Navigation>
        </el-header>
        <el-main>
          <TagMenu></TagMenu>
          <Card></Card>
          <span><Card></Card></span>
        </el-main>
      </el-container>
    </div>
</template>

<script>
    import Navigation from "../../components/Navigation";
    import TagMenu from "../../components/TagMenu";
    import Card from "../../components/Card";
    export default {
      name: "community",
      components: {Card, TagMenu, Navigation}
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
</style>
