import Vue from 'vue'
import editPost from './edit-post.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  el: '#edit-post',
  components: { editPost },
  template: '<edit-post/>'
})
