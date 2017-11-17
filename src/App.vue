<template>
  <div id="app">
    <h1>腾放科技vue开发模板</h1>
  </div>
</template>

<script>
// 初始化&media样式文件，勿删
import './css/reset.css'
import './css/media.css'
export default {
  name: 'app'
}
</script>

<!-- vux less 默认reset样式，勿删 -->
<style lang="less">
  @import '~vux/src/styles/reset.less';
</style>

<!-- vue app挂载点全局样式：
  如果你擅长less编写，
  也可以在上方style标签内添加样式 -->
<style>
  h1{
    text-align: center;
    margin-top: 2rem;
  }
</style>
