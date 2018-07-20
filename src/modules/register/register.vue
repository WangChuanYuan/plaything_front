<template>
  <div>
    <Navigation></Navigation>
    <tag-cloud id="tagCloud" :data="hotTag" @clickTag="clickTagItem"></tag-cloud>
  </div>
</template>

<script>
  import Navigation from "../../components/Navigation";

  export default {
    name: "register",
    components: {Navigation},
    data: function () {
      return {
        hotTag: [
          {"name": "美食"},
          {"name": "人文"},
          {"name": "风景"},
          {"name": "习俗"},
          {"name": "手工"},
          {"name": "文化"},
          {"name": "服饰"},
          {"name": "自然"},
          {"name": "科技"},
          {"name": "传统"},
          {"name": "地标"},
          {"name": "音乐"}
        ]
      }
    },
    methods: {
      clickTagItem: function (tag) {
        alert(tag.name)
      }
    }
  }
</script>

<style scoped>
  #tagCloud {
    top: 50px;
    margin: 3px 0px 10px 180px;
  }
</style>
