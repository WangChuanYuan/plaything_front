import Vue from 'vue'
import RecommendedArticle from './recommendedArticle.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
new Vue({
  el: '#recommendedArticle',
  components: { RecommendedArticle },
  template: '<RecommendedArticle/>'
})
