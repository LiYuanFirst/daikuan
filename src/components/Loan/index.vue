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
        <div class="tt">{{applyAmount}}元 </div>
      </div>
      <div class="item">
        <div class="lt">还款期数</div>
        <div class="tt">{{lifeLoan}}个月</div>
      </div>
      <div class="item">
        <div class="lt">每期还款</div>
        <div class="tt">{{eachPayment}}元/月</div>
      </div>
      <div class="item">
        <div class="lt">年利率</div>
        <div class="tt">12.00%</div>
      </div>
      <div class="item">
        <div class="lt">申请时间</div>
        <div class="tt">{{createDate.slice(0,10)}}</div>
      </div>
      <div class="item">
        <div class="lt">发放卡号</div>
        <div class="tt">{{bankNo}}</div>
      </div>
      <div class="item">
        <div class="lt">申请状态</div>
        <div class="tt" :class="{wraing:status=='refuse',pass:status=='pass'||status=='agree'}">
          {{statusText}}
        </div>
      </div>
    </div>
    <div class="btn-sub" @click="onClickLeft" v-show="status!=='pass'">我知道了</div>
    <div class="btn-sub" @click="doChange" v-show="status=='pass'">立即申请放款</div>
  </div>
</template>

<script>
import axios from "axios";
  import qs from "qs";
  import { ActionSheet, Toast, Dialog } from 'vant';

export default {
  name: "Loan",
  data() {
    return {
      isShow:true,
      codeKey:'',
      applyAmount:'',
      bankNo:'',
      createDate:'',
      eachPayment:'',
      lifeLoan:'',
      status:'',
      statusText:''

    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    toApply(){
      this.$router.push({path:'/index'})
    },
    doChange(){
      Toast.loading({
        duration: 0,
        message: "提交中...",
        forbidClick: true
      });
      let data = {
            codeKey:this.codeKey,  
            status:'drawing'
          }
        axios.post('/loan/modifyUserLoanStatus', qs.stringify(data)).then((res) => {
            console.log(res)
            
            Toast.clear();
            if (res.data.retCode == 0) {
              Toast.success({
                duration: 1500,
                message: '提交成功！',
                forbidClick: true
              })
              this.queryData()
  
            }else if(res.data.retCode == 401){
              localStorage.removeItem('userCode')
              Dialog.alert({
                title: '提示',
                message: '登录失效，请先登录',
                confirmButtonText:'立即登录',
                confirmButtonColor:'#f4866c'
              }).then(() => {
                this.$router.push({path:'/login'})
              })
            } else {
              Toast.clear();
          Toast.fail("服务器出错");
              
            }
  
          }).catch(() => {
            Toast.clear();
          Toast.fail("服务器出错");
          })
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
        .post("loan/findUserLoan", qs.stringify(data))
        .then(res => {
          console.log(res);
          Toast.clear();
          if (res.data.retCode == 0) {
            this.applyAmount = res.data.data.applyAmount
            this.bankNo = res.data.data.bankNo
            this.codeKey = res.data.data.codeKey
            this.createDate = res.data.data.createDate
            this.eachPayment = res.data.data.eachPayment
            this.lifeLoan = res.data.data.lifeLoan
            this.modifyDate = res.data.data.modifyDate
            this.status = res.data.data.status
            switch (res.data.data.status) {
              case 'new':
                this.statusText="贷款申请审核中"
                break;
              case 'refuse':
                this.statusText="贷款审核未通过"
                break;
              case 'pass':
                this.statusText="贷款审核已通过"
                break;
              case 'drawing':
                this.statusText="放款申请已提交"
                break;
              case 'agree':
                this.statusText="已放款"
                break;
            }
          }else{
            this.isShow = false
          }
        })
        .catch(() => {
          Toast.clear();
          Toast.fail("服务器出错");
        });
    }
  },
  mounted() {
    if(localStorage.getItem('userCode')){
      this.userCode = localStorage.getItem('userCode')
      this.queryData()
    }else{
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