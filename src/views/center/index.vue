<template>
  <div class="centerIndex">
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <!-- alert组件 -->
    <alert :alert="alert" :title="title" :text="text"></alert>
    <!-- 用户信息 -->
    <div class="topIndex">
      <!-- 个人信息栏: 1=>已绑定 -->
      <div :class="['flexRow userInfoContent',{userInfoContent_Flag: userFlag == 1}]">
        <!-- 已绑定 -->
        <div v-if="userFlag == 1" class="user_Flag">
          <div class="user_Flag flexRow">
            <!-- 已绑定头像与积分 -->
            <div class="user_Flag_img_content">
              <img v-if="userInfo.headimgurl" :src="userInfo.headimgurl" class="user_Flag_img">
              <img v-else src="../../assets/common/headerImg.png" class="user_Flag_img">
              <div class="user_Flag_rank_content">
                <span>当前积分0</span>
              </div>
            </div>
            <!-- 已绑定其他信息 -->
            <div class="user_Flag_content flexCol">
              <span class="nick_name">{{userInfo.nickname}}</span>
              <span class="car_number">车牌号：{{userInfo.car_number}}</span>
            </div>
          </div>
        </div>
        <!-- 未绑定时 -->
        <router-link tag="div" :to="{name: routerPath.register}" v-else class="user_noFlag flexCol">
          <!-- 未绑定时上半部分 -->
          <div class="user_noFlag_top flexRow">
            <img src="../../assets/index/noFlag_bind.png" class="addIcon">
            <span class="user_noFlag_title">绑定您的爱车</span>
            <img src="../../assets/index/noFlag_icon.png" class="carIcon">
          </div>
          <!-- 人数标尺 -->
          <div class="numberIconContent">
            <img src="../../assets/index/noFlag_number.png" class="numberIcon">
            <span>{{registerNumber}}人已绑定</span>
          </div>
          <!-- 未绑定时下半部分 -->
          <span class="user_noFlag_sign sign">绑定后您将享受无感付更高水平的服务</span>
        </router-link>
      </div>
    </div>
    <!-- 选项 -->
    <div class="tabContent">
      <div @click="clickIntegral" class="tabModule flexRow">
        <div class="flexRow">
          <img src="../../assets/center/tab_1.png" class="tabIcon">
          <span>积分优惠</span>
        </div>
        <img src="../../assets/center/arrow.png" class="arrawIcon">
      </div>
      <router-link tag="div" :to="{name: routerPath.account}" class="tabModule flexRow">
        <div class="flexRow">
          <img src="../../assets/center/tab_3.png" class="tabIcon">
          <span to="/account">账户信息</span>
        </div>
        <img src="../../assets/center/arrow.png" class="arrawIcon">
      </router-link>
      <router-link tag="div" :to="{name: routerPath.pay}" class="tabModule flexRow">
        <div class="flexRow">
          <img src="../../assets/center/tab_4.png" class="tabIcon">
          <span to="/pay">缴费明细</span>
        </div>
        <img src="../../assets/center/arrow.png" class="arrawIcon">
      </router-link>
      <div @click="clickIntegral" class="tabModule flexRow">
        <div class="flexRow">
          <img src="../../assets/center/tab_5.png" class="tabIcon">
          <span>发票打印</span>
        </div>
        <img src="../../assets/center/arrow.png" class="arrawIcon">
      </div>
      <div @click="showConfirmPhone" class="tabModule flexRow">
        <div class="flexRow">
          <img src="../../assets/center/tab_6.png" class="tabIcon">
          <span>客服电话</span>
        </div>
        <img src="../../assets/center/arrow.png" class="arrawIcon">
      </div>
      <router-link tag="div" to="/setting" class="tabModule flexRow">
        <div class="flexRow">
          <img src="../../assets/center/tab_7.png" class="tabIcon">
          <span to="/setting">设置</span>
        </div>
        <img src="../../assets/center/arrow.png" class="arrawIcon">
      </router-link>
      <div v-if="userFlag == 1" @click="showConfirmUnbind" class="tabModule flexRow">
        <div class="flexRow">
          <img src="../../assets/center/tab_8.png" class="tabIcon">
          <span>立即解绑</span>
        </div>
        <img src="../../assets/center/arrow.png" class="arrawIcon">
      </div>
    </div>
    <!-- confirm组件 -->
    <div class="confirmWin" v-if="conMask">
      <div class="mask"></div>
      <div class="confirmWinContnt">
        <!-- 头部 -->
        <div class="confirmWin_Top flexCol">
          <!-- 插入上方信息图片 -->
          <img :src="conImg_1" v-if="conType == 0" class="confirmTopImg">
          <img :src="conImg_2" v-if="conType == 1" class="confirmTopImg">
          <span class="confirmTitle">{{conTitle}}</span>
        </div>
        <!-- 中间 -->
        <div class="confirmWin_middle flexRow">
          <div class="confirmMsg" v-html="conContent"></div>
        </div>
        <!-- 尾部 -->
        <div class="confirmWin_footer flexRow">
          <span class="confirm_cel" @click="conCancelBtn">取消</span>
          <span class="confirm_sub" @click="conSubmitBtn">{{conSubBtn}}</span>
        </div>
      </div>
    </div>
    <!-- 底部tapbar -->
    <div class="footerHack"></div>
    <div class="footer flexRow">
      <div @click="goIndex" class="flexCol">
        <img src="../../assets/index/footTabIndex.png">
        <span>首页</span>
      </div>
      <div class="flexCol">
        <img src="../../assets/index/footTabCenter_L.png">
        <span>个人中心</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'centerIndex',
  data() {
    return {
      // 报错弹窗
      errShow: false,
      errTxt: '',
      // confirm相关
      conMask: false,
      conImg_1: require('../../assets/common/conJie.png'),
      conImg_2: require('../../assets/common/conKe.png'),
      conTitle: '',
      conContent: '',
      conSubBtn: '确定',
      conType: 0,
      // alert相关
      alert: false,
      title: '小主别急',
      text: '此功能还在路上！',
      // 用户信息&绑定状态
      userFlag: 0,
      userInfo: {},
      userCheck: 0,
      // 路由变换组
      routerPath: {
        account: 'register',
        pay: 'register',
        setting: 'register',
        register: 'register'
      },
      // 注册人数
      registerNumber: 2000
    }
  },
  created() {
    // 获取注册人数
    this.$tools.GetDataFromServer(
      this,
      this.$api.getRegisterNumber,
      function success(res) {
        // 接口获取成功
        if (res.data.state == 0) {
          // 如果绑定人数大于2000人，使用真实数据
          if (parseInt(res.data.data.sumUser) > 2000) {
            that.registerNumber = res.data.data.sumUser;
          }
        }
      },
      function error(err) {
        return;
      }
    );
  },
  activated() {
    let that = this;
    document.title = '个人中心';
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
    // 加载用户绑定状态，更改路由变换组
    this.userFlag = this.$tools.GetCookie('userFlag');
    // 已经绑定的状态下
    if (this.userFlag == 1) {
      this.routerPath.account = 'account';
      this.routerPath.pay = 'pay';
      this.routerPath.setting = 'settingIndex';
    }
    // 未绑定的状态下
    else {
      this.userCheck = this.$store.state.userCheck;
      // 如果是老用户，跳转注册选择页
      if (this.userCheck != 0) {
        this.routerPath.account = 'registerChoose';
        this.routerPath.pay = 'registerChoose';
        this.routerPath.setting = 'registerChoose';
        this.routerPath.register = 'registerChoose';
      }
    }
  },
  methods: {
    // 跳转已开通业务
    goBusiness() {
      this.$router.push('/business');
    },
    // 点击非实现功能
    clickIntegral() {
      let that = this;
      this.alert = true;
      var hideAlert = setTimeout(function() {
        that.alert = false;
        clearTimeout(hideAlert);
      }, 1500)
    },
    // 显示解绑弹窗
    showConfirmUnbind() {
      this.conMask = true;
      this.conContent = this.userInfo.car_number;
      this.conSubBtn = '确定';
      this.conTitle = '您确定要解绑吗？';
      this.conType = 0;
    },
    // 显示客服电话弹窗
    showConfirmPhone() {
      this.conMask = true;
      this.conTitle = '客服电话';
      this.conContent = '<a href="tel:13224381123">技术客服：13224381123</a><a href="tel:17790063004">产品客服：17790063004</a><a href="tel:0431-81872579">公司客服：0431-81872579</a>';
      this.conSubBtn = '点击号码即可拨打';
      this.conType = 1;
    },
    conCancelBtn() {
      this.conMask = false;
    },
    // 弹窗确定事件
    conSubmitBtn() {
      let that = this;
      // 解绑用户信息
      if (this.conType == 0) {
        // 获取用户信息
        this.$tools.GetDataFromServer(
          this,
          this.$api.getUnbind,
          function success(res) {
            // 解绑成功
            if (res.data.state == 0) {
              location.replace(document.referrer);
            }
          },
          function error(err) {
            that.errTxt = '出现错误，请重新解绑'
            var errLoading = setTimeout(function() {
              that.errShow = false;
              that.errTxt = ''
              clearTimeout(errLoading);
            }, 2000);
          }
        );
      }
    },
    // 跳转首页
    goIndex() {
      this.$router.replace('/index');
    }
  }
}
</script>
<style scoped>
/*上方主体*/

.topIndex {
  width: 100%;
  min-height: 10rem;
  background: #f8624a;
}


/*用户状态栏*/

.userInfoContent {
  width: 100%;
  height: 10rem;
  background: url(../../assets/index/userBg.png) no-repeat bottom;
  background-size: contain;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.userInfoContent_Flag {
  height: 10rem;
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-bottom: 0.625rem;
}


/*未绑定状态用户栏*/

.user_noFlag {
  width: auto;
  height: auto;
  margin-bottom: 1rem;
  position: relative;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}


/*未绑定上方*/

.user_noFlag_top {
  width: 100%;
  height: 2.5rem;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.user_noFlag_top .addIcon {
  width: 2rem;
  height: 2rem;
  margin-right: 1rem;
}

.user_noFlag_top .carIcon {
  width: 2rem;
  height: auto;
  margin: .5rem 0 0 1rem;
}

.user_noFlag_title {
  font-size: 1.3rem;
  letter-spacing: 1px;
  color: #fff;
}


/*人数标尺*/

.numberIconContent {
  min-width: 6.25rem;
  height: 1.5rem;
  line-height: 1.5rem;
  top: -1.5rem;
  right: -3rem;
  position: absolute;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  padding: 0 2px;
}

.numberIconContent span {
  position: absolute;
  z-index: 1;
  font-size: 0.75rem;
  margin-top: -2px;
  display: block;
  color: #ea4e3d;
  font-weight: bold;
}

.numberIcon {
  position: absolute;
  width: 100%;
  height: 100%;
}


/*未绑定标语*/

.user_noFlag_sign {
  color: #fff;
  margin: .5rem 0 !important;
}


/*选项栏*/

.tabContent {
  width: 95%;
  height: auto;
  margin: 0 auto;
}


/*每一个小选项模块*/

.tabModule {
  width: 100%;
  height: 3rem;
  font-size: .875rem;
  border-bottom: 1px solid #ddd;
  -ms-align-items: center;
  align-items: center;
  justify-content: space-between;
}

.tabModule img {
  width: 1.5rem;
}

.tabModule .arrawIcon {
  margin-right: .5rem;
  width: .55rem;
}

.tabModule span {
  margin-left: .75rem;
}

.tabModule>div {
  -ms-align-items: center;
  align-items: center;
}


/*立即解绑*/

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


/*页脚*/

.footerHack {
  width: 100%;
  height: 4rem;
  background: none;
}

.footer {
  width: 100%;
  height: 4rem;
  background: #fff;
  color: #999;
  font-size: .875rem;
  justify-content: space-around;
  -ms-align-items: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
}

.footer div {
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.footer div img {
  width: 1.5rem;
  height: 1.5rem;
  margin-bottom: .25rem;
}
</style>
