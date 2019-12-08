<template>
  <div class="page">
    <div class="header">
      <img src="@/assets/img/home_banner.png" alt />
    </div>
    <div class="main">
      <div class="money">
        <div class="title">申请金额(元)</div>
        <div class="num">10000.00</div>
      </div>
      <div class="step">
        <div class="step-btn jian"><img src="@/assets/img/jian.png" alt=""></div>
        <div class="step-con">
          <van-slider v-model="value" :step="5" bar-height="20px" active-color="#f9b5a5" :min="5">
          <div
            slot="button"
            class="custom-button"
          >
          <img src="@/assets/img/ele_crown.png" alt="">
          </div>
          
        </van-slider>
        </div>
        <div class="step-btn add"><img src="@/assets/img/add.png" alt=""></div>
      </div>
      <div class="term">
        <div class="title">借款期限</div>
        <div class="term-con">
          <div class="con-padding">
            <div class="term-btn" :class="stages==6?'active':''" @click="choseMonth(6)">6个月</div>
            <div class="term-btn" :class="stages==12?'active':''" @click="choseMonth(12)">12个月</div>
            <div class="term-btn" :class="stages==24?'active':''" @click="choseMonth(24)">24个月</div>
          </div>
        </div>
        <div class="repayment">
          <div class="lt">每期还款</div>
          <div class="rt">
            <span class="mount">900.00元</span>
            <span class="point">（含日利率0.0333%,，￥68.00元）</span>
          </div>
        </div>
      </div>
      <div class="agreement" :class="isAgreen?'active':''">
        <span class="icon" @click="toggleAgreen"><van-icon name="success" /></span><span class="agree" @click="toggleAgreen">同意</span><span class="text">《借款协议》</span>
      </div>
      <div class="btn-sub">立即申请</div>
    </div>
    <van-tabbar v-model="active" active-color="#f4866c">
      <van-tabbar-item>
        <span>首页</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon[0].active : icon[0].inactive" />
      </van-tabbar-item>
      <van-tabbar-item to="/user">
        <span>个人中心</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon[1].active : icon[1].inactive" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Index",
  data() {
    return {
      value:20,
      active: 0,
      isAgreen:true,
      stages:6,
      icon: [{
        active: require('@/assets/img/icon_home_selected.png'),
        inactive: require('@/assets/img/icon_home.png')
      },{
        active: require('@/assets/img/icon_personal_selected.png'),
        inactive: require('@/assets/img/icon_personal.png')
      }]
    };
  },
  methods: {
    toggleAgreen(){
      this.isAgreen = !this.isAgreen
    },
    choseMonth(month){
      this.stages = month
    }
  },
  mounted() {}
};
</script>