<template>
  <div class="account">
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <!-- 验证提示 -->
    <h1 class="validate" v-if="validate">{{validate}}</h1>
    <!-- alert组件 -->
    <alert :alert="alert" :title="title" :text="text"></alert>
    <!-- 用户信息 -->
    <div class="topIndex">
      <div class="flexRow userInfoContent_Flag">
        <div class="user_Flag flexRow">
          <!-- 已绑定头像与积分 -->
          <div class="user_Flag_img_content">
            <img v-if="userInfo.headimgurl" :src="userInfo.headimgurl" class="user_Flag_img">
            <img v-else src="../../assets/common/headerImg.png" class="user_Flag_img">
            <div class="user_Flag_rank_content">
              <span>当前积分0</span>
            </div>
          </div>
          <!-- 个人信息 -->
          <div class="user_Flag_content flexCol">
            <span class="nick_name">{{userInfo.nickname}}</span>
            <div class="car_phoneContent flexRow">
              <span class="phone">电话：{{userInfo.phone}}</span>
              <span class="modPhoneBtn" @click="modPhone">修改</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改手机号弹窗 -->
    <div class="mask" v-if="mask" @click="closeMask"></div>
    <div class="modPhoneWin" v-if="mask">
      <div class="modPhoneModule flexRow">
        <span class="modPhoneTitle">联系方式</span>
        <input class="flex_1" type="number" maxlength="11" v-model="mod_phone.phone" />
      </div>
      <div class="modPhoneModule flexRow">
        <span class="modPhoneTitle">验证号码</span>
        <input type="tel" class="flex_1" name="verification" maxlength="6" placeholder="请输入验证码" v-model.trim="mod_phone.verification"></input>
        <!-- 获取验证码按钮 -->
        <button class="modPhoneVate" type="button" @click="getCode()" :disabled="!showVer">
          <span v-show="showVer">获取验证码</span>
          <span v-show="!showVer">重新获取({{count}}s)</span>
        </button>
      </div>
      <div class="modPhoneModule flexRow noBorder">
        <button class="modPhonePostBtn" type="button" @click="postPhone">提交</button>
      </div>
    </div>
    <!-- 车辆信息栏 -->
    <div class="carContent">
      <!-- 车辆信息模块，每一项判断是否检测到信息 -->
      <div class="carModule flexRow">
        <span class="carModule_left">车牌号:</span>
        <span class="carModule_right" v-if="userInfo.car_number">{{userInfo.car_number}}</span>
        <span class="carModule_right" v-else>暂未检测到信息</span>
      </div>
      <div class="carModule flexRow">
        <span class="carModule_left">车辆类型:</span>
        <span class="carModule_right" v-if="userInfo.car_type">{{userInfo.car_type}}</span>
        <span class="carModule_right" v-else>暂未检测到信息</span>
      </div>
      <div class="carModule flexRow">
        <span class="carModule_left">核定载人数:</span>
        <span class="carModule_right" v-if="userInfo.load_number">{{userInfo.load_number}}</span>
        <span class="carModule_right" v-else>暂未检测到信息</span>
      </div>
      <div class="carModule flexRow">
        <span class="carModule_left">发动机号:</span>
        <span class="carModule_right" v-if="userInfo.engine">{{userInfo.engine}}</span>
        <span class="carModule_right" v-else>暂未检测到信息</span>
      </div>
      <div class="carModule flexRow">
        <span class="carModule_left">车辆识别号码:</span>
        <span class="carModule_right" v-if="userInfo.frame_num">{{userInfo.frame_num}}</span>
        <span class="carModule_right" v-else>暂未检测到信息</span>
      </div>
    </div>
    <!-- 报错 -->
    <div class="errorBtnContent flexRow">
      <button type="button" class="errorBtn" @click="showConfirmPhone">报错</button>
    </div>
    <!-- confirm组件 -->
    <div class="confirmWin" v-if="conMask">
      <div class="mask"></div>
      <div class="confirmWinContnt">
        <!-- 头部 -->
        <div class="confirmWin_Top flexCol">
          <!-- 插入上方信息图片 -->
          <img :src="conImg_2" class="confirmTopImg">
          <span class="confirmTitle">{{conTitle}}</span>
        </div>
        <!-- 中间 -->
        <div class="confirmWin_middle flexRow">
          <div class="confirmMsg" v-html="conContent"></div>
        </div>
        <!-- 尾部 -->
        <div class="confirmWin_footer flexRow">
          <span class="confirm_cel" @click="conCancelBtn">取消</span>
          <span class="confirm_sub">{{conSubBtn}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'account',
  data() {
    return {
      // 报错弹窗
      errShow: false,
      errTxt: '',
      // confirm相关
      conMask: false,
      conImg_2: require('../../assets/common/conKe.png'),
      conTitle: '',
      conContent: '',
      conSubBtn: '确定',
      // alert相关
      alert: false,
      title: '温馨提示',
      text: '',
      // 验证
      validate: '',
      // 用户信息修改
      mask: false,
      mod_name: false,
      // 修改手机
      mod_phone: {
        phone: '',
        verification: ''
      },
      // 验证码
      showVer: true,
      count: '',
      timer: null,
      TIME_COUNT: 60,
      // 用户信息&绑定状态
      userInfo: {}
    }
  },
  activated() {
    document.title = '账户信息';
    let that = this;
    // 获取用户信息
    this.$tools.GetDataFromServer(
      this,
      this.$api.getUserInfo,
      function success(res) {
        // 接口获取成功
        if (res.data.state == 0) {
          that.userInfo = res.data.data;
        }
      },
      function error(err) {
        that.errShow = true;
        that.errTxt = '网络错误,请刷新重试';
      }
    );
  },
  methods: {
    // 修改手机
    modPhone() {
      this.mask = true;
    },
    closeMask() {
      this.mask = false;
      // 数据置零
      this.mod_phone.phone = '';
      this.mod_phone.verification = '';
      this.showVer = true;
      this.count = '';
      this.timer = null;
      this.TIME_COUNT = 60;
    },
    // 获取验证码
    getCode() {
      let that = this;
      var phone = this.mod_phone.phone,
        phoneRe = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (phoneRe.test(phone)) {
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
              phone: this.mod_phone.phone,
            },
            function success(res) {
              if (res.data.errmsg != "OK") {
                that.validate = '验证码获取失败'
                setTimeout(function() {
                  that.validate = ''
                }, 1500);
              }
            },
            function error(err) {
              that.errShow = true;
              that.errTxt = '网络错误,请重新获取';
              var errLoading = setTimeout(function() {
                that.errShow = false;
                that.errTxt = '';
                that.showVer = true;
                that.count = '';
                that.timer = null;
                that.TIME_COUNT = 60;
                clearTimeout(errLoading);
              }, 2000);
            }
          )
        }
      } else {
        that.validate = '手机号码格式不正确'
        setTimeout(function() {
          that.validate = ''
        }, 1500);
      }
    },
    // 修改手机号
    postPhone() {
      let that = this;
      // 获取用户信息
      var phone = this.mod_phone.phone,
        verification = this.mod_phone.verification;
      // 正则
      var phoneRe = /^[1][3,4,5,7,8,9][0-9]{9}$/,
        verificationRe = /^\d{6}$/;
      // 表单验证
      if (phoneRe.test(phone)) {
        if (verificationRe.test(verification)) {
          this.validate = '';
          this.$tools.PostDataToServer(
            this,
            this.$api.postChangePhone, {
              phone: this.mod_phone.phone,
              code: this.mod_phone.verification
            },
            function success(res) {
              // 成功通过接口后判断是否正确修改手机号
              if (res.data.state != 0) {
                that.mask = false;
                that.alert = true;
                that.text = res.data.msg;
                var hideAlert = setTimeout(function() {
                    that.alert = false;
                    clearTimeout(hideAlert);
                  }, 1500)
                  // 清空填写的手机号及验证码信息
                that.mod_phone.phone = '';
                that.mod_phone.verification = '';
              }
              // 手机号修改正常情况下
              else {
                that.mask = false;
                that.alert = true;
                that.text = res.data.data;
                var hideAlert = setTimeout(function() {
                  that.alert = false;
                  clearTimeout(hideAlert);
                }, 1500)
                that.userInfo.phone = that.mod_phone.phone;
                // 清空填写的手机号及验证码信息
                that.mod_phone.phone = '';
                that.mod_phone.verification = '';
              }
            },
            function error(err) {
              that.errShow = true;
              that.errTxt = '网络错误,请重新修改';
              var errLoading = setTimeout(function() {
                that.errShow = false;
                that.errTxt = '';
                that.showVer = true;
                that.count = '';
                that.timer = null;
                that.TIME_COUNT = 60;
                clearTimeout(errLoading);
              }, 2000);
            }
          )
        } else {
          that.validate = '验证码不正确'
          setTimeout(function() {
            that.validate = ''
          }, 1500);
        }
      } else {
        that.validate = '手机号码格式不正确'
        setTimeout(function() {
          that.validate = ''
        }, 1500);
      }
    },
    // 显示客服电话弹窗
    showConfirmPhone() {
      this.conMask = true;
      this.conTitle = '客服电话';
      this.conContent = '<a href="tel:13224381123">技术客服：13224381123</a><a href="tel:17790063004">产品客服：17790063004</a><a href="tel:0431-81872579">公司客服：0431-81872579</a>';
      this.conSubBtn = '点击号码即可拨打';
    },
    conCancelBtn() {
      this.conMask = false;
    }
  }
}
</script>
<style scoped>
.validate {
  z-index: 9999;
}


/*用户信息栏*/

.topIndex {
  width: 100%;
  min-height: 11rem;
  background: #f8624a;
}

.userInfoContent_Flag {
  width: 100%;
  height: 11rem;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  background: url(../../assets/index/userBg_flag.png) no-repeat bottom;
  background-size: contain;
}


/*绑定状态用户栏*/

.user_Flag {
  width: auto;
  height: auto;
  margin-bottom: 1rem;
  position: relative;
  color: #fff;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.user_Flag_img_content {
  width: auto;
  height: auto;
  position: relative;
}

.user_Flag_img {
  width: 3.8rem;
  height: 3.8rem;
  border-radius: 3.8rem;
  border: 2px solid #fff;
  background: #fff;
  margin-right: 2rem;
}

.user_Flag_rank_content {
  height: 1rem;
  line-height: 1rem;
  padding: 0 .5rem;
  background: #f9e638;
  border-radius: 1rem;
  position: absolute;
  bottom: 0;
  left: -.2rem;
}

.user_Flag_rank_content span {
  font-size: .75rem;
  color: #333;
}


/*已绑定用户信息*/

.user_Flag_content {
  justify-content: center;
  font-size: .875rem;
}

.nick_name {
  font-size: 1rem;
  margin-bottom: .5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}


/*手机修改弹窗*/

.car_phoneContent {
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.phone {
  margin-right: .5rem;
}

.modPhoneBtn {
  border-radius: .25rem;
  padding: 0 .5rem;
  background: #da472f;
}

.modPhoneWin {
  width: 80%;
  height: auto;
  background: #f8624a;
  border-radius: .25rem;
  margin: 1rem 0 0 -42%;
  padding: .5rem;
  position: fixed;
  z-index: 999;
  color: #fff;
  left: 50%;
}


/*修改手机弹窗，每一个小模块*/

.modPhoneModule {
  height: 2.5rem;
  font-size: .875rem;
  border-bottom: 1px solid #C43B25;
  justify-content: space-between;
  -ms-align-items: center;
  align-items: center;
}

.modPhoneTitle {
  margin-right: .5rem;
}

.modPhoneModule input {
  width: 6rem;
  height: 1.8rem;
  border: none;
  outline: none;
  border-radius: .25rem;
  background: #fff;
}

.modPhoneVate {
  margin-left: .5rem;
  width: 6rem;
  height: 1.8rem;
  border: none;
  outline: none;
  border-radius: .25rem;
  background: #C43B25;
  color: #fff;
}

.modPhonePostBtn {
  width: 70%;
  margin: 0 auto;
  height: 1.8rem;
  border: none;
  outline: none;
  border-radius: .25rem;
  background: #800000;
  color: #fff;
}


/*状态信息栏*/

.carContent {
  width: 95%;
  height: auto;
  border-radius: .25rem;
  border: 1px solid #ddd;
  margin: 1rem auto;
}

.carModule {
  padding: 0 .5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  font-size: .875rem;
  border-bottom: 1px solid #ddd;
  -ms-align-items: center;
  align-items: center;
}

.carModule_left {
  height: 1rem;
  line-height: 1rem;
  border-left: 2px solid #ddd;
  padding-left: 6px;
  width: 7rem;
}


/*报错*/

.errorBtnContent {
  width: 100%;
  height: 2.5rem;
  margin-top: 1rem;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.errorBtn {
  width: 90%;
  height: 2rem;
  border: none;
  outline: none;
  color: #fff;
  border-radius: .5rem;
  background: #f76149;
}
</style>
