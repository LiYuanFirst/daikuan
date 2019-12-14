<template>
  <div class="page photo">
    <van-nav-bar title="身份信息" left-arrow @click-left="onClickLeft" />
    <div class="main user user-data">
      <!-- <div class="title">必要资料上传</div> -->
      <div class="wrapper">
        <div class="photoItem">
          <div class="img-show" v-show="fileFont.isRead">
            <img src="@/assets/img/ele_card_01.png" alt="">
            <div class="mask" :style="'background:url('+wwwUrl+fileFont.baseData+') center center / contain no-repeat;'"
              @click="priviewImg(fileFont.baseData)"></div>

            <div class="delete" @click="deleteImg(fileFont)">
              <van-icon name="close" />
            </div>
          </div>
          <div class="upload-con" v-show="!fileFont.isRead">
            <van-uploader :after-read="afterReadFont">
              <div class="upload-img-block">
                <img src="@/assets/img/ele_card_01.png" alt="">
              </div>
            </van-uploader>
          </div>
          <div class="text">上传身份证正面</div>
        </div>
        <div class="photoItem">
          <div class="img-show" v-show="fileBack.isRead">
            <img src="@/assets/img/ele_card_01.png" alt="">
            <div class="mask" :style="'background:url('+wwwUrl+fileBack.baseData+') center center / contain no-repeat;'"
              @click="priviewImg(fileBack.baseData)"></div>

            <div class="delete" @click="deleteImg(fileBack)">
              <van-icon name="close" />
            </div>
          </div>
          <div class="upload-con" v-show="!fileBack.isRead">
            <van-uploader :after-read="afterReadBack">
              <div class="upload-img-block">
                <img src="@/assets/img/ele_card_02.png" alt="">
              </div>
            </van-uploader>
          </div>
          <div class="text">上传身份证反面</div>
        </div>
        <div class="photoItem">
          <div class="img-show" v-show="fileHold.isRead">
            <img src="@/assets/img/ele_card_01.png" alt="">
            <div class="mask" :style="'background:url('+wwwUrl+fileHold.baseData+') center center / contain no-repeat;'"
              @click="priviewImg(fileHold.baseData)"></div>

            <div class="delete" @click="deleteImg(fileHold)">
              <van-icon name="close" />
            </div>
          </div>
          <div class="upload-con" v-show="!fileHold.isRead">
            <van-uploader :after-read="afterReadHold">
              <div class="upload-img-block">
                <img src="@/assets/img/ele_card_03.png" alt="">
              </div>
            </van-uploader>
          </div>

          <div class="text"> 上传手持身份证</div>
        </div>
        <div class="example">
          <div class="example-title">身份证拍摄示例</div>
          <div class="example-img">
            <img src="@/assets/img/ele_tips.png" alt="">
          </div>
        </div>
        <div class="btn-sub" v-show="showBtn" @click="postData">立即提交</div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import qs from "qs"
  import { ImagePreview } from 'vant';
  import { ActionSheet, Toast, Dialog } from 'vant';
  export default {
    name: "User",
    data() {
      return {
        wwwUrl:'/',
        userCode: '',
        actionUrl: '/info/insertUserInfo',
        isLogin: false,
        name: null,
        mobile: null,
        idcardNo: null,
        sex: null,
        homeAddress: null,
        workName: null,
        workYear: null,
        bankNo: null,
        bankName: null,
        bankDeposit: null,
        contactName: null,
        contactMobile: null,
        fileFont: {
          isRead: false,
          baseData: '',
          file: null
        },
        fileBack: {
          isRead: false,
          baseData: '',
          file: null
        },
        fileHold: {
          isRead: false,
          baseData: '',
          file: null
        },
        showBtn: true
      };
    },
    methods: {
      priviewImg(data) {
        ImagePreview([
          this.wwwUrl+data
        ]);
      },
      deleteImg(obj) {
        obj.isRead = false
        obj.file = null
        obj.baseData = ""
        this.showBtn = true
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      afterReadFont(file) {
        console.log(file)
        if (file.file.type != "image/jpeg" && file.file.type != "image/png") {
          this.$notify({
            message: "请选择JPG或PNG格式图片",
            duration: 1500,
            background: '#ff6600'
          });
        } else {
          Toast.loading({
            mask: true,
            message: '图片上传中...',
            duration: 0
          });
          //限制图片2M
          this.$imgCompress(file, 2).then((val) => {
            let formData = new FormData()
            formData.append("file", val.blob)
            let config = { headers: { 'Content-Type': 'multipart/form-data' } }
            axios.post("/fileUpload", formData, config).then(res => {
              let data = res.data;
              console.log(data)
              this.fileFont.baseData = data.data
              this.fileFont.file = data.data
              this.fileFont.isRead = true
              Toast.clear();
            }).catch(res => {
              Toast.clear();
              Toast.fail('上传失败');
            })
            Toast.clear()
          })

        }
        
      },
      afterReadBack(file) {
        console.log(file)
        if (file.file.type != "image/jpeg" && file.file.type != "image/png") {
          this.$notify({
            message: "请选择JPG或PNG格式图片",
            duration: 1500,
            background: '#ff6600'
          });
        } else {
          Toast.loading({
            mask: true,
            message: '图片上传中...',
            duration: 0
          });
          //限制图片2M
          this.$imgCompress(file, 2).then((val) => {
            let formData = new FormData()
            formData.append("file", val.blob)
            let config = { headers: { 'Content-Type': 'multipart/form-data' } }
            axios.post("/fileUpload", formData, config).then(res => {
              let data = res.data;
              console.log(data)
              this.fileBack.baseData = data.data
              this.fileBack.file = data.data
              this.fileBack.isRead = true
              Toast.clear();
            }).catch(res => {
              Toast.clear();
              Toast.fail('上传失败');
            })
            Toast.clear()
          })

        }
      },
      afterReadHold(file) {
        if (file.file.type != "image/jpeg" && file.file.type != "image/png") {
          this.$notify({
            message: "请选择JPG或PNG格式图片",
            duration: 1500,
            background: '#ff6600'
          });
        } else {
          Toast.loading({
            mask: true,
            message: '图片上传中...',
            duration: 0
          });
          //限制图片2M
          this.$imgCompress(file, 2).then((val) => {
            let formData = new FormData()
            formData.append("file", val.blob)
            let config = { headers: { 'Content-Type': 'multipart/form-data' } }
            axios.post("/fileUpload", formData, config).then(res => {
              let data = res.data;
              console.log(data)
              this.fileHold.baseData = data.data
              this.fileHold.file = data.data
              this.fileHold.isRead = true
              Toast.clear();
            }).catch(res => {
              Toast.clear();
              Toast.fail('上传失败');
            })
            Toast.clear()
          })

        }
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
          //已有用户信息
          if (res.data.retCode == 0) {
            let data = res.data.data
            this.actionUrl = '/info/modifyUserInfo'
            this.name = data.name
            this.mobile = data.mobile
            this.sex = data.sex
            this.idcardNo = data.idcardNo
            this.workName = data.workName
            this.workYear = data.workYear
            this.homeAddress = data.homeAddress
            this.bankNo = data.bankNo
            this.bankName = data.bankName
            this.bankDeposit = data.bankDeposit
            this.contactName = data.contactName
            this.contactMobile = data.contactMobile
            if (data.idcardBack) {
              this.fileBack.baseData = data.idcardBack
              this.fileBack.isRead = true
              this.fileBack.file = data.idcardBack
            }
            if (data.idcardFn) {
              this.fileFont.baseData = data.idcardFn
              this.fileFont.isRead = true
              this.fileFont.file = data.idcardFn
            }
            if (data.idcardHand) {
              this.fileHold.baseData = data.idcardHand
              this.fileHold.isRead = true
              this.fileHold.file = data.idcardHand
            }
            if (data.idcardFn && data.idcardBack && data.idcardHand) {
              this.showBtn = false
            }

          } else {
            this.showBtn = true
          }

        }).catch(() => {

          Toast.clear()
          Toast.fail('服务器出错');
        })
      },
      postData(){
        if(!this.fileFont.file){
          Toast.fail('请选择并上传身份证正面照片');
          return
        }
        if(!this.fileBack.file){
          Toast.fail('请选择并上传身份证反面照片');
          return
        }
        if(!this.fileHold.file){
          Toast.fail('请选择并上传手持身份证照片');
          return
        }
        Toast.loading({
          duration: 0,
          message: '提交中...',
          forbidClick: true
        });
        let json = {
          name: this.name,
          mobile: this.mobile,
          sex: this.sex,
          idcardNo: this.idcardNo,
          workName: this.workName,
          workYear: this.workYear,
          homeAddress: this.homeAddress,
          bankName: this.bankName,
          bankNo: this.bankNo,
          bankDeposit: this.bankDeposit,
          contactName: this.contactName,
          contactMobile: this.contactMobile,
          idcardFn:this.fileFont.file,
          idcardBack:this.fileBack.file,
          idcardHand:this.fileHold.file,
          userCode: localStorage.getItem('userCode')
        }
        let data = {
          json: JSON.stringify(json)
        }
        axios.post(this.actionUrl, qs.stringify(data)).then((res) => {
          console.log(res)
          Toast.clear()
          if (res.data.retCode == 0) {
            Toast.success({
              duration: 1500,
              message: '提交成功！',
              forbidClick: true
            })
            this.isDisabled = true
          } else {
            Toast.fail('提交失败，请稍后重试');
          }

        }).catch(() => {

          Toast.clear()
          Toast.fail('服务器出错');
        })
      },
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