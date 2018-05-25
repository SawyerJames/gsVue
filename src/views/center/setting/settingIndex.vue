<template>
  <div class="set borderBox">
    <ul>
      <router-link class="flexRow setting" tag="li" v-for="(item,index) in list" :to="{path:item.to,name:item.name,params: { set_index: index}}">
        <div class="flexRow setting_one">
          <img :src="item.setting_img" class="sz_img">
          <span>{{item.option}}</span>
        </div>
        <div><img src="../../../assets/setting_img/sz_img.jpg" class="sz_img"></div>
      </router-link>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'settingIndex',
  data() {
    return {
      list: [{
        option: '常见问题',
        to: 'FAQ',
        name: 'FAQ',
        setting_img: require('../../../assets/setting_img/sz_cjwt_03.jpg')
      }, {
        option: '意见反馈',
        to: 'feedback',
        name: 'feedback',
        setting_img: require('../../../assets/setting_img/sz_xysm_15.jpg')
      }, {
        option: '使用指南',
        to: 'operating',
        name: 'operating',
        setting_img: require('../../../assets/setting_img/sz_syzn_09.jpg')
      }, {
        option: '无感付介绍',
        to: 'Noninductive',
        name: 'Noninductive',
        setting_img: require('../../../assets/setting_img/sz_wgzf_12.jpg')
      }, {
        option: '协议声明',
        to: 'statement',
        name: 'statement',
        setting_img: require('../../../assets/setting_img/sz_xysm_15.jpg')
      }]
    }
  },
  activated() {
    document.title = '设置中心';
  }
}
</script>
<style scoped>
.set {
  width: 100%;
  height: 100%;
  padding: .5rem 5% 0;
  background: url(../../../assets/common/commonBg.png) no-repeat bottom;
  background-size: contain;
}

.setting {
  height: 2.9375rem;
  font-size: .875rem;
  justify-content: space-between;
  -ms-align-items: center;
  align-items: center;
}

.setting_one {
  -ms-align-items: center;
  align-items: center;
}

.setting_one span {
  margin-left: 1.09375rem;
}

.setting_one img {
  width: 1.4375rem;
  height: 1.4375rem;
}

.sz_img {
  width: 0.53125rem;
}
</style>
