import Vue from 'vue'
import AdminLogin from './adminLogin.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

new Vue({
  el: '#adminLogin',
  components: { AdminLogin },
  template: '<AdminLogin/>'
})
