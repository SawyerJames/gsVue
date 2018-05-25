<template>
  <div class="business txtContainer">
    <div class="txtContent borderBox">
      <p>平台现已开通无感支付功能，应用于高速收费站缴费。现使用场景为：长春高速收费站口：长春东01、10车道、龙嘉机场03、10车道。用户绑定车辆信息后可在以上收费站口自动识别车辆完成高速缴费，无需停车及人工干预操作。</p>
      <p> 平台二期计划导入加油站、停车场等缴费场景，为用户车辆缴费提供便捷高效的应用方式，打造车辆智能服务新平台！</p>
    </div>
    <general></general>
  </div>
</template>
<script>
export default {
  name: 'business',
  activated() {
    document.title = '已开通业务';
  }
}
</script>
