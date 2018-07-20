import Vue from 'vue'
import tagCloud from 'v-tag-cloud'
import Register from './register.vue'

Vue.use(tagCloud)

new Vue({
  el: '#register',
  components: { Register },
  template: '<Register/>'
})
