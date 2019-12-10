// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant';
import wx from 'weixin-js-sdk'
import 'vant/lib/index.css'
import router from './router'

import './mainFun'
Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
