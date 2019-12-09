// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vant from 'vant';
import wx from 'weixin-js-sdk'
import 'vant/lib/index.css'
import router from './router'
Vue.config.productionTip = false
Vue.use(Vant)
// 验证手机号码
Vue.prototype.checkPhoneNum = function (inputString) {
  var partten = /^1\d{10}$/;
  if (partten.test(inputString)) {
    return true;
  }else {
    return false;
  }
}
// 验证input内容(不能包含空格)
Vue.prototype.checkInputStr = function (str) {
  if (str.length == 0) {
    let res = {
      status: false,
      msg: '不能为空'
    }
    return res
  } else if (str.indexOf(" ") > -1) {
    let res = {
      status: false,
      msg: '不能含有空格'
    }
    return res
  } else{
    let res = {
      status: true,
      msg: ''
    }
    return res
  }
}
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
