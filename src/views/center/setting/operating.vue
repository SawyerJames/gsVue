<template>
  <div class="operating txtContainer">
    <div class="txtContent borderBox">
      <p>尊敬的用户：</p>
      <p>您好！感谢您使用本平台，我们一直致力于为您提供更好更便捷的车平台服务。</p>
    </div>
    <general></general>
  </div>
</template>
<script>
export default {
  name: 'operating',
  activated() {
    document.title = '使用指南';
  }
}
</script>
