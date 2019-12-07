import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/components/Index')
    },{
      path: '/user',
      name: 'User',
      component: () => import('@/components/User')
    }
  ]
})
