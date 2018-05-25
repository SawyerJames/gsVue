<template>
  <div class="complaint">
    <!-- 投诉类型 -->
    <div class="complaintType flexCol">
      <div class="complaint_module typeSign flexRow">
        <span>请选择投诉商户的原因</span>
      </div>
      <router-link tag='div' class="complaint_module flexRow" :to="{name: 'complaintType',params:{type: '涉嫌返利、多级代理分销'}}">
        <span>涉嫌返利、多级代理分销</span>
        <img src="../../assets/center/arrow.png">
      </router-link>
      <router-link tag='div' class="complaint_module flexRow" :to="{name: 'complaintType',params:{type: '涉及赌博、淫秽等传播信息'}}">
        <span>涉及赌博、淫秽等传播信息</span>
        <img src="../../assets/center/arrow.png">
      </router-link>
      <router-link tag='div' class="complaint_module flexRow" :to="{name: 'complaintType',params:{type: '涉及套取金额'}}">
        <span>涉及套取金额</span>
        <img src="../../assets/center/arrow.png">
      </router-link>
      <router-link tag='div' class="complaint_module flexRow" :to="{name: 'complaintType',params:{type: '其他'}}">
        <span>其他</span>
        <img src="../../assets/center/arrow.png">
      </router-link>
    </div>
    <!-- 投诉须知 -->
    <router-link tag='div' to="complaintMsg" class="complaintBottom">
      <span>投诉须知</span>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'complaint',
  activated() {
    document.title = '投诉中心';
  }
}
</script>
<style scoped>
.complaint {
  width: 100%;
  height: 100%;
  background: url(../../assets/common/commonBg.png) no-repeat bottom;
  background-size: contain;
}

.complaintType {
  width: 100%;
  height: auto;
  padding-top: 1rem;
  -ms-align-items: center;
  align-items: center;
}


/*每个投诉类型模型*/

.complaint_module {
  width: 90%;
  height: 2.5rem;
  font-size: .875rem;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
  -ms-align-items: center;
  align-items: center;
}

.typeSign {
  color: #f8624a;
  font-weight: bold;
}

.complaint_module img {
  width: .5rem;
}


/*投诉须知*/

.complaintBottom {
  width: 100%;
  height: auto;
  font-size: .875rem;
  color: #999;
  text-align: center;
  position: fixed;
  bottom: 4rem;
}
</style>
