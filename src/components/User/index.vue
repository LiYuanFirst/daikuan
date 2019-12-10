<template>
  <div class="page">
    <div class="main user">
      <div class="user-header" :style="'background:url('+headerImg+') center center no-repeat;background-size:100% 100%;'">

        <div class="img-con">
          <img src="@/assets/img/icon_portrait.png" alt="">
          <div class="phone">{{userName}}</div>
        </div>
        
      </div>
      <div class="wrapper">
        <van-cell title="我的资料" is-link to="/userCenter">
          <div slot="icon" class="item-icon">
            <img src="@/assets/img/gerenziliao.png" alt="">
          </div>
        </van-cell>
        <van-cell title="我的借款" is-link to="/loan">
          <div slot="icon" class="item-icon">
            <img src="@/assets/img/jiekuan.png" alt="">
          </div>
        </van-cell>
        <div class="line"></div>
        <van-cell title="退出登录" is-link @click="loginOut" v-show="isLogin">
          <div slot="icon" class="item-icon">
            <img src="@/assets/img/tuichu.png" alt="">
          </div>
        </van-cell>
      </div>
    </div>
    <van-tabbar v-model="active" active-color="#f4866c">
      <van-tabbar-item to="/index">
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon[0].active : icon[0].inactive" />
      </van-tabbar-item>
      <van-tabbar-item>
        <span>个人中心</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon[1].active : icon[1].inactive" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import axios from "axios";

import qs from "qs";
import { Toast, Dialog } from 'vant';
export default {
  name: "User",
  data() {
    return {
      userCode:'',
      userName:"",
      isLogin:'',
      active: 1,
      headerImg:require("@/assets/img/bg_portrait.png"),
      icon: [
        {
          active: require("@/assets/img/icon_home_selected.png"),
          inactive: require("@/assets/img/icon_home.png")
        },
        {
          active: require("@/assets/img/icon_personal_selected.png"),
          inactive: require("@/assets/img/icon_personal.png")
        }
      ]
    };
  },
  methods: {
    toLogin(){
      this.$router.push({path:'/login'})
    },
    loginOut(){
      this.$dialog.confirm({
        title: '提示',
        message: '确认退出？',
      }).then(()=>{
        localStorage.removeItem('userCode')
        this.$router.push({path:'/index'})
      }).catch(()=>{

      })
    },
    toUserCenter(){
      this.$router.push({path:'/userCenter'})
    },
    queryData() {
        let data = {
          userCode: localStorage.getItem('userCode')
        }
        Toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true
        });
        axios.post('/user/findUserLoginInfo', qs.stringify(data)).then((res) => {
          console.log(res)
          Toast.clear()
          if (res.data.retCode == 0) {
            this.userName = res.data.data.userName
          } else {
            Toast.fail('服务器出错');
          }

        }).catch(() => {

          Toast.clear()
          Toast.fail('服务器出错');
        })
      }
  },
  mounted() {
    if(localStorage.getItem('userCode')){
      this.userCode = localStorage.getItem('userCode')
      this.isLogin = true
      this.queryData()
    }else{
      this.isLogin = false
      Dialog.confirm({
              title: '提示',
              message: '暂未登录，请先登录',
              confirmButtonText:'立即登录',
              confirmButtonColor:'#f4866c'
            }).then(() => {
              this.$router.push({path:'/login'})
            }).catch(()=>{
              this.$router.go(-1)
            })
    }
  }
};
</script>