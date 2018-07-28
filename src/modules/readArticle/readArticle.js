import Vue from 'vue'
import ReadArticle from './readArticle.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
new Vue({
  el: '#readArticle',
  components: { ReadArticle },
  template: '<ReadArticle/>'
})
