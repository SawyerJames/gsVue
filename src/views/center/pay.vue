<template>
  <div class="pay">
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <div class="pay_one">
      <!-- 筛选栏 -->
      <div class="search flexRow">
        <select class="selectType">
          <option value="0">高速</option>
        </select>
        <!-- 日期筛选：年月 -->
        <group class="group flexRow">
          <datetime class="datetime flex_1" format="YYYY-MM" :max-year=maxYear @on-change="getPayMsg(1)" v-model="dataValue"></datetime>
        </group>
      </div>
      <!-- 列表栏：scroller下拉刷新 payFlag为数据是否为空 -->
      <scroller v-model="scrollerStatus" class="scroller" use-pullup lock-x @on-pullup-loading="onScrollBottom" ref="scrollerBottom" height="-80">
        <!-- 列表栏容器 -->
        <div class="listContent">
          <div tag="div" class="list_module flexRow" v-for="(item,index) in payList" @click="goDetailPage(item.id,item.pay_total_fee)">
            <div class="list_left">
              <p>{{item.in_pos_id}}——{{item.out_pos_id}}</p>
              <ul class="list_ul">
                <li class="in_station">进站时间：{{item.in_time}}</li>
                <li class="out_station">进站时间：{{item.out_time}}</li>
              </ul>
            </div>
            <div class="list_right">
              <p class="right">通行费用</p>
              <p class="list_money">{{item.pay_total_fee/100}}元</p>
              <p v-bind:class="item.is_pay==='已支付'?'blackColor':'redColor'" class="right">{{item.is_pay}}</p>
              <p class="list_examine">查看详情</p>
            </div>
          </div>
          <!-- 暂无数据 -->
          <div class="signContent flexCol" v-if="payFlag == 0">
            <span class="sign">暂无数据</span>
          </div>
          <!-- 触底无数据 -->
          <div class="signContent flexCol" v-if="payFlag == 2">
            <span class="sign">--已经到底啦--</span>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>
<script>
import {
  Datetime,
  Scroller,
  LoadMore,
  Group
} from 'vux'
export default {
  name: 'pay',
  data() {
    return {
      // 报错弹窗
      errShow: false,
      errTxt: '',
      // 日期筛选
      dataValue: '',
      maxYear: null,
      // 缴费明细
      payList: [],
      page: 1,
      // 缴费明细数据是否为空
      payFlag: 1,
      // 下拉刷新相关
      onFetching: false,
      scrollerStatus: {
        pullupStatus: 'enabled'
      }
    }
  },
  created() {
    let that = this;
    // 格式化日期
    let datetime = new Date();
    let month = datetime.getMonth() + 1;
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    let formatData = datetime.getFullYear() + '-' + month;
    this.dataValue = formatData;
    this.maxYear = parseInt(datetime.getFullYear());
  },
  activated() {
    document.title = '缴费明细';
    // 进入后重置初始位置
    this.$nextTick(() => {
      this.$refs.scrollerBottom.reset({
        top: 0
      })
    });
    // 格式化日期
    let datetime = new Date();
    let month = datetime.getMonth() + 1;
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    let formatData = datetime.getFullYear() + '-' + month;
    this.maxYear = parseInt(datetime.getFullYear());
    this.dataValue = formatData;
    // 进入后获取当月缴费数据
    this.getPayMsg(1);
  },
  methods: {
    // 携带ID跳转至详情页
    goDetailPage(id, money) {
      this.$router.push({
        name: 'payDetail',
        params: {
          id: id,
          money: money
        }
      });
    },
    // 获取缴费数据
    getPayMsg(dataPage) {
      let that = this;
      // 如果dadaPage不是undefined，说明是更改日期后开始获取数据
      if (dataPage != undefined) {
        // 页数清零
        this.page = dataPage;
        this.$tools.PostDataToServer(
          this,
          this.$api.getPay, {
            page: this.page,
            type: 1,
            time: this.dataValue
          },
          function success(res) {
            // 缴费明细是否为空，为空则显示暂无数据,并且禁用下拉
            if (res.data.data.length != 0) {
              that.payFlag = 1;
              that.scrollerStatus.pullupStatus = 'enabled';
              // 重新启动下拉
              // that.$refs.scrollerBottom.enablePullup();
            } else {
              that.payFlag = 0;
              that.scrollerStatus.pullupStatus = 'disabled';
            }
            // 重置初始位置
            that.$refs.scrollerBottom.reset({
              top: 0
            });
            // 填充数据
            let resPayList = res.data.data;
            that.payList = resPayList;
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
      // 否则直接加载数据
      else {
        this.$tools.PostDataToServer(
          this,
          this.$api.getPay, {
            page: this.page,
            type: 1,
            time: this.dataValue
          },
          function success(res) {
            // 缴费明细是否为空，非空启动下拉，为空禁止下拉
            if (res.data.data.length == 0) {
              that.payFlag = 2;
              that.scrollerStatus.pullupStatus = 'disabled';
            } else {
              that.payFlag = 1;
              that.scrollerStatus.pullupStatus = 'enabled';
              // 重新启动下拉
              // that.$refs.scrollerBottom.enablePullup();
            }
            // 填充数据
            let resPayList = res.data.data;
            for (let item in resPayList) {
              that.payList.push(resPayList[item]);
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
    },
    // 如果处于下拉刷新状态中
    onScrollBottom() {
      var that = this;
      // 正在处于下拉刷新中：timer => 2s刷新
      if (!this.onFetching) {
        this.onFetching = true;
        // 定时器刷新
        setTimeout(() => {
          // 增加页数
          that.page += 1;
          // 获取数据
          that.getPayMsg();
          // 关闭loading，并将下拉刷新处于前置条件下
          that.onFetching = false;
          // 完成下拉状态
          that.$refs.scrollerBottom.donePullup();
          // 重置下拉状态
          that.scrollerStatus.pullupStatus = 'default';
        }, 1000)
      }
    }
  },
  components: {
    Datetime,
    Scroller,
    LoadMore,
    Group
  }
}
</script>
<style scoped>
/*页面背景*/

.pay {
  height: 100%;
  background: #fafafa;
}

.pay_one {
  height: 100%;
  background: #fafafa;
}


/*搜索*/

.search {
  background: #f8624a;
  height: 1.875rem;
  padding: .75rem 0.65625rem;
  justify-content: space-between;
}


/* 日期筛选 */

.group {
  width: 70%;
  background: #ffffff;
  border-radius: 7px;
  color: #a7a7a7;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.datetime {
  text-decoration: none;
}


/*类型筛选*/

.selectType {
  width: 25%;
  border: 0;
  text-align: center;
  border-radius: 7px;
  background: #fff;
  color: #a7a7a7;
  outline: none;
}


/*暂无数据提示*/

.signContent {
  width: 100%;
  height: 1rem;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}


/*列表容器*/

.listContent {
  padding: 0 1.09375rem;
  margin-top: 1rem;
}

.list_module {
  padding: 1rem 0.65625rem 0.4375rem 0.65625rem;
  background: #ffffff;
  justify-content: space-between;
  border-radius: .25rem;
  border: 1px solid #e0e0de;
  margin-bottom: 1rem;
}

.list_left {
  width: 70%;
  font-size: .875rem;
}

.list_right {
  width: 25%;
  font-size: .875rem;
}

.list_ul {
  margin-top: 0.3125rem;
}

.list_ul li {
  color: #a7a7a7;
  font-size: .75rem;
  padding-left: 0.6875rem;
}

.right {
  text-align: right;
}

.list_money {
  font-size: 0.975rem;
  text-align: right;
  color: #22ac38
}

.list_examine {
  font-size: 0.8125rem;
  color: #f8624a;
  text-align: right;
}

.in_station {
  background: url(../../assets/pay/green.png) no-repeat left center;
}

.out_station {
  background: url(../../assets/pay/red.png) no-repeat left center;
}


/*支付配色*/

.redColor {
  color: #E73838;
}

.blackColor {
  color: #999;
}
</style>
