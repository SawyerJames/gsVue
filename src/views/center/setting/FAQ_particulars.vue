<template>
  <div class="FAQ_particulars">
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <div class="content borderBox">
      <p class="FAQ_title">{{faq_tittle}}</p>
      <div v-html="faq_content"></div>
    </div>
    <general></general>
  </div>
</template>
<script>
export default {
  name: 'FAQ_particulars',
  data() {
    return {
      particulars: null,
      faq_content: '',
      faq_tittle: '',
      // 报错弹窗
      errShow: false,
      errTxt: ''
    }
  },
  activated() {
    document.title = '问题详情';
    let that = this;
    // 获取上一页的参数
    this.particulars = this.$route.params.id
    this.faq_tittle = this.$route.params.title
      // 获取常见问题详细数据
    this.$tools.PostDataToServer(
      this,
      this.$api.getFAQDetail, {
        id: this.particulars
      },
      function success(res) {
        var faq_data = res.data;
        that.faq_content = faq_data.data.content;
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
  }
}
</script>
<style scoped>
.content {
  width: 100%;
  height: auto;
  padding: 1rem 2%;
}

.content p {
  text-indent: 1.75rem;
  font-size: .875rem;
}

.FAQ_title {
  font-weight: bold;
}
</style>
