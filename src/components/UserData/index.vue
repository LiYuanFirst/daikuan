<template>
  <div class="page">
    <van-nav-bar title="资料信息" left-arrow right-text="修改" @click-left="onClickLeft" @click-right="onClickRight"
      :border="false" v-show="isDisabled" />
    <van-nav-bar title="资料信息" left-arrow @click-left="onClickLeft" :border="false" v-show="!isDisabled" />

    <div class="main user user-data person-data" style="padding-bottom: 100px;">
      <div class="title">本人信息</div>
      <div class="wrapper">
        <van-field v-model="name" clearable label="姓名" :disabled="isDisabled" placeholder="请输入用户名" />
        <van-field v-model="mobile" type="tel" label="手机号码" :disabled="true" placeholder="请输入手机号码" />
        <van-cell title="性别" is-link :value="sex" @click="showSex" />
        <van-field v-model="idcardNo" clearable label="身份证号" placeholder="请输入身份证号码" />
        <van-field v-model="workName" label="工作单位" type="textarea" :disabled="isDisabled" rows="1" autosize
          placeholder="请输入工作单位地址" />
        <van-cell title="工作年限">
          <div class="workTime" slot="default">
            <van-stepper :disabled="isDisabled" v-model="workYear" :min="0" input-width="40px" button-size="42px" />
            <span class="year">年</span>
          </div>
        </van-cell>


        <van-field v-model="homeAddress" label="家庭住址" type="textarea" rows="1" autosize :disabled="isDisabled"
          placeholder="请输入家庭住址" />
      </div>
      <div class="title">放款银行信息</div>
      <div class="wrapper">
        <van-field v-model="bankNo" type="number" label="银行卡号" :disabled="isDisabled" placeholder="请输入放款银行卡号" />
        <van-field v-model="bankName" label="所属银行" :disabled="isDisabled" placeholder="请输入所属银行" />
        <van-field v-model="bankDeposit" label="开户行" :disabled="isDisabled" placeholder="请输入开户行" />
      </div>
      <div class="title">紧急联系人信息</div>
      <div class="wrapper">
        <van-field v-model="contactName" :disabled="isDisabled" label="姓名" placeholder="请输入紧急联系人姓名" />
        <van-field v-model="contactMobile" label="手机号码" :disabled="isDisabled" type="tel" placeholder="请输入紧急联系人手机号码" />

        <div class="btn-sub" v-show="!isDisabled">立即提交</div>
      </div>
    </div>
    <van-actionsheet v-model="showSexChose" :actions="sexList" @select="onSelectSex" />
  </div>
</template>

<script>
  import axios from "axios";
  import qs from "qs";
  import { ActionSheet, Toast, Dialog } from 'vant';
  export default {
    name: "UserCenter",
    data() {
      return {
        userCode: '',
        isLogin: false,
        showSexChose: false,
        sexList: [
          { name: '男' },
          { name: '女' },
        ],
        name: "",
        mobile: '',
        idcardNo: "",
        sex: '请选择性别',
        homeAddress: '',
        workName: '',
        workYear: 1,
        bankNo: '',
        bankName: "",
        bankDeposit: "",
        contactName: '',
        contactMobile: '',
        isDisabled: true
      };
    },
    methods: {
      showSex() {
        if (!this.isDisabled) {
          this.showSexChose = true
        }
      },
      onSelectSex(item) {
        this.sex = item.name
        this.showSexChose = false
      },
      onClickLeft() {
        this.$router.go(-1);
      },
      onClickRight() {
        this.isDisabled = false
      },
      queryData() {
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

          } else {
            this.changeImgCode()
            Toast.fail({
              duration: 1500,
              message: res.data.retMsg,
              forbidClick: true
            })
          }

        }).catch(() => {

          Toast.clear()
          Toast.fail('服务器出错');
        })
      }
    },
    mounted() {
      if (localStorage.getItem('userCode')) {
        this.userCode = localStorage.getItem('userCode')
        this.isLogin = true
        this.queryData()
      } else {
        this.isLogin = false
      }
    }
  };
</script>