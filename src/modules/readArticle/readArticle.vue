<template>
    <div>
      <el-container>
        <el-header>
          <Navigation></Navigation>
        </el-header>
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
        name: "readArticle",
      components: {Footer, Navigation}
    }
</script>

<style scoped>

</style>
