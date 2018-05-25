<template>
  <div class="complaintType">
    <errAlert :errShow="errShow" :errTxt="errTxt"></errAlert>
    <!-- alert与校验组件 -->
    <alert :alert="alert" :title="title" :text="text"></alert>
    <h1 class="validate" v-if="validate">{{validate}}</h1>
    <!-- 主容器 -->
    <div class="complaintContent borderBox">
      <p class="complaint_headline">请阐述您要投诉的内容</p>
      <!-- 投诉内容 -->
      <textarea autofocus class="text_field borderBox" v-model="textareaVal" placeholder="描述：可补商户信息，阐述交易过程">
      </textarea>
      <!-- 投诉照片 -->
      <div class="imgContent flexRow">
        <!-- 图片上传组件 slot插槽增加样式 -->
        <uploadSmall class="uploadImgDefalut" @popBaseImg="popBaseImg_1">
          <img src="../../assets/common/add_2.png">
        </uploadSmall>
        <!-- 图片上传组件 slot插槽增加样式 -->
        <uploadSmall class="uploadImgDefalut" @popBaseImg="popBaseImg_2">
          <img src="../../assets/common/add_2.png">
        </uploadSmall>
      </div>
      <p class="complaint_ending">可上传商户资料照片，以及其他证据</p>
      <a href="tel:0431-81872579" class="complaint_ending">紧急投诉电话：0431-81872579</a>
      <!-- 立即提交 -->
      <div class="submitBtnContent flexRow">
        <button type="button" class="submitBtn" @click="submit">提交</button>
      </div>
    </div>
  </div>
</template>
<script>
import uploadSmall from '../../components/uploadSmall.vue'
export default {
  name: 'complaintType',
  data() {
    return {
      validate: "",
      type: '',
      // 报错弹窗
      errShow: false,
      errTxt: '',
      // 投诉内容
      textareaVal: "",
      // 投诉照片
      file1: '',
      file_back: '',
      // alert弹窗
      alert: false,
      title: '提交成功',
      text: '您已提交成功<br/>我们会认真面对此事',
    }
  },
  activated() {
    // 接收投诉类型
    this.type = this.$route.params.type;
    // 重置数据
    this.file1 = '';
    this.file_back = '';
    this.textareaVal = '';
    document.title = '投诉内容';
  },
  methods: {
    // 图片上传
    popBaseImg_1(baseImg) {
      this.file1 = baseImg;
    },
    popBaseImg_2(baseImg) {
      this.file_back = baseImg;
    },
    // 提交投诉
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
          this.$api.postComplaint, {
            content: this.textareaVal,
            file0: this.file1,
            file1: this.file_back,
            type: this.type
          },
          function success(res) {
            // 接口调通
            if (that.res.data.state == 0) {
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
            }
          },
          function error(err) {
            that.errShow = true;
            that.errTxt = '出现错误，请重试'
            var errLoading = setTimeout(function() {
              that.errShow = false;
              that.errTxt = '';
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
.complaintType {
  width: 100%;
  height: 100%;
  background: #fff;
}


/*主容器*/

.complaintContent {
  width: 90%;
  margin: 0 auto;
  font-size: .875rem;
}


/*标题*/

.complaint_headline {
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


/* 投诉尾部 */

.complaint_ending {
  font-size: .75rem;
  color: #adadad;
  margin-top: 1rem;
  text-align: left;
  text-decoration: none;
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
