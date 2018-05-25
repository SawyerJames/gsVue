import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
import tools from './extend/tools'
import api from '@/extend/api'
import {
    TransferDom,
    Alert,
    Popup,
    Group,
    Cell,
    XButton,
    XSwitch,
    Scroller,
    Toast,
    Tab,
    TabItem,
    XAddress,
    ChinaAddressData,
    Actionsheet,
    DatetimePlugin,
    LocalePlugin,
    DevicePlugin,
    ToastPlugin,
    AlertPlugin,
    ConfirmPlugin,
    LoadingPlugin,
    WechatPlugin,
    AppPlugin
} from 'vux'
// 自定义全局组件
import errAlert from './components/errAlert'
import alert from './components/alert'
import loading from './components/loading'
import general from './components/general'
// 使用Vuex全局数据
Vue.use(Vuex)

// 全局注册组件
// 信息提示弹窗，错误提示弹窗，预加载组件，小型头部组件
Vue.component('alert',alert);
Vue.component('errAlert',errAlert);
Vue.component('loading',loading);
Vue.component('tab', Tab);
Vue.component('tab-item', TabItem);
Vue.component('general', general);
// 使用Vux框架
Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(LocalePlugin)
Vue.use(DatetimePlugin)
Vue.use(ConfirmPlugin)
    // Vux 页面切换显示loading
Vue.use(LoadingPlugin)
    // Vux 微信jssdk
Vue.use(WechatPlugin)

// 接口地址
Vue.prototype.$api = api
    // http方法
Vue.prototype.$http = axios
Vue.prototype.$tools = tools
    // vuex全局存储
Vue.prototype.$store = new Vuex.Store({
    state: {
        // 存储全局变量
        scan: Object,
        userCheck: null,
        registerChooseState: 0,
        tutoriaWin: true
    }
})

// Vux 页面切换显示loading 配置项
const store = new Vuex.Store({})
store.registerModule('vux', { // 名字自己定义
    state: {
        isLoading: false
    },
    mutations: {
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        }
    }
})
router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})
router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

//路由初始化/刷新程序返回路由
router.onReady(function() {
    router.push('/');
})

Vue.config.productionTip = false

// 实例化Vue
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
