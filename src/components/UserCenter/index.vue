<template>
  <div class="page">
    <van-nav-bar
      title="我的资料"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main user user-data">
      <div class="title">必要资料说明</div>
      <div class="wrapper">
        <van-cell title="" is-link value="不完整" to="/userPhotoUpload">
          <div slot="icon" class="item-icon">
            <img src="@/assets/img/icon_info_id.png" alt="">
          </div>
          <div class="item-title" slot="icon">
            <div class="con">
              <div class="up">身份信息</div>
              <div class="text">*让我们了解你的基本情况</div>
            </div>
          </div>
        </van-cell>
        <van-cell value="不完整" is-link to="/userData">
          <div slot="icon" class="item-icon">
            <img src="@/assets/img/icon_info_data.png" alt="">
          </div>
          <div class="item-title" slot="icon">
            <div class="con">
              <div class="up">资料信息</div>
              <div class="text">*然我们了解你的资料信息</div>
            </div>
          </div>
        </van-cell>
        <div class="btn-sub">立即借款</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserCenter",
  data() {
    return {
      userCode:'',
      isLogin:false,
    };
  },
  methods: {
    onClickLeft(){
      this.$router.go(-1)
    },
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
    }
  },
  mounted() {
    if(localStorage.getItem('userCode')){
      this.userCode = localStorage.getItem('userCode')
      this.isLogin = true
    }else{
      this.isLogin = false
    }
  }
};
</script>