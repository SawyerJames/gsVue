<template>
<div>
  <div class="mask alertMask" v-if="alert"></div>
  <div class="alert_win" v-if="alert">
    <h1 class="alert_title">{{title}}</h1>
    <div class="alert_text borderBox flexCol" v-html="text"></div>
  </div>
</div>
</template>
<script type="text/javascript">
export default {
  props: ['alert', 'title', 'text']
}
</script>
<style type="text/css" scoped>
.alertMask{
  z-index: 9998;
}
.alert_win {
  width: 14rem;
  height: auto;
  background: #fff;
  border-radius: .25rem;
  font-size: 0.875rem;
  z-index: 9999;
  position: fixed;
  top: 30%;
  left: 50%;
  margin-left: -7rem;
}

.alert_title {
  height: 2.5rem;
  line-height: 2.5rem;
  padding-left: 5%;
  color: #fff;
  background: #f8624a;
  border-radius: .25rem .25rem 0 0;
}

.alert_text {
  width: 100%;
  padding: 1rem .5rem;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}
</style>
