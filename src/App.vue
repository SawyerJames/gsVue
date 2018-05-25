<template>
  <div id="app">
    <!-- APP路由挂载点 -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import './css/reset.css'
import './css/media.css'
import './css/common.css'
export default {
  name: 'app',
  beforeCreate() {
    document.title = '无感付';
    // 同步ajax获取用户认证状态
    let that = this;
    let xhr = new XMLHttpRequest();
    xhr.open("get", process.env.API_HOST + 'index/check/IsSession', false);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        let data = xhr.responseText;
        data = eval("(" + data + ")");
        // 如果授权不成功，data.data不为false，跳转到Home页
        if (data.data == false) {
          window.location.href = process.env.API_HOST + 'index/auto';
        }
      }
    };
    // 进行ajax交互
    xhr.send();
  }
}
</script>
<style lang="less">
@import '~vux/src/styles/reset.less';
</style>
<style>
#app {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  color: #333;
}
</style>
