import Vue from 'vue'
import tagCloud from 'v-tag-cloud'
import Register from './register.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(tagCloud)

new Vue({
  el: '#register',
  components: { Register },
  template: '<Register/>'
})
