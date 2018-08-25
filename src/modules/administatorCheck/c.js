import Vue from 'vue'
import c from './c.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  el: '#c',
  components: { c },
  template: '<c/>'
})
