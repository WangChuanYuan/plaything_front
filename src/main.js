// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
// 富文本编辑器
import '../static/UE/ueditor.config'
import '../static/UE/ueditor.all.min'
import '../static/UE/lang/zh-cn/zh-cn'
import '../static/UE/ueditor.parse.min'
import UE from './components/UE'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { UE },
  template: '<UE/>'
})
