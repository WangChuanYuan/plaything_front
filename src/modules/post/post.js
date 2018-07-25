import Vue from 'vue'
import Post from './post.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  el: '#post',
  components: { Post },
  template: '<Post/>'
})
