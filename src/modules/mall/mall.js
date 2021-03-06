import Vue from 'vue'
import mall from './mall.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  el: '#mall',
  components: { mall },
  template: '<mall/>'
})
