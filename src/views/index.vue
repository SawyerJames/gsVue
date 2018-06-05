<template>
  <div class="index">
    <!-- alert组件 -->
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <alert :alert="alert" :title="title" :text="text"></alert>
    <!-- 通告及个人说明主体 -->
    <div class="topIndex">
      <!-- 最新通告 -->
      <div class="notice">
        <div v-if="noticeList" class="activityContent flexRow boxBorder">
          <img src="../assets/common/activity.png">
          <swiper class="swiper" :show-dots='false' auto height="1.2rem">
            <swiper-item class="swiperItem" v-for="item in noticeList" @click.native="goNoticeDetail(item.id)">
              <p class="fadeInUp animated">{{item.name}}</p>
            </swiper-item>
          </swiper>
        </div>
        <div v-else class="activityContent flexRow boxBorder">
          <img src="../assets/common/activity.png">
          <p class="activity_none">暂无最新公告</p>
        </div>
      </div>
      <!-- 个人信息栏: 1=>已绑定 -->
      <div :class="['flexRow userInfoContent',{userInfoContent_Flag: userFlag == 1}]">
        <!-- 已绑定 -->
        <div v-if="userFlag == 1" class="user_Flag">
          <div class="user_Flag flexRow">
            <!-- 已绑定头像与积分 -->
            <div class="user_Flag_img_content">
              <img v-if="userInfo.headimgurl" :src="userInfo.headimgurl" class="user_Flag_img">
              <img v-else src="../assets/common/headerImg.png" class="user_Flag_img">
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
        <router-link tag="div" :to="{name: flagRouterRegister}" v-else class="user_noFlag flexCol">
          <!-- 未绑定时上半部分 -->
          <div class="user_noFlag_top flexRow">
            <img src="../assets/index/noFlag_bind.png" class="addIcon">
            <span class="user_noFlag_title">绑定您的爱车</span>
            <img src="../assets/index/noFlag_icon.png" class="carIcon">
          </div>
          <!-- 人数标尺 -->
          <div class="numberIconContent">
            <img src="../assets/index/noFlag_number.png" class="numberIcon">
            <span>{{registerNumber}}人已绑定</span>
          </div>
          <!-- 未绑定时下半部分 -->
          <span class="user_noFlag_sign sign">绑定后您将享受小K出行更高水平的服务</span>
        </router-link>
      </div>
    </div>
    <!-- 选项 -->
    <div class="tabBar flexRow">
      <router-link tag="div" to="/map" class="tabBarChoose">无感支付</router-link>
      <div @click="noActivity">活动积分</div>
      <div @click="clickScan">不抬杆请扫码</div>
    </div>
    <!-- 其他选项 -->
    <div class="tabBar_map flexCol">
      <router-link tag="div" to="/map" class="tabBar_map_module flexRow">
        <img src="../assets/index/tab_1.png" class="tabIcon">
        <span>智慧高速</span>
        <img src="../assets/index/arrow.png" class="arrowIcon">
      </router-link>
      <router-link tag="div" to="/index" @click.native="noActivity" class="tabBar_map_module flexRow">
        <img src="../assets/index/tab_2.png" class="tabIcon">
        <span>智慧加油</span>
        <img src="../assets/index/arrow.png" class="arrowIcon">
      </router-link>
      <router-link tag="div" to="/index" @click.native="noActivity" class="tabBar_map_module flexRow">
        <img src="../assets/index/tab_3.png" class="tabIcon">
        <span>智慧停车</span>
        <img src="../assets/index/arrow.png" class="arrowIcon">
      </router-link>
    </div>
    <!-- 动态二维码 -->
    <div v-if="showScan">
      <div v-if="showScan" class="mask" @click="closeScan"></div>
      <div class="showScanContent flexCol">
        <img v-if="scanImg" :src="scanImg" class="scanImg" alt="二维码获取失败">
        <span>二维码每5分钟自动刷新1次</span>
      </div>
    </div>
    <!-- 使用教程：仅限于新用户：userFlag => 0并且userCheck => 0  -->
    <div class="mask" v-if="tutoriaWin && userFlag == 0 && userCheck == 0"></div>
    <div class="tutorialWin" v-if="tutoriaWin && userFlag == 0 && userCheck == 0">
      <div class="tutoriaContent borderBox">
        <p class="tutorTitle">小K出行介绍</p>
        <p>感谢您使用小K出行，绑定后即可在试点站享受无感支付。</p>
        <p class="titleSign">——◆开通使用◆——</p>
        <p><span class="p_sign">第一步</span>、输入您的手机号，获取验证码并输入，点击下一步。</p>
        <p><span class="p_sign">第二步</span>、上传您的行驶证正反面，点击下一步。</p>
        <p><span class="p_sign">第三步</span>、审核通过，完成绑定！</p>
      </div>
      <div class="tutoriaFooter flexRow">
        <span @click="tutoriaWinBtn">我知道了</span>
      </div>
    </div>
    <!-- 黑名单判断 -->
    <div v-show="blackPayment" class="non_payment flexRow">
      <div class="paymen">
        <div class="paymen_pic flexRow">
          <img src="../assets/pay/blackUser.png">
        </div>
        <p class="paymen_p">您有订单未支付，
          <br> 暂停平台功能。请进行还款！
        </p>
        <div class="repayment" @click="go_non_payment">一键还款</div>
      </div>
    </div>
    <!-- 底部tapbar -->
    <div class="footerHack"></div>
    <div class="footer flexRow">
      <div class="flexCol">
        <img src="../assets/index/footTabIndex_L.png">
        <span>首页</span>
      </div>
      <div @click='goCenter' class="flexCol">
        <img src="../assets/index/footTabCenter.png">
        <span>个人中心</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  Swiper,
  SwiperItem
} from 'vux'
export default {
  name: "index",
  data() {
    return {
      // 报错弹窗
      errShow: false,
      errTxt: '',
      // alert相关
      alert: false,
      title: '小主别急',
      text: '此功能还在路上！',
      // 判断是否绑定后的路由变化
      flagRouter: '/center',
      flagRouterRegister: 'register',
      // 动态二维码相关
      scanImg: '',
      showScan: false,
      // 使用教程
      tutoriaWin: false,
      // 最新通告
      noticeList: [],
      // 用户信息&绑定状态
      userFlag: 0,
      userCheck: 0,
      userInfo: {},
      // 注册人数
      registerNumber: 2000,
      // 黑名单
      blackPayment: false
    }
  },
  created() {
    let that = this;
    // 在未绑定判断是否为老用户
    if (this.$tools.GetCookie('userFlag') == 0) {
      // 改变绑定状态
      this.userFlag = 0;
      this.$tools.GetDataFromServer(
        this,
        this.$api.checkUser,
        function success(res) {
          // 接口获取成功
          if (res.data.state == 0) {
            // 判别当前用户是否为老用户
            that.userCheck = res.data.data.count;
            // 新用户开通使用教程
            if (that.userCheck == 0) {
              that.tutoriaWin = that.$store.state.tutoriaWin;
            }
            // 老用户跳转注册选择页
            else {
              that.flagRouterRegister = 'registerChoose';
            }
            // 判别状态存入全局中
            that.$store.state.userCheck = res.data.data.count;
          }
        },
        function error(err) {
          that.errShow = true;
          that.errTxt = '网络错误';
        }
      );
    }
    // 动态修改路由变化，更改绑定状态
    if (this.$tools.GetCookie('userFlag') == 1) {
      // 改变绑定状态
      this.userFlag = 1;
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
          that.errTxt = '网络错误';
        }
      );
    }
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
      }
    );
  },
  activated() {
    let that = this;
    document.title = '小K出行';
    // 获取最新公告
    this.$tools.GetDataFromServer(
      this,
      this.$api.getNotice,
      function success(res) {
        // 接口获取成功
        if (res.data.state == 0) {
          that.noticeList = res.data.data;
        }
      },
      function error(err) {
        that.errShow = true;
        that.errTxt = '网络错误'
        var errLoading = setTimeout(function() {
          that.errShow = false;
          that.errTxt = ''
          clearTimeout(errLoading);
        }, 2000);
      }
    );
    // 判断是否为黑名单
    this.blacklist();
  },
  methods: {
    // 使用指南
    tutoriaWinBtn() {
      this.tutoriaWin = false;
      this.$store.state.tutoriaWin = false;
    },
    // 点击最新公告跳转详情页
    goNoticeDetail(id) {
      this.$router.push({
        name: 'notice',
        params: {
          id: id
        }
      })
    },
    // 点击不抬杆扫码
    clickScan() {
      // 如果未绑定跳至注册页,如果绑定则获取动态验证码
      if (this.$tools.GetCookie('userFlag') == 1) {
        this.showScan = true;
        // 拉取二维码图片base64
        this.getScan();
        // 开启3分钟动态验证码获取
        this.$store.state.scan = setInterval(this.getScan, 18000000);
      }
      // 未绑定跳转注册，区分新老用户
      else {
        if (this.userCheck != 0) {
          this.$router.push('/registerChoose');
        } else {
          this.$router.push('/register');
        }
      }
    },
    // 关闭二维码并停止刷新二维码
    closeScan() {
      this.showScan = false;
      clearInterval(this.$store.state.scan);
    },
    // 获取动态二维码函数
    getScan() {
      var that = this;
      // 获取动态二维码:追加随机数，用来动态获取，权重为10000
      this.$tools.GetDataFromServer(
        this,
        this.$api.getScan + "?" + Math.random(0, 10000),
        function success(res) {
          // 获取成功
          that.scanImg = res.data.data.qrcode;
        },
        function error(err) {
          that.scanImg = '';
        }
      );
    },
    // alert弹窗：无活动
    noActivity() {
      let that = this;
      this.alert = true;
      var hideAlert = setTimeout(function() {
        that.alert = false;
        clearTimeout(hideAlert);
      }, 1500)
    },
    // 跳至个人中心
    goCenter() {
      this.$router.replace('/center');
    },
    // 判断是否为黑名单
    blacklist() {
      let that = this;
      this.$tools.GetDataFromServer(
        this,
        this.$api.checkBlackUser,
        function success(res) {
          // 接口获取成功
          if (res.data.data.blackUser.status == 1) {
            that.blackPayment = true;
          }
        }
      );
    },
    //跳转黑名单列表
    go_non_payment() {
      this.$router.push('/blackPayment');
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  background: #f4f5f9;
}


/*上方主体*/

.topIndex {
  width: 100%;
  min-height: 13rem;
  background: #f8624a;
}


/*最新公告*/

.notice {
  /*  padding-top: 1rem;*/
  height: auto;
}

.activityContent {
  height: 2rem;
  background: #ea4f3d;
  justify-content: space-between;
  -ms-align-items: center;
  align-items: center;
  padding: 0 .5rem;
}

.activityContent>img {
  height: 1rem;
  margin-right: .5rem;
}

.swiper {
  line-height: 1.3rem;
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  -o-flex: 1;
  flex: 1;
}

.swiperItem p {
  text-align: left;
  color: #fff;
  font-size: .75rem;
  -webkit-flex: 1;
  -moz-flex: 1;
  -ms-flex: 1;
  -o-flex: 1;
  flex: 1;
}

.activity_none {
  text-align: left;
  color: #fff;
  font-size: .75rem;
}


/*用户状态栏*/

.userInfoContent {
  width: 100%;
  height: 11rem;
  background: url(../assets/index/userBg.png) no-repeat bottom;
  background-size: contain;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.userInfoContent_Flag {
  background: url(../assets/index/userBg_flag.png) no-repeat bottom;
  background-size: contain;
}


/*绑定状态用户栏*/

.user_Flag {
  width: auto;
  height: auto;
  margin-bottom: .5rem;
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
  bottom: .3rem;
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


/*积分标尺*/

.rankIconContent {
  position: absolute;
  width: 5rem;
  height: auto;
  top: -1rem;
  right: -2rem;
}

.rankIcon {
  position: absolute;
  width: 100%;
  z-index: 0;
}

.rankIconContent span {
  width: 100%;
  text-align: center;
  font-size: .75rem;
  color: #333;
  position: absolute;
  z-index: 1;
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
  height: auto;
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
/*  margin-top: -0.125rem;*/
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
}

.user_noFlag_sign.sign {
  margin: .5rem 0;
}


/* 选项卡 */

.tabBar {
  width: 100%;
  height: 3.5rem;
  background: #fff;
  color: #7D7D7D;
  font-size: .875rem;
  border-bottom: 1px solid #ddd;
  -webkit-box-shadow: 1px 1px 1px 1px #eee;
  box-shadow: 1px 1px 1px 1px #eee;
  justify-content: space-around;
  -ms-align-items: center;
  align-items: center;
}

.tabBarChoose {
  color: #f8624a;
  border-bottom: 1px solid #f8624a;
}


/*其他选项*/

.tabBar_map {
  width: 100%;
  height: auto;
  margin-top: 1rem;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.tabBar_map_module {
  width: 80%;
  height: 3rem;
  margin: .5rem 0;
  font-size: .875rem;
  border-radius: .25rem;
  border: 1px solid #EFEFEF;
  justify-content: space-around;
  -ms-align-items: center;
  align-items: center;
  background: #fff;
}

.tabBar_map_module .tabIcon {
  width: 1.5rem;
}

.tabBar_map_module .arrowIcon {
  width: 1.2rem;
}


/*二维码*/

.showScanContent {
  width: 14rem;
  height: auto;
  left: 50%;
  top: 20%;
  margin-left: -7rem;
  position: fixed;
  z-index: 999;
  border: 1px solid #f8624a;
  border-radius: .25rem;
}

.showScanContent span {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  border-radius: 0 0 .25rem .25rem;
  background: #f8624a;
  text-align: center;
  font-size: .875rem;
  color: #fff;
}

.scanImg {
  width: 100%;
  height: 14rem;
  background: #fff;
  border-radius: .25rem .25rem 0 0;
}


/*使用教程*/

.tutorialWin {
  position: fixed;
  width: 80%;
  height: auto;
  font-size: .875rem;
  padding: 1rem 0;
  margin-left: -40%;
  border-radius: .25rem;
  background: #fff;
  top: 18%;
  left: 50%;
  z-index: 999;
}

.tutoriaContent {
  width: 100%;
  height: 90%;
  padding: 0 1rem 1rem;
  border-radius: .25rem .25rem 0 0;
}

.tutoriaContent p {
  margin-top: 1rem;
}

.tutorTitle {
  width: 100%;
  text-align: center;
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin: 0 0 1rem 0;
}

.titleSign {
  width: 100%;
  text-align: center;
  color: #f8624a;
  font-weight: bold;
}

.p_sign {
  color: #f8624a;
  font-weight: bold;
}

.tutoriaFooter {
  height: 10%;
  color: #f8624a;
  margin-bottom: .5rem;
  font-size: 1rem;
  border-radius: 0 0 .25rem .25rem;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
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


/*黑名单*/

.non_payment {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.paymen {
  width: 80%;
  height: auto;
  background: #fff;
  border-radius: 5px;
}

.paymen_pic {
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  height: 5rem;
  background: #f76149;
  z-index: 1;
  border-radius: 5px 5px 0 0;
}

.paymen_pic img {
  width: 3rem;
  height: 3rem;
}

.paymen_p {
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
  color: #333;
}

.repayment {
  width: 60%;
  padding: 2px 0;
  font-size: 0.875rem;
  margin: 1rem auto;
  text-align: center;
  background: #f76149;
  color: #fff;
  border-radius: 5px;
  letter-spacing: 2px;
}
</style>
