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
          <input type="password" v-model="password1" placeholder="请输入密码">
          <div class="eyes" @click="togglePass">
            <van-icon name="closed-eye" />
          </div>
        </div>
        <div class="input-con" v-show="showPassword">
          <input type="text" v-model="password1" placeholder="请输入密码">
          <div class="eyes" @click="togglePass">
            <van-icon name="eye-o" />
          </div>
        </div>
      </div>
      <div class="item">
        <div class="icon">
          <img src="@/assets/img/lunkuodasan-.png" alt="">
        </div>
        <div class="input-con" v-show="!showPassword">
          <input type="password" v-model="password2" placeholder="请再次输入密码">
          <div class="eyes" @click="togglePass">
            <van-icon name="closed-eye" />
          </div>
        </div>
        <div class="input-con" v-show="showPassword">
          <input type="text" v-model="password2" placeholder="请再次输入密码">
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
        已有账号，<span @click="toLogin">立即登录>></span>
      </div>

      <div class="btn-sub">立即注册</div>
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
      password1:"",
      password2:"",
    };
  },
  methods: {
    toLogin(){
      this.$router.push({path:'/login'})
    },
    choseMonth(month){
      this.stages = month
    },
    togglePass(){
      this.showPassword = !this.showPassword
    }
  },
  mounted() {}
};
</script>