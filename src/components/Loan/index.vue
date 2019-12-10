<template>
  <div class="page loan">
    <van-nav-bar title="贷款信息" left-arrow @click-left="onClickLeft" :border="false"/>
    <div class="header">
      <img src="@/assets/img/loanHeader.png" alt="">
      
    </div>
    <div class="noData" v-show="!isShow">
      <div class="img-con">
        <img src="@/assets/img/noLoan.png" alt="">
      </div>
      <div class="text">您还未提交任何借款申请哦！</div>
      <div class="btn-sub" @click="toApply">立即申请</div>
    </div>
    <div class="card" v-show="isShow">
      <div class="item">
        <div class="lt">审批额度</div>
        <div class="tt">500000.00元 </div>
      </div>
      <div class="item">
        <div class="lt">审批期限</div>
        <div class="tt">36月</div>
      </div>
      <div class="item">
        <div class="lt">月利率</div>
        <div class="tt">7.00%</div>
      </div>
      <div class="item">
        <div class="lt">合同有效期</div>
        <div class="tt">20190504—20190504</div>
      </div>
      <div class="item">
        <div class="lt">发放卡号</div>
        <div class="tt">62172099234276643984</div>
      </div>
      <div class="item">
        <div class="lt">申请状态</div>
        <div class="tt">
          正在审核中
        </div>
      </div>
    </div>
    <div class="btn-sub" v-show="isShow">我知道了</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Loan",
  data() {
    return {
      isShow:false
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toApply(){
      this.$router.push({path:'/index'})
    }
  },
  mounted() {}
};
</script>