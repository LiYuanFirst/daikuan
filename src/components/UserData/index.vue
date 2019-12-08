<template>
  <div class="page">
    <van-nav-bar title="资料信息" left-arrow @click-left="onClickLeft" />
    <div class="main user user-data person-data">
      <div class="title">本人信息</div>
      <div class="wrapper">
        <van-field
          v-model="name"
          clearable
          label="姓名"
          placeholder="请输入用户名"
        />
        <van-field
          v-model="mobile"
          type="tel"
          label="手机号码"
          placeholder="请输入手机号码"
        />
        <van-cell title="性别" is-link :value="sex" @click="showSexChose=true"/>
        <van-field
          v-model="idcardNo"
          clearable
          label="身份证号"
          placeholder="请输入身份证号码"
        />
        <van-field
          v-model="workName"
          label="工作单位"
          type="textarea"
          rows="1"
          autosize
          placeholder="请输入工作单位地址"
        />
        <van-cell title="工作年限">
          <div class="workTime" slot="default">
            <van-stepper v-model="workYear" :min="0" input-width="40px" button-size="42px"/>
            <span class="year">年</span>
          </div>
        </van-cell>
        
        
        <van-field
          v-model="homeAddress"
          label="家庭住址"
          type="textarea"
          rows="1"
          autosize
          placeholder="请输入家庭住址"
        />
      </div>
      <div class="title">放款银行信息</div>
      <div class="wrapper">
        <van-field
          v-model="bankNo"
          type="number"
          label="银行卡号"
          placeholder="请输入放款银行卡号"
        />
        <van-field
          v-model="bankName"
          label="所属银行"
          placeholder="请输入所属银行"
        />
        <van-field
          v-model="bankDeposit"
          label="开户行"
          placeholder="请输入开户行"
        />
      </div>
      <div class="title">紧急联系人信息</div>
      <div class="wrapper">
        <van-field
          v-model="contactName"
          label="姓名"
          placeholder="请输入紧急联系人姓名"
        />
        <van-field
          v-model="contactMobile"
          label="手机号码"
          type="tel"
          placeholder="请输入紧急联系人手机号码"
        />
      
        <div class="btn-sub">立即提交</div>
      </div>
    </div>
    <van-actionsheet v-model="showSexChose" :actions="sexList" @select="onSelectSex" />
  </div>
</template>

<script>
import axios from "axios";
import { ActionSheet } from 'vant';
export default {
  name: "UserCenter",
  data() {
    return {
      showSexChose: false,
      sexList:[
        { name: '男' },
        { name: '女' },
      ],
      name:"",
      mobile:'',
      idcardNo:"",
      sex:'请选择性别',
      homeAddress:'',
      workName:'',
      workYear:1,
      bankNo:'',
      bankName:"",
      bankDeposit:"",
      contactName:'',
      contactMobile:''
    };
  },
  methods: {
    onSelectSex(item){
      this.sex = item.name
      this.showSexChose = false
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    loginOut() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认退出？"
        })
        .then(() => {
          this.$router.push({ path: "/index" });
        })
        .catch(() => {});
    }
  },
  mounted() {}
};
</script>