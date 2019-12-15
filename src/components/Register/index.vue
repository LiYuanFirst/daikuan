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
          <input type="text" v-model="code" placeholder="请输入验证码">
        </div>
        <div class="img" @click="changeImgCode">
          <img :src="'/loanstreasure/user/getImgCode?'+timestamp" alt="">
        </div>
      </div>
      <div class="toRegister">
        已有账号，<span @click="toLogin">立即登录>></span>
      </div>

      <div class="btn-sub" @click="btnClick">立即注册</div>
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
        showPassword: false,
        mobile: '',
        password1: "",
        password2: "",
        code: '',
        timestamp: ''
      };
    },
    methods: {
      toLogin() {
        this.$router.replace({ path: '/login' })
      },
      btnClick() {
        let mobileCheck = this.checkPhoneNum(this.mobile);
        let reg = /^[A-Za-z0-9]{6,20}$/;
        let codeCheck = this.checkInputStr(this.code);
        if (!mobileCheck) {
          Toast.fail('请输入正确手机号码');
          return
        }
        if (!reg.test(this.password1)) {
          Toast.fail('设置密码必须为6~20位字母、数字组合');
          return
        }
        if (this.password1 != this.password2) {
          Toast.fail('两次密码输入不一致');
          return
        }
        if (!codeCheck.status) {
          Toast.fail('验证码' + codeCheck.msg);
          return
        }
        this.doRegister()

      },
      doRegister() {
        Toast.loading({
          duration: 0,
          message: '提交中...',
          forbidClick: true
        });
        let json = {
            mobile:this.mobile,
            password:this.password1,
            userName:this.mobile
          }
        let data = {
          code: this.code,
          json: JSON.stringify(json)
        }
        axios.post('/loanstreasure/user/loginRegister', qs.stringify(data)).then((res) => {
          console.log(res)
          Toast.clear()
          if(res.data.retCode==0){
            
            localStorage.setItem('userCode',res.data.data.userCode)
            Toast.success({
              duration: 1500,
              message: '注册成功！',
              forbidClick: true
            })
            Dialog.confirm({
              title: '注册成功',
              message: '立即完善个人信息'
            }).then(() => {
              localStorage.setItem('userCode',res.data.data.userCode)
              this.$router.replace({path:'/userCenter'})
            }).catch(() => {
              this.$router.replace({path:'/index'})
            })
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
      },
      changeImgCode() {
        this.timestamp = (new Date()).valueOf();
      },
      choseMonth(month) {
        this.stages = month
      },
      togglePass() {
        this.showPassword = !this.showPassword
      }
    },
    mounted() { }
  };
</script>