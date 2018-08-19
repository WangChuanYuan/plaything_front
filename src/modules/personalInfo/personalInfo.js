import Vue from 'vue'
import tagCloud from 'v-tag-cloud'
import PersonalInfo from './personalInfo.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(tagCloud)

new Vue({
  el: '#personalInfo',
  components: { PersonalInfo },
  template: '<PersonalInfo/>'
})
