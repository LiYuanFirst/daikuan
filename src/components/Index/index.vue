<template>
  <div class="page">
    <div class="header">
      <img src="@/assets/img/home_banner.png" alt />
    </div>
    <div class="main">
      <div class="money">
        <div class="title">申请金额(元)</div>
        <div class="num">{{loanAmount}}</div>
      </div>
      <div class="step">
        <div class="step-btn jian" @click="reduce"><img src="@/assets/img/jian.png" alt=""></div>
        <div class="step-con">
          <van-slider v-model="stepNum" :step="5" bar-height="20px" active-color="#f9b5a5" :min="5">
          <div
            slot="button"
            class="custom-button"
          >
          <img src="@/assets/img/ele_crown.png" alt="">
          </div>
          
        </van-slider>
        </div>
        <div class="step-btn add" @click="add"><img src="@/assets/img/add.png" alt=""></div>
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
            <span class="mount">{{repayment}}元</span>
            <span class="point">（含年利率12%,，￥{{interest}}元）</span>
          </div>
        </div>
      </div>
      <div class="agreement" :class="isAgreen?'active':''">
        <span class="icon" @click="toggleAgreen"><van-icon name="success" /></span><span class="agree" @click="toggleAgreen">同意</span><span class="text">《借款协议》</span>
      </div>
      <div class="btn-sub" @click="sub">立即申请</div>
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
  import qs from "qs";
import { Toast, Dialog } from 'vant';
export default {
  name: "Index",
  data() {
    return {
      stepNum:90,
      active: 0,
      isAgreen:true,
      userCode:'',
      isLogin:false,
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
    },
    add(){
      console.log(this.stepNum)
      if(this.stepNum<100){
        this.stepNum+=5
      }else{
        return
      }
    },
    reduce(){
      console.log(this.stepNum)
      if(this.stepNum>5){
        this.stepNum-=5
      }
    },
    sub(){
      if(!this.isAgreen){
        Toast.fail('请先阅读并同意《借款协议》');
          return
      }
      if(!this.isLogin){
        Dialog.confirm({
              title: '提示',
              message: '请先登录，并完善个人信息',
              confirmButtonText:'立即登录',
              confirmButtonColor:'#f4866c'
            }).then(() => {
              this.$router.push({path:'/login'})
            })
          return
      }
      this.getBaseData()
    },
    getBaseData(){
      let data = {
          userCode: localStorage.getItem('userCode')
        }
        Toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true
        });
        axios.post('/info/findUserInfo', qs.stringify(data)).then((res) => {
          console.log(res)
          Toast.clear()
          if (res.data.retCode == 0) {
            let json = {
                userCode:localStorage.getItem('userCode'),
                lifeLoan:this.stages,
                applyAmount:this.loanAmount,
                eachPayment:this.repayment,
                bankNo:res.data.data.bankNo
              }
              let data = {
                json: JSON.stringify(json)
              }
              this.doApply(data);

              return
            if(res.data.data.idcardBack&&res.data.data.idcardFn&&res.data.data.idcardHand){
              let json = {
                userCode:localStorage.getItem('userCode'),
                lifeLoan:this.stages,
                applyAmount:this.loanAmount,
                eachPayment:this.interest,
                bankNo:res.data.data.bankNo
              }
              let data = {
                json: JSON.stringify(json)
              }
              this.doApply(data);
            }else{
              Dialog.confirm({
                title: '提示',
                message: '请先上传个人证照',
                confirmButtonText:'立即上传',
                confirmButtonColor:'#f4866c'
              }).then(() => {
                this.$router.push({path:'/userPhotoUpload'})
              })
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
          }else if(res.data.retCode == 400){
            Dialog.alert({
              title: '提示',
              message: '你好，你已被限制使用本网站',
              confirmButtonText:'确认',
              confirmButtonColor:'#f4866c'
            }).then(() => {
            })
          } else {
            Dialog.confirm({
              title: '提示',
              message: '请完善个人信息后再申请',
              confirmButtonText:'立即上传',
              confirmButtonColor:'#f4866c'
            }).then(() => {
              this.$router.push({path:'/userCenter'})
            })
          }

        }).catch(() => {

          Toast.clear()
          Toast.fail('服务器出错');
        })
    },
    doApply(data){
        Toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true
        });
        axios.post('/loan/insertUserLoan', qs.stringify(data)).then((res) => {
          console.log(res)
          Toast.clear()
          if(res.data.retCode==0){
            Dialog.alert({
              title: '提示',
              message: '申请成功，请耐心等待工作人员审核',
              confirmButtonText:'确认',
              confirmButtonColor:'#f4866c'
            }).then(() => {
              this.$router.push({path:'/user'})
            })
          }else if(res.data.retCode==-1){
            Dialog.alert({
              title: '提示',
              message: '您尚有未完成贷款，无法进行申请',
              confirmButtonText:'确认',
              confirmButtonColor:'#f4866c'
            }).then(() => {

            })
          }else{
            Dialog.alert({
              title: '提示',
              message: '提交失败，请稍后重试',
              confirmButtonText:'确认',
              confirmButtonColor:'#f4866c'
            }).then(() => {

            })
          }
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
    
  },
  watch:{
    
  },
  computed:{
    loanAmount(){
      return (this.stepNum*2000).toFixed(2)
    },
    repayment(){
      let amountTotal = parseInt(this.loanAmount) *112/100 
      let stages = this.stages
      let amountMonth = amountTotal/stages
      return (Math.round(amountMonth*100))/100
    },
    interest(){
      let amountTotal = parseInt(this.loanAmount) *12/100 
      let stages = this.stages
      let amountMonth = amountTotal/stages
      return (Math.round(amountMonth*100))/100
    }
  }
};
</script>