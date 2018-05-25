import Vue from 'vue'
import Router from 'vue-router'

// 路由页面：首页，引导页
import bootPage from '../views/bootPage'
import index from '../views/index'
// 注册相关
import register from '../views/register/register'
import registerChoose from '../views/register/registerChoose'
import registerTxt from '../views/register/registerTxt'
import register_back from '../views/register/register_back.vue'
// 无感支付
import map from '../views/map/map'
// 通知公告
import notice from '../views/notice/notice'
// 个人中心
import centerIndex from '../views/center/index'
import account from '../views/center/account'
// 缴费明细
import pay from '../views/center/pay'
import payDetail from '../views/center/payDetail'
// 设置相关
import business from '../views/center/business'
import settingIndex from '../views/center/setting/settingIndex'
import feedback from '../views/center/setting/feedback'
import operating from '../views/center/setting/operating'
import Noninductive from '../views/center/setting/Noninductive'
import FAQ from '../views/center/setting/FAQ'
import FAQ_particulars from '../views/center/setting/FAQ_particulars'
// 声明协议
import statement from '../views/center/setting/statement'
import privacy from '../views/center/setting/privacy'
import disclaimer from '../views/center/setting/disclaimer'
// 投诉相关
import complaint from '../views/complaint/complaint'
import complaintMsg from '../views/complaint/complaintMsg'
import complaintType from '../views/complaint/complaintType'
// 404
import firstPage from '../views/404.vue'

Vue.use(Router)

export default new Router({
  base: '/', //基目录
  routes: [
    // 引导页
    {
      path: '/',
      name: 'bootPage',
      component: bootPage
    },
    // 首页
    {
      path: '/index',
      name: 'index',
      component: index
    },
    // 无感支付
    {
      path: '/map',
      name: 'map',
      component: map
    },
    // 注册相关
    {
      path: '/register',
      name: 'register',
      component: register
    }, {
      path: '/registerChoose',
      name: 'registerChoose',
      component: registerChoose
    }, {
      path: '/registerTxt',
      name: 'registerTxt',
      component: registerTxt
    }, {
      path: '/register_back',
      name: 'register_back',
      component: register_back
    },
    // 最新公告
    {
      path: '/notice',
      name: 'notice',
      component: notice
    },
    // 个人中心
    {
      path: '/center',
      name: 'centerIndex',
      component: centerIndex
    }, {
      path: '/account',
      name: 'account',
      component: account
    },
    // 缴费明细相关
    {
      path: '/pay',
      name: 'pay',
      component: pay
    }, {
      path: '/payDetail',
      name: 'payDetail',
      component: payDetail
    },
    // 投诉相关
    {
      path: '/complaint',
      name: 'complaint',
      component: complaint
    }, {
      path: '/complaintMsg',
      name: 'complaintMsg',
      component: complaintMsg
    }, {
      path: '/complaintType',
      name: 'complaintType',
      component: complaintType
    },
    //设置首页
    {
      path: '/setting',
      name: 'settingIndex',
      component: settingIndex
    },
    //设置_常见问题
    {
      path: '/FAQ',
      name: 'FAQ',
      component: FAQ
    }, {
      path: '/FAQ_particulars',
      name: 'FAQ_particulars',
      component: FAQ_particulars
    },
    //设置_意见反馈
    {
      path: '/feedback',
      name: 'feedback',
      component: feedback
    },
    //设置_使用指南模板
    {
      path: '/operating',
      name: 'operating',
      component: operating
    },
    //设置_使用指南模板
    {
      path: '/Noninductive',
      name: 'Noninductive',
      component: Noninductive
    },
    //设置_协议声明
    {
      path: '/statement',
      name: 'statement',
      component: statement
    }, {
      path: '/privacy',
      name: 'privacy',
      component: privacy
    }, {
      path: '/disclaimer',
      name: 'disclaimer',
      component: disclaimer
    },
    // 已开通业务
    {
      path: '/business',
      name: 'business',
      component: business
    }
  ]
})
