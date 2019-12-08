<template>
  <div class="page">
    <div class="main user">
      <div class="user-header" @click="toLogin" :style="'background:url('+headerImg+') center center no-repeat;background-size:100% 100%;'">

        <div class="img-con">
          <img src="@/assets/img/icon_portrait.png" alt="">
          <div class="phone">立即登录</div>
        </div>
        
      </div>
      <div class="wrapper">
        <van-cell title="我的资料" is-link @click="toUserCenter">
          <div slot="icon" class="item-icon">
            <img src="@/assets/img/gerenziliao.png" alt="">
          </div>
        </van-cell>
        <van-cell title="我的借款" is-link >
          <div slot="icon" class="item-icon">
            <img src="@/assets/img/jiekuan.png" alt="">
          </div>
        </van-cell>
        <div class="line"></div>
        <van-cell title="退出登录" is-link @click="loginOut">
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

export default {
  name: "User",
  data() {
    return {
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
        this.$router.push({path:'/index'})
      }).catch(()=>{

      })
    },
    toUserCenter(){
      this.$router.push({path:'/userCenter'})
    }
  },
  mounted() {}
};
</script>