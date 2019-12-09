import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index'
    },
    {
      path: '/index',
      name: 'Index',
      component: () => import('@/components/Index')
    },{
      path: '/user',
      name: 'User',
      component: () => import('@/components/User')
    },{
      path: '/userCenter',
      name: 'UserCenter',
      component: () => import('@/components/UserCenter')
    },{
      path: '/loan',
      name: 'Loan',
      component: () => import('@/components/Loan')
    },{
      path: '/userData',
      name: 'UserData',
      component: () => import('@/components/UserData')
    },{
      path: '/userPhotoUpload',
      name: 'UserPhotoUpload',
      component: () => import('@/components/UserPhotoUpload')
    },{
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login')
    },{
      path: '/reg',
      name: 'Register',
      component: () => import('@/components/Register')
    }
  ]
})
