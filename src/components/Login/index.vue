<template>
  <div class="page">
    <div class="header">
      <img src="@/assets/img/home_banner.png" alt />
    </div>
    <div class="main login">
      <div class="item">
        <div class="icon">
          <img src="@/assets/img/zhanghao.png" alt="">
        </div>
        <div class="input-con">
          <input type="phone" placeholder="请输入手机号码">
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="@/assets/img/lunkuodasan-.png" alt="">
        </div>
        <div class="input-con" v-show="!showPassword">
          <input type="password" v-model="password" placeholder="请输入密码">
          <div class="eyes" @click="togglePass">
            <van-icon name="closed-eye" />
          </div>
        </div>
        <div class="input-con" v-show="showPassword">
          <input type="text" v-model="password" placeholder="请输入密码">
          <div class="eyes" @click="togglePass">
            <van-icon name="eye-o" />
          </div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="@/assets/img/yanzhengma.png" alt="">
        </div>
        <div class="input-con">
          <input type="number" placeholder="请输入验证码">
        </div>
        <div class="img">
          <img src="@/assets/img/verifyImage.png" alt="">
        </div>
      </div>
      <div class="toRegister">
        <span @click="toReg">立即注册>></span>
      </div>

      <div class="btn-sub" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      showPassword:false,
      password:"",
    };
  },
  methods: {
    toReg(){
      this.$router.push({path:'/reg'})
    },
    choseMonth(month){
      this.stages = month
    },
    togglePass(){
      this.showPassword = !this.showPassword
    },
    login(){
      this.$router.push({path:'/user'})
    }
  },
  mounted() {}
};
</script>