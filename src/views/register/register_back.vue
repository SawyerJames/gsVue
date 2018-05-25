<template>
  <div :class="['register',{'registerOld': registerChooseState == 1}]">
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <!-- loading组件 -->
    <loading v-if="loading"></loading>
    <!-- 验证提示 -->
    <h1 class="validate" v-if="validate">{{validate}}</h1>
    <!-- 老用户信息 -->
    <div class="register-model flexRow" v-if="registerChooseState == 1">
      <span class="register-title">原有信息</span>
      <span class="register-msg oldUserMsg">{{car_number}}</span>
    </div>
    <!-- 联系方式绑定 -->
    <div class="register-model flexRow">
      <span class="register-title">联系方式</span>
      <input type="number" maxlength="11" class="register-msg" v-model="user.phone" placeholder="请输入您的联系方式" />
    </div>
    <!-- 输入验证码 -->
    <div class="register-model flexRow">
      <span class="register-title">验证号码</span>
      <input type="tel" name="code" maxlength="6" placeholder="请输入验证码" v-model.trim="user.code"></input>
      <!-- 获取验证码按钮 -->
      <button type="button" @click="getCode()" :disabled="!showVer" class="verificationBtn borderBox">
        <span v-show="showVer">获取验证码</span>
        <span v-show="!showVer" class="count">重新获取({{count}}s)</span>
      </button>
    </div>
    <!-- 图片上传模块 -->
    <div class="uploadImgContent" v-if="registerChooseState == 0">
      <!-- 图片上传组件 slot插槽增加样式 -->
      <uploadImg @popBaseImg="popBaseImg_1">
        <img src="../../assets/common/add_1.png">
        <p>请上传<span style="color: #f8624a">行驶证</span>(主页)</p>
      </uploadImg>
      <!-- 图片上传组件 slot插槽增加样式 -->
      <uploadImg @popBaseImg="popBaseImg_2">
        <img src="../../assets/common/add_2.png">
        <p>请上传<span style="color: #f8624a">行驶证</span>(副页)</p>
      </uploadImg>
    </div>
    <!-- 用户协议 -->
    <div class="agreementContent flexCol" v-if="registerChooseState == 0">
      <p class="agreeMsg sign">请将行驶证及手机摆横拍摄</p>
      <p class="agreeMsg sign">请将行驶证对焦拍摄，确保字体清晰</p>
      <div class="agreeChooseContent sign flexRow borderBox">
        <!-- <div class="agreeChooseInput flexRow"> -->
        <input class="agreeCheckbox" type="checkbox" v-model="checked" />
        <span>我已阅读并同意</span>
        <!-- </div> -->
        <router-link tag="span" to="/registerTxt" class="registerTxt">&lt;&lt;无感付用户协议&gt;&gt;</router-link>
      </div>
    </div>
    <!-- 绑定按钮 -->
    <div class="submitBtnContent flexRow">
      <button type="button" class="submitBtn" @click="postMsg">绑定</button>
    </div>
  </div>
</template>
<script>
import uploadImg from '../../components/uploadImg'
export default {
  name: 'register',
  data() {
    return {
      loading: false,
      checked: false,
      // 报错弹窗
      errShow: false,
      errTxt: '',
      // 用户信息
      user: {
        phone: '',
        code: '',
        file1: '',
        file_back: ''
      },
      // 老用户信息
      userId: 0,
      car_number: '',
      registerChooseState: 0,
      // 校验
      validate: '',
      // 验证码
      showVer: true,
      count: '',
      timer: null,
      TIME_COUNT: 60,
    }
  },
  mounted() {
    let that = this;
    // 全局读取判别老用户是否选择了一键绑定,选择了则加载原有信息
    if (this.$store.state.registerChooseState == 1) {
      this.registerChooseState = 1;
      // 拉取老用户原有信息
      this.$tools.GetDataFromServer(
        this,
        this.$api.getOldUserMsg,
        function success(res) {
          // 接口成功
          if (res.data.state == 0) {
            that.car_number = res.data.data.car_number;
            that.userId = res.data.data.id;
          }
        },
        function error(err) {
          that.errShow = true;
          that.errTxt = '网络错误,请刷新重试';
        }
      )
    }
  },
  activated() {
    // 试图获取注册选择页数据: 0 => 重新绑定， 1 => 一键绑定
    if (this.$store.state.registerChooseState == 1) {
      this.registerChooseState = 1;
    } else {
      this.registerChooseState = 0;
    }
    // 载入后初始化信息
    this.showVer = true;
    this.count = '';
    this.timer = null;
    this.TIME_COUNT = 60;
    this.user.code = '';
    document.title = '绑定中心';
  },
  methods: {
    getCode() {
      let that = this;
      var phoneRe = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      // 获取验证码
      if (phoneRe.test(this.user.phone)) {
        // 如果不为空的定时器
        if (!this.timer) {
          // 开始计数
          this.count = this.TIME_COUNT;
          this.showVer = false;
          // 定时器读秒
          this.timer = setInterval(() => {
              if (this.count > 1 && this.count <= this.TIME_COUNT) {
                this.count--;
              } else {
                this.showVer = true;
                clearInterval(this.timer);
                this.timer = null;
              }
            }, 1000)
            // 开始获取验证码
          this.$tools.PostDataToServer(
            this,
            this.$api.getCode, {
              phone: this.user.phone
            },
            function success(res) {
              if (res.data.errmsg != "OK") {
                that.validate = '验证码发送失败'
                setTimeout(function() {
                  that.validate = ''
                }, 2000);
              }
            },
            function error(err) {
              that.errShow = true;
              that.errTxt = '网络错误,请刷新重试';
              var errLoading = setTimeout(function() {
                that.errShow = false;
                that.errTxt = ''
                clearTimeout(errLoading);
              }, 2000);
            }
          )
        }
      } else {
        this.validate = '手机号码格式不正确'
        setTimeout(function() {
          that.validate = ''
        }, 2000);
      }
    },
    // 图片上传
    popBaseImg_1(baseImg) {
      this.user.file1 = baseImg;
    },
    popBaseImg_2(baseImg) {
      this.user.file_back = baseImg;
    },
    // 上传接口
    postMsg() {
      var that = this;
      // 获取用户信息
      var phone = this.user.phone,
        code = this.user.code;
      // 正则
      var phoneRe = /^[1][3,4,5,7,8,9][0-9]{9}$/,
        verificationRe = /^\d{6}$/;
      // 表单验证：手机号
      if (phoneRe.test(phone)) {
        // 验证码
        if (verificationRe.test(code)) {
          // 老用户直接发送手机号验证码，新用户需要填写驾驶证，用户协议
          if (this.$store.state.registerChooseState == 1) {
            // 如果是老用户,发送id,手机号及验证码
            this.$tools.PostDataToServer(
              this,
              this.$api.bindOldUser, {
                id: this.userId,
                phone: this.user.phone,
                code: this.user.code
              },
              function success(res) {
                that.loading = false;
                // 跳转页面
                if (res.data.state == 0) {
                  that.validate = '欢迎回来~';
                  setTimeout(function() {
                    that.validate = '';
                    location.replace(document.referrer);
                  }, 2000);
                } else {
                  that.validate = res.data.msg;
                  setTimeout(function() {
                    that.validate = '';
                  }, 2000);
                }
              },
              function error(err) {
                that.errShow = true;
                that.errTxt = '网络错误,请刷新重试';
              }
            )
          } else {
            // 驾驶证
            if (this.user.file1 != '' && this.user.file_back != '') {
              // 用户协议
              if (this.checked == true) {
                this.validate = '';
                this.loading = true;
                // 发送图片base64位数据
                this.$tools.PostDataToServer(
                  this,
                  this.$api.postRegister,
                  this.user,
                  function success(res) {
                    that.loading = false;
                    // 接口调通
                    if (res.data.state == 0) {
                      that.validate = res.data.data;
                      setTimeout(function() {
                        that.validate = ''
                        location.replace(document.referrer);
                      }, 2000);
                    }
                    // 如果信息不对
                    else {
                      that.validate = res.data.msg;
                      setTimeout(function() {
                        that.validate = ''
                      }, 2000);
                    }
                  },
                  function error(err) {}
                )
              } else {
                that.validate = '您未同意用户缴费协议'
                setTimeout(function() {
                  that.validate = ''
                }, 2000);
              }
            } else {
              that.validate = '上传信息不完整，缺少照片'
              setTimeout(function() {
                that.validate = ''
              }, 2000);
            }
          }
        } else {
          that.validate = '验证码不正确'
          setTimeout(function() {
            that.validate = ''
          }, 2000);
        }
      } else {
        that.validate = '手机号码格式不正确'
        setTimeout(function() {
          that.validate = ''
        }, 2000);
      }
    }
  },
  components: {
    uploadImg
  }
}
</script>
<style scoped>
.register {
  width: 100%;
  height: 100%;
  background: #F8F8F8;
}

.registerOld {
  background: url(../../assets/common/commonBg.png) no-repeat bottom;
  background-size: contain;
}


/*基础模板*/

.register-model {
  width: 95%;
  margin: 0 auto;
  height: 3rem;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  -ms-align-items: center;
  align-items: center;
}

.register-model:last-child,
.register-model.noBorder {
  border: none;
}


/*表单input 通用样式*/

.register-model .register-title {
  font-size: .875rem;
  font-weight: bold;
  color: #333;
  width: 4rem;
  margin-left: 1rem;
}

.register-model input[type="text"],
.register-model input[type="tel"],
.register-model .register-msg {
  min-width: 6rem;
  height: 2rem;
  outline: none;
  border: none;
  background: #ECECEC;
  border-radius: .5rem;
  font-size: .875rem;
  color: #4F4F4F;
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  -o-flex: 1;
  flex: 1;
}

.register-model .register-msg {
  line-height: 2rem;
}


/*老用户信息*/

.register-model .oldUserMsg {
  text-align: center;
  background: #fff;
  color: #333;
  border: 1px solid #999;
}


/*获取验证码 按钮*/

.register .verificationBtn {
  min-width: 6rem;
  height: 2rem;
  border: 1px solid #999;
  border-radius: .5rem;
  margin: 0 .5rem;
  padding: .2rem .5rem;
  font-size: .75rem;
  outline: none;
  background: #fff;
  text-align: center;
  color: #333;
}


/*图片上传容器*/

.uploadImgContent {
  width: auto;
  margin-top: 2rem;
}


/*用户协议*/

.sign {
  margin: .1rem 0;
}

.agreeMsg {
  padding: 0 15%;
}

.agreeChooseContent {
  width: 100%;
  padding: 0 15%;
  margin-top: .5rem;
  -ms-align-items: center;
  align-items: center;
}

.agreeChooseInput {
  -ms-align-items: center;
  align-items: center;
}

.agreeCheckbox {
  outline: none;
  margin-right: .2rem;
  margin-top: -2px;
}

.registerTxt {
  color: #f76149;
}


/*绑定按钮*/

.submitBtnContent {
  width: 100%;
  height: 2.5rem;
  margin: 1rem 0;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.submitBtn {
  width: 90%;
  height: 2rem;
  border: none;
  outline: none;
  color: #fff;
  border-radius: .5rem;
  background: #f76149;
}
</style>
