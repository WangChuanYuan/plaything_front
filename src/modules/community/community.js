import Vue from 'vue'
import community from './community.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  el: '#community',
  components: { community },
  template: '<community/>'
})
