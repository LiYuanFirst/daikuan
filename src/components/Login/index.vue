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
          <input type="phone" v-model="mobile" placeholder="请输入手机号码">
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
          <input type="text" v-model="code" placeholder="请输入验证码">
        </div>
        <div class="img" @click="changeImgCode">
          <img :src="'/user/getImgCode?'+timestamp" alt="">
        </div>
      </div>
      <div class="toRegister">
        <span @click="toReg">立即注册>></span>
      </div>

      <div class="btn-sub" @click="check">登录</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

import { Toast, Dialog } from 'vant';
export default {
  name: "Login",
  data() {
    return {
      showPassword:false,
      mobile:'15397236229',
      password:"123456",
      code:'',
      timestamp: ''
    };
  },
  methods: {
    toReg(){
      this.$router.push({path:'/reg'})
    },
    togglePass(){
      this.showPassword = !this.showPassword
    },
    changeImgCode() {
        this.timestamp = (new Date()).valueOf();
      },
    check(){
      let mobileCheck = this.checkPhoneNum(this.mobile);
      let reg = /^[A-Za-z0-9]{6,20}$/;
        let codeCheck = this.checkInputStr(this.code);
        if (!mobileCheck) {
          Toast.fail('请输入正确手机号码');
          return
        }
        if (!reg.test(this.password)) {
          Toast.fail('密码有误');
          return
        }
        if (!codeCheck.status) {
          Toast.fail('验证码' + codeCheck.msg);
          return
        }
        this.login()
    },
    login(){
      Toast.loading({
          duration: 0,
          message: '提交中...',
          forbidClick: true
        });
        let data = {
          code: this.code,
          password:this.password,
          userName:this.mobile
        }
        axios.post('/user/login', qs.stringify(data)).then((res) => {
          console.log(res)
          Toast.clear()
          if(res.data.retCode==0){
            localStorage.setItem('userCode',res.data.data.userCode)
            this.$router.replace({path:'/index'})
          }else{
            this.changeImgCode()
            Toast.fail({
              duration: 1500,
              message: res.data.retMsg,
              forbidClick: true
            })
          }
          
        }).catch(()=>{
          
          Toast.clear()
          Toast.fail('服务器出错');
        })
    }
  },
  mounted() {}
};
</script>