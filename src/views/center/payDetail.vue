<template>
  <div class="payDetail">
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <!-- 缴费详细 -->
    <div class="detailMsg">
      <div class="detailMsg_one">
        <div class="flexRow pay_succeed">
          <div class="pay_img"><img :src="pay_img"></div>
          <div class="pay_p1">
            <p class="pay_p2">{{pay_or}}</p>
            <p v-bind:class="{ pay_no: isActive,}" class="pay_p3">RMB：{{money}}元</p>
          </div>
        </div>
        <!-- 详情内容 -->
        <div class="for_pay">
          <div class="pay_center">
            <ul>
              <li class="flexRow pay_li" v-if="pay_hide"><span>付款方式</span><span>{{payment}}</span></li>
              <li class="flexRow pay_li"><span>商品说明</span><span>微信余额</span></li>
              <li class="flexRow pay_li"><span>账单分类</span><span>微信余额</span></li>
              <li class="flexRow pay_li"><span>积分奖励</span><span>微信余额</span></li>
            </ul>
          </div>
          <div class="pay_center">
            <ul>
              <li class="flexRow pay_li"><span>创建时间</span><span>{{create_time}}</span></li>
              <li class="flexRow pay_li"><span>订单编号</span><span>{{out_trade_no}}</span></li>
              <li class="flexRow pay_li"><span>进站点</span><span>{{in_pos_id}}</span></li>
              <li class="flexRow pay_li"><span>进站时间</span><span>{{in_time}}</span></li>
              <li class="flexRow pay_li"><span>出站点</span><span>{{out_pos_id}}</span></li>
              <li class="flexRow pay_li"><span>出站时间</span><span>{{out_time}}</span></li>
              <li class="flexRow pay_li"><span>商户名称</span><span>吉林省腾放科技有限公司</span></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 投诉列表 -->
      <div class="pay_footer">
        <!-- 弹出客服弹窗 -->
        <div class="pay_center1 flexRow" @click="showConfirmPhone">
          <span>对此订单由此疑问</span>
          <img src="../../assets/pay/pay_right.png">
        </div>
        <!-- 跳转投诉列表 -->
        <router-link tag="div" to="/complaint" class="pay_center1 flexRow pay_border">
          <span>投诉</span>
          <img src="../../assets/pay/pay_right.png">
        </router-link>
      </div>
      <div v-if="Confirm_payment" class="Confirm_payment" @click="payMoneyBtn">确认支付</div>
    </div>
    <!-- confirm组件 -->
    <div class="confirmWin" v-if="conMask">
      <div class="mask"></div>
      <div class="confirmWinContnt">
        <!-- 头部 -->
        <div class="confirmWin_Top flexCol">
          <!-- 插入上方信息图片 -->
          <img :src="conImg_1" class="confirmTopImg">
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
  name: 'payDetail',
  data() {
    return {
      // 报错弹窗
      errShow: false,
      errTxt: '',
      // 订单id
      detailId: null,
      // 支付额度
      money: "0",
      // confirm相关
      conMask: false,
      conImg_1: require('../../assets/common/conKe.png'),
      conTitle: '',
      conContent: '',
      conSubBtn: '点击号码即可拨打',
      // 支付相关
      pay_or: '',
      payment: '',
      create_time: '',
      out_trade_no: '',
      in_pos_id: '',
      in_time: '',
      out_pos_id: '',
      out_time: '',
      pay_hide: true,
      pay_img: require('../../assets/pay/pay_success.png'),
      Confirm_payment: true,
      isActive: ''
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.detailId = this.$route.params.id;
      // 获取订单详细数据
      this.getPayDetail();
      this.money = this.$route.params.money;
      this.money = this.money / 100;
    }
  },
  activated() {
    document.title = '缴费详情';
    // 拿到传递过来得routerID
    if (this.$route.params.id) {
      this.detailId = this.$route.params.id;
      this.money = this.$route.params.money;
      this.money = this.money / 100;
      // 获取订单详细数据
      this.getPayDetail();
    }
  },
  methods: {
    // 显示客服电话弹窗
    showConfirmPhone() {
      this.conMask = true;
      this.conTitle = '客服电话';
      this.conContent = '<a href="tel:13224381123">技术客服：13224381123</a><a href="tel:17790063004">产品客服：17790063004</a><a href="tel:0431-81872579">公司客服：0431-81872579</a>';
      this.conSubBtn = '点击号码即可拨打';
    },
    conCancelBtn() {
      this.conMask = false;
    },
    // 获取订单详细数据
    getPayDetail() {
      let that = this;
      // 获取订单详细数据
      this.$tools.PostDataToServer(
        this,
        this.$api.payDetail, {
          log_id: this.detailId
        },
        function success(res) {
          // 获取详细数据放在data中
          that.payment = res.data["data"].payment;
          that.create_time = res.data["data"].create_time;
          that.out_trade_no = res.data["data"].out_trade_no;
          that.in_pos_id = res.data["data"].in_pos_id;
          that.in_time = res.data["data"].in_time;
          that.out_pos_id = res.data["data"].out_pos_id;
          that.out_time = res.data["data"].out_time;
          let trade_state = res.data["data"].trade_state;
          //判断是否支付成功
          if (trade_state == "支付成功") {
            that.pay_or = "支付成功"
            that.pay_img = require('../../assets/pay/pay_success.png');
            that.pay_hide = true;
            that.Confirm_payment = false;
            that.isActive = false;
          }
          if (trade_state == "未支付") {
            that.pay_or = "未支付";
            that.pay_hide = false;
            that.pay_img = require('../../assets/pay/weizhifu.png');
            that.Confirm_payment = true;
            that.isActive = true;
          }
        },
        function error(err) {
          that.errShow = true;
          that.errTxt = '网络错误,请返回上一页';
          var errLoading = setTimeout(function() {
            that.errShow = false;
            that.errTxt = ''
            clearTimeout(errLoading);
          }, 2000);
        }
      )
    },
    // 确认还款
    payMoneyBtn() {
      window.location = "https://gs.jltengfang.com/order/wxpay/repayment?id=" + this.detailId + '&type=1';
    }
  }
}
</script>
<style scoped>
.detailMsg {
  padding: 1rem 0;
}

.detailMsg_one {
  border: 1px solid #ddd;
  border-radius: .3rem;
}

.pay_succeed {
  justify-content: center;
  padding: 1.25rem 0;
}

.pay_img {
  margin-right: 1rem;
  margin-top: 0.5rem;
}

.pay_img img {
  width: 2.4rem;
}

.pay_p2 {
  font-size: 1.125rem;
}

.pay_p3 {
  font-size: 1rem;
  color: #22ac38;
}

.pay_center {
  padding: 0.625rem 0.625rem;
  border-top: 1px solid #ddd;
}

.pay_center1 {
  padding: 0.625rem 0.625rem;
  justify-content: space-between;
  -ms-align-items: center;
  align-items: center;
}

.pay_center1 img {
  width: 0.5rem;
}

.pay_li {
  justify-content: space-between;
  font-size: 0.875rem;
  line-height: 1.6rem;
}

.pay_li:nth-child(1) {
  color: #a7a7a7;
}

.pay_footer {
  font-size: 0.875rem;
  border: 1px solid #ddd;
  border-radius: .3rem;
  margin-top: 1rem;
}

.pay_border {
  border-top: 1px solid #ddd;
}

.pay_footer a {
  color: #333;
  font-size: .875rem;
}

.Confirm_payment {
  font-size: .875rem;
  height: 2rem;
  line-height: 2rem;
  background: #f76149;
  border-radius: .3rem;
  color: #fff;
  text-align: center;
  margin: 1rem 0;
}

.pay_no {
  color: #E73838;
}
</style>
