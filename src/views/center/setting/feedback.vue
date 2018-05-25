<template>
  <div class="feedback">
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <!-- alert与校验组件 -->
    <alert :alert="alert" :title="title" :text="text"></alert>
    <h1 class="validate" v-if="validate">{{validate}}</h1>
    <!-- 主容器 -->
    <div class="feedbackContent borderBox">
      <p class="feedback_headline">您有什么问题或建议想对我们说？</p>
      <!-- 反馈内容 -->
      <textarea autofocus class="text_field borderBox" v-model.trim="textareaVal" placeholder="您的宝贵意见，就是我们进步的源泉">
      </textarea>
      <!-- 投诉照片 -->
      <div class="imgContent flexRow">
        <!-- 图片上传组件 slot插槽增加样式 -->
        <uploadSmall @popBaseImg="popBaseImg_1">
          <img src="../../../assets/common/add_2.png">
        </uploadSmall>
        <!-- 图片上传组件 slot插槽增加样式 -->
        <uploadSmall @popBaseImg="popBaseImg_2">
          <img src="../../../assets/common/add_2.png">
        </uploadSmall>
      </div>
      <p class="feedback_ending">(*^_^*)请详细描述您遇到的问题，有助于我们快速定位并解决问题，或留 下您宝贵的建议或意见，我们会认真进行评估！
      </p>
      <!-- 立即提交 -->
      <div class="submitBtnContent flexRow">
        <button type="button" class="submitBtn" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
import uploadSmall from '../../../components/uploadSmall'
export default {
  name: 'feedback',
  data() {
    return {
      // 报错弹窗
      errShow: false,
      errTxt: '',
      validate: "",
      // 投诉内容
      textareaVal: "",
      // 投诉照片
      file1: '',
      file_back: '',
      // alert弹窗
      alert: false,
      title: '提交成功',
      text: '您已提交成功<br/>我们会考虑您的建议',
    }
  },
  activated() {
    document.title = '意见中心';
    // 重置数据
    this.file1 = '';
    this.file_back = '';
    this.textareaVal = '';
  },
  methods: {
    // 图片上传
    popBaseImg_1(baseImg) {
      this.file1 = baseImg;
    },
    popBaseImg_2(baseImg) {
      this.file_back = baseImg;
    },
    // 提交意见
    submit() {
      let that = this;
      var text_field = this.textareaVal;
      // 验证：内容是否为空
      if (text_field == '') {
        that.validate = '反馈问题不能为空'
        setTimeout(function() {
          that.validate = ''
        }, 1500);
      }
      // 不为空则发送数据
      else {
        this.$tools.PostDataToServer(
          this,
          this.$api.postOpinion, {
            content: this.textareaVal,
            file0: this.file1,
            file1: this.file_back
          },
          function success(res) {
            // 显示弹窗
            that.alert = true;
            // 隐藏弹窗并1.5s后跳转
            var hideAlert = setTimeout(function() {
              that.alert = false;
              // 重置数据
              that.file1 = '';
              that.file_back = '';
              that.textareaVal = '';
              // 退回上一页
              that.$router.go(-1);
            }, 1500)
          },
          function error(err) {
            that.errShow = true;
            that.errTxt = '网络错误,请重试';
            var errLoading = setTimeout(function() {
              that.errShow = false;
              that.errTxt = ''
              clearTimeout(errLoading);
            }, 2000);
          }
        )
      }
    }
  },
  components: {
    uploadSmall
  }
}
</script>
<style scoped>
.feedback {
  width: 100%;
  height: 100%;
  background: #fff;
}


/*主容器*/

.feedbackContent {
  width: 90%;
  height: 100%;
  font-size: .875rem;
  margin: 0 auto;
  padding-top: 1rem;
}


/*标题*/

.feedback_headline {
  color: #f8624a;
}


/*文本框*/

.text_field {
  width: 100%;
  height: 10rem;
  margin-top: .5rem;
  padding: .25rem;
  border-radius: 5px;
  border: 1px solid #e0e0de;
  outline: none;
}


/*投诉图片*/

.imgContent {
  width: 100%;
  height: 3rem;
  border: 1px solid #ddd;
  border-radius: .25rem;
  -ms-align-items: center;
  align-items: center;
}


/*尾部*/

.feedback_ending {
  font-size: .75rem;
  color: #999;
  margin-top: 1rem;
}


/*提交*/

.submitBtnContent {
  width: 100%;
  height: 2.5rem;
  margin: 1rem 0;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.submitBtn {
  width: 90%;
  height: 2rem;
  border: none;
  outline: none;
  color: #fff;
  border-radius: .5rem;
  background: #f76149;
}
</style>
