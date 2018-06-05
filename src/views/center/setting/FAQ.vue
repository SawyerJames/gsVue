<template>
  <div class="FAQ borderBox">
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <div class="ulContainer">
      <!-- 循环常见问题列表 -->
      <div class="more_Ul" v-for="(list,index) in lists">
        <ul>
          <li class="more_li flexRow" @click="zhankai(index)">
            <span class="span_Title">{{list.title}}</span>
            <transition name="my-trans">
              <img src="../../../assets/setting_img/arrow.png" ref="rotate" :class="currentIndex === index ?'arrowTransform':'arrow'">
            </transition>
          </li>
        </ul>
        <ul>
          <li v-for="list1 in list.childer" v-if="currentIndex == index" class="in_faq" @click="goFAQlPage(list1.id,list1.title)">
            {{list1.title}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FAQ',
  data() {
    return {
      lists: [],
      currentIndex: null,
      currentFlag: false,
      // 报错弹窗
      errShow: false,
      errTxt: ''
    }
  },
  created() {
    let that = this;
    // 获取常见问题列表
    this.$tools.GetDataFromServer(
      this,
      this.$api.getFAQ,
      function success(res) {
        var faq_data = res.data.data;
        that.lists = faq_data;
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
  activated() {
    document.title = '常见问题';
  },
  methods: {
    // 展开列表
    zhankai(index) {
      if (this.currentIndex != index) {
        this.currentIndex = index;
      } else {
        this.currentIndex = null;
      }
    },
    // 跳转详细页，传递参数id，title
    goFAQlPage(id, title) {
      this.$router.push({
        name: 'FAQ_particulars',
        params: {
          id: id,
          title: title
        }
      });
    },
  }
}
</script>
<style scoped>
.FAQ {
  width: 100%;
  height: 100%;
  padding: 1rem 0.5rem;
  background: url(../../../assets/common/commonBg.png) no-repeat bottom;
  background-size: 100%;
}

.ulContainer {
  width: 100%;
  height: 90%;
  overflow: auto;
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
}


/*内部*/

.in_faq {
  /*height: 2.29375rem;*/
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
