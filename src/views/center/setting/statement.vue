<template>
  <div class="statement borderBox">
    <!-- 循环常见问题列表 -->
    <div class="more_Ul" v-for="list in lists">
      <!-- 外部 -->
      <ul>
        <router-link tag="li" :to="{'name': list.path}" class="more_li flexRow">
          <span class="span_Title">{{list.title}}</span>
          <transition name="my-trans">
            <img src="../../../assets/setting_img/arrow.png" class="arrow">
          </transition>
        </router-link>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'statement',
  data() {
    return {
      lists: [{
        title: '免责协议',
        path: 'disclaimer'
      }, {
        title: '隐私协议',
        path: 'privacy'
      }, {
        title: '服务条款',
        path: 'registerTxt'
      }]
    }
  },
  activated() {
    document.title = '协议声明';
  }
}
</script>
<style scoped>
.statement {
  width: 100%;
  height: 100%;
  padding: 1rem .5rem;
  background: url(../../../assets/common/commonBg.png) no-repeat bottom;
  background-size: 100%;
}

.more_Ul {
  border-bottom: 1px solid #e0e0de;
}


/*常见问题外层li*/

.more_li {
  padding: 0 0.75rem;
  height: 2.29375rem;
  line-height: 2.29375rem;
  justify-content: space-between;
  -ms-align-items: center;
  align-items: center;
  font-size: 1rem;
}


/*三角转换*/

.more_li .arrowTransform {
  width: 1rem;
  height: 1rem;
  transition: all 0.1s ease-out;
  transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -webkit-transform: rotate(0deg);
  -o-transform: rotate(0deg);
}

.arrow {
  width: 1rem;
  height: 1rem;
  transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -webkit-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
}


/*问题标题*/

.span_Title {
  width: 100%;
  display: block;
  font-size: .875rem;
  color: #757575;
  font-weight: bold;
}


/*内部*/

.in_faq {
  line-height: 2rem;
  padding-left: 2.5rem;
  padding-right: 0.5rem;
  border-top: 1px solid #e0e0de;
  font-size: 0.8rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
}
</style>
