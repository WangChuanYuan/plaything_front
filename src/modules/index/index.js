import Vue from 'vue'
import Index from './index.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Talk from '../../components/Talk';

Vue.use(ElementUI)

new Vue({
  el: '#index',
  components: { Talk },
  template: '<Talk/>'
})
