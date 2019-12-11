<template>
  <div class="page">
    <van-nav-bar title="我的资料" left-arrow @click-left="onClickLeft" />
    <div class="main user user-data">
      <div class="title">必要资料说明</div>
      <div class="wrapper">
        <van-cell title is-link :value="val1" to="/userPhotoUpload">
          <div slot="icon" class="item-icon">
            <img src="@/assets/img/icon_info_id.png" alt />
          </div>
          <div class="item-title" slot="icon">
            <div class="con">
              <div class="up">身份信息</div>
              <div class="text">*让我们了解你的基本情况</div>
            </div>
          </div>
        </van-cell>
        <van-cell :value="val2" is-link to="/userData">
          <div slot="icon" class="item-icon">
            <img src="@/assets/img/icon_info_data.png" alt />
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
import qs from "qs";
import { Toast, Dialog } from "vant";

export default {
  name: "UserCenter",
  data() {
    return {
      val1: "不完整",
      val2: "不完整",
      userCode: "",
      isLogin: false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    queryData() {
      let data = {
        userCode: localStorage.getItem("userCode")
      };
      Toast.loading({
        duration: 0,
        message: "加载中...",
        forbidClick: true
      });
      axios
        .post("/info/findUserInfo", qs.stringify(data))
        .then(res => {
          console.log(res);
          Toast.clear();
          if (res.data.retCode == 0) {
            this.val2 = "";
            if (
              res.data.data.idcardBack &&
              res.data.data.idcardFn &&
              res.data.data.idcardHand
            ) {
              this.val1 = "";
            }
          }else if(res.data.retCode == 401){
            localStorage.removeItem('userCode')
            Dialog.alert({
              title: '提示',
              message: '你好，请先登录',
              confirmButtonText:'立即登录',
              confirmButtonColor:'#f4866c'
            }).then(() => {
              this.$router.push({path:'/login'})
            })
          }
        })
        .catch(() => {
          Toast.clear();
          Toast.fail("服务器出错");
        });
    }
  },
  mounted() {
    if (localStorage.getItem("userCode")) {
      this.userCode = localStorage.getItem("userCode");
      this.isLogin = true;
      this.queryData();
    } else {
      this.isLogin = false;
    }
  }
};
</script>