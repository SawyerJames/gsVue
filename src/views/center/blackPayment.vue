<template>
  <div class="blackPayment">
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <!-- 列表栏 -->
    <div class="listContent">
      <div class="list_module flexRow" v-for="(item,index) in payList.list">
        <div class="list_left">
          <p class="list_site">{{item.in_pos_id}}——{{item.out_pos_id}}</p>
          <ul class="list_ul">
            <li class="in_station">进站时间：{{item.in_time}}</li>
            <li class="out_station">进站时间：{{item.out_time}}</li>
          </ul>
        </div>
        <div class="list_right">
          <p class="list_site textRight">通行费用</p>
          <p class="list_money">{{item.pay_total_fee/100}}元</p>
          <p class="textRed list_site textRight">未支付</p>
        </div>
      </div>
      <div class="confirm" v-if="payTrue" @click="oneKeyPayment">一键还款</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'blackPayment',
  data() {
    return {
      // 加载待缴费列表
      payList: {},
      // 支付按钮
      payTrue: false,
      // 报错弹窗
      errShow: false,
      errTxt: ''
    }
  },
  activated() {
    // 加载待缴费列表
    let that = this;
    this.$tools.GetDataFromServer(
      this,
      this.$api.blackUserPayment,
      function success(res) {
        that.payList = res.data.data;
        that.payTrue = true;
      }
    )
  },
  methods: {
    // 一键还款，发起还款请求
    oneKeyPayment() {
      window.location = "https://gs.jltengfang.com/order/wxpay/mergeOrder?ordernum=" + this.payList.merge_order;
    }
  }
}
</script>
<style scoped>
.listContent {
  padding: 1rem;
}

.list_module {
  padding: 1rem 0.5rem 0.5rem;
  background: #fff;
  justify-content: space-between;
  border-radius: 5px;
  border: 1px solid #e0e0de;
  margin-bottom: 1rem;
}

.list_left {
  width: 70%;
}

.list_right {
  width: 25%;
}

.list_site {
  font-size: 0.875rem;
  color: #333;
}

.list_ul {
  margin-top: 0.25rem;
}

.list_ul li {
  color: #a7a7a7;
  font-size: 0.75rem;
  padding-left: 0.5rem;
}

.textRight {
  text-align: right;
}

.list_money {
  margin-top: 0.3rem;
  font-size: 0.875rem;
  text-align: right;
  color: #22ac38;
}

.list_examine {
  font-size: 0.875rem;
  color: #f8624a;
  text-align: right;
}

.in_station {
  background: url(../../assets/pay/green.png) no-repeat left center;
}

.out_station {
  background: url(../../assets/pay/red.png) no-repeat left center;
}

.textRed {
  color: #f76149;
}

.confirm {
  font-size: 0.875rem;
  text-align: center;
  background: #f76149;
  padding: 0.25rem 0;
  border-radius: 5px;
  color: #fff;
  letter-spacing: 1px;
}
</style>
