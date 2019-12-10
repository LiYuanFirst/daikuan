import Vue from 'vue'
import EXIF from 'exif-js'
// 截取url参数
Vue.prototype.getParameter = function (name) {
  let url = location.href
  let urlStr = url.substring(url.indexOf('?') + 1)
  let reg = `(^|&)${name}=([^&]*)(&|$)`
  let r = urlStr.match(reg)
  if (r != null) {
    return unescape(r[2])
  } else {
    return null
  }
}
// 验证input内容(不能包含空格)
Vue.prototype.checkInputStr = function (str) {
  if (str.length == 0) {
    let res = {
      status: false,
      msg: '不能为空'
    }
    return res
  } else if (str.indexOf(" ") > -1) {
    let res = {
      status: false,
      msg: '不能含有空格'
    }
    return res
  } else{
    let res = {
      status: true,
      msg: ''
    }
    return res
  }
}
// 验证手机号码
Vue.prototype.checkPhoneNum = function (inputString) {
  var partten = /^1\d{10}$/;
  if (partten.test(inputString)) {
    return true;
  }else {
    return false;
  };
}
//身份证号合法性验证 
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
Vue.prototype.IdentityCodeValid = function(code) {
  var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
  var tip = "";
  var pass = true;

  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    tip = "身份证号格式错误";
    pass = false;
  }else if (!city[code.substr(0, 2)]) {
    //地址编码出错
    tip = "身份证号格式错误";
    pass = false;
  }else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split('');
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        //校验位出错
        tip = "身份证号码有误";
        pass = false;
      }
    }
  }
  return {status: pass, msg: tip}
}
// // 图片压缩，file——文件，maxSize——上传图片限制大小M
Vue.prototype.$imgCompress = function (file,maxSize) {
  return new Promise((resolve, reject) => {
    let image = new Image()
        let scale = 1//图片压缩比
        if (file.file.size / 1024 / 1024 > maxSize) {
          scale = ((1024*1024*maxSize)/file.file.size).toFixed(6)
          console.log(scale)
        }
        image.src= file.content

        image.onload=function(){
          
          EXIF.getData(image, function(){
            //照片方向信息
            let Orientation = EXIF.getAllTags(this).Orientation; 
            console.log('Orientation')
            console.log('Orientation:'+Orientation)
            const originalWidth = image.width
            const originalHeight = image.height
            const canvasWidth = parseInt(originalWidth*scale)
            const canvasHeight = parseInt(originalHeight*scale)
            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            let imgData = null
            // canvas.width = canvasWidth
            // canvas.height = canvasHeight
            // context.drawImage(image,0,0,canvasWidth,canvasHeight)
            // canvas.toBlob((blob)=>{
            //   resolve(blob)
            // },file.file.type)
            switch(Orientation){
              //顺时针旋转90度
              case 6:
                  canvas.width = canvasHeight 
                  canvas.height = canvasWidth
                  context.rotate(Math.PI / 2)
                  context.drawImage(image,0,-canvasHeight,canvasWidth,canvasHeight)
                  imgData = canvas.toDataURL(file.file.type)
                  //使用toDataURL将canvas上的图片转换为base64格式
                  canvas.toBlob((blob)=>{
                    resolve({blob,imgData})
                  },file.file.type)
                break;
              //旋转-90度
              case 8:
                  canvas.width = canvasHeight 
                  canvas.height = canvasWidth
                  context.rotate(-Math.PI / 2)
                  context.drawImage(image,-canvasWidth,0,canvasWidth,canvasHeight)
                  imgData = canvas.toDataURL(file.file.type)
                  //使用toDataURL将canvas上的图片转换为base64格式
                  canvas.toBlob((blob)=>{
                    resolve({blob,imgData})
                  },file.file.type)
                break;
              case 3:     // 旋转180度
                canvas.width = canvasWidth 
                canvas.height = canvasHeight
                context.rotate(Math.PI)
                context.drawImage(image,-canvasWidth,-canvasHeight,canvasWidth,canvasHeight)

                imgData = canvas.toDataURL(file.file.type)
                  //使用toDataURL将canvas上的图片转换为base64格式
                  canvas.toBlob((blob)=>{
                    resolve({blob,imgData})
                  },file.file.type)
                break;
              default:
                  canvas.width = canvasWidth 
                  canvas.height = canvasHeight
                  context.drawImage(image,0 ,0,canvasWidth,canvasHeight)
                  imgData = canvas.toDataURL(file.file.type)
                  //使用toDataURL将canvas上的图片转换为base64格式
                  canvas.toBlob((blob)=>{
                    resolve({blob,imgData})
                  },file.file.type)
                  break;
            }  
          })  
        };
  })
}

