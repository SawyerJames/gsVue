// API基路径
const url = 'https://gs.jltengfang.com/';

// API子路径
const API = {
  // 引导页
  BootPage: url + 'way/user/getUserIsReg',
  // 用户信息
  getUserInfo: url + 'index/user/getUserInfo',
  // 最新通告
  getNotice: url + 'index/more/notice',
  getNoticeMsg: url + 'index/more/notice_details',
  // 获取动态二维码
  getScan: url + 'index/index/qrcode',
  // 获取注册人数
  getRegisterNumber: url + 'index/user/getCountUser',
  // 手机号修改
  postChangePhone: url + 'index/user/changePhone',
  // 注册
  postRegister_back: url + 'way/user/userBindCar',
  postRegister: url + 'way/user/bindUserWithVehicle',
  getCode: url + 'way/user/reccode',
  // 老用户已绑定信息
  getOldUserMsg: url + 'index/user/BindingsList',
  // 老用户一键绑定
  bindOldUser: url + 'index/user/bindings',
  // 检测新老用户标签
  checkUser: url + 'index/user/checkIsOldUser',
  // 解绑信息
  getUnbind: url + 'index/user/unbind',
  // 缴费明细
  getPay: url + 'parking/Payment_Records/paymentData',
  payDetail: url + 'details/details/paymentDetails',
  // 唤起微信支付
  postMoney: url + 'order/wxpay/repayment',
  // 意见反馈&投诉申请：
  postOpinion: url + 'index/More/feedBack',
  postComplaint: url + 'index/more/complaint',
  // 常见问题：
  getFAQ: url + 'index/more/faq',
  getFAQDetail: url + 'index/more/faqDetails',
  // 黑名单
  checkBlackUser: url + 'index/user/checkBlackUser',
  // 黑名单列表
  blackUserPayment: url + 'parking/Payment_Records/blackUserPayment',
  // 黑名单人员还款
  blackUserPay: url + ''
};
export default API;
