<template>
  <div class="page photo">
    <van-nav-bar
      title="身份信息"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main user user-data">
      <!-- <div class="title">必要资料上传</div> -->
      <div class="wrapper">
        <div class="photoItem">
          <div class="img-show" v-show="fileFont.isRead">
            <img src="@/assets/img/ele_card_01.png" alt="">
            <div class="mask" 
              :style="'background:url('+fileFont.baseData+') center center / contain no-repeat;'"
              @click="priviewImg(fileFont.baseData)"
            ></div>
            
            <div class="delete" @click="deleteImg(fileFont)">
              <van-icon name="close" />
            </div>
          </div>
          <div class="upload-con"  v-show="!fileFont.isRead">
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
            <div class="mask" 
              :style="'background:url('+fileBack.baseData+') center center / contain no-repeat;'"
              @click="priviewImg(fileBack.baseData)"
            ></div>
            
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
            <div class="mask" 
              :style="'background:url('+fileHold.baseData+') center center / contain no-repeat;'"
              @click="priviewImg(fileHold.baseData)"
            ></div>
            
            <div class="delete" @click="deleteImg(fileHold)">
              <van-icon name="close" />
            </div>
          </div>
          <div class="upload-con"  v-show="!fileHold.isRead">
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
        <div class="btn-sub">确认提交</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ImagePreview } from 'vant';
export default {
  name: "User",
  data() {
    return {
      fileFont:{
        isRead:false,
        baseData:'',
        file:null
      },
      fileBack:{
        isRead:false,
        baseData:'',
        file:null
      },
      fileHold:{
        isRead:false,
        baseData:'',
        file:null
      }
    };
  },
  methods: {
    priviewImg(data){
      ImagePreview([
        data
      ]);
    },
    deleteImg(obj){
      obj.isRead = false
      obj.file = null
      obj.baseData = ""
    },
    onClickLeft(){
      this.$router.go(-1)
    },
    afterReadFont(file){
      console.log(file)
      this.fileFont.baseData = file.content
      this.fileFont.file = file.file
      this.fileFont.isRead = true
    },
    afterReadBack(file){
      console.log(file)
      this.fileBack.baseData = file.content
      this.fileBack.file = file.file
      this.fileBack.isRead = true
    },
    afterReadHold(file){
      console.log(file)
      this.fileHold.baseData = file.content
      this.fileHold.file = file.file
      this.fileHold.isRead = true
    }
  },
  mounted() {}
};
</script>