<template>
  <div class="notice">
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <!-- 公告标题 -->
    <h1 class="noticeTitle">{{noticeMsg.title}}</h1>
    <!-- 公告内容：v-html过滤内容标签 -->
    <div class="noticeContent" v-html="noticeMsg.content"></div>
    <!-- 底部背景 -->
    <div class="bgHack"></div>
    <img src="../../assets/common/commonBg.png" class="bottomBg">
  </div>
</template>
<script>
export default {
  name: 'notice',
  data() {
    return {
      noticeId: 0,
      noticeMsg: {
        title: '',
        content: ''
      },
      // 报错弹窗
      errShow: false,
      errTxt: '',
    }
  },
  activated() {
    let that = this;
    document.title = '通知公告';
    // 获取路由传递的通知公告id
    this.noticeId = this.$route.params.id
      // 由id获取详细数据
    this.$tools.PostDataToServer(
      this,
      this.$api.getNoticeMsg, {
        id: this.noticeId
      },
      function success(res) {
        // 接口成功
        if (res.data.state == 0) {
          that.noticeMsg.title = res.data.data.name;
          that.noticeMsg.content = res.data.data.content;
        }
      },
      function error(err) {
        that.errShow = true;
        that.errTxt = '出现错误'
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
.noticeTitle {
  width: 100%;
  height: auto;
  padding: 1rem 0;
  text-align: center;
}

.noticeContent {
  width: 95%;
  margin: 0 auto;
  font-size: .875rem;
}

.bottomBg {
  width: 100%;
  height: 3rem;
  position: fixed;
  bottom: 0;
  left: 0;
}

.bgHack {
  width: 100%;
  height: 3rem;
  background: none;
}
</style>
