<template>
  <!-- confirm组件 -->
  <div class="confirmWin">
    <div class="mask"></div>
    <div class="confirmWinContnt">
      <!-- 头部 -->
      <div class="confirmWin_Top flexCol">
        <!-- 插入上方信息图片 -->
        <img :src="img" class="confirmTopImg">
        <span class="confirmTitle">{{contitle}}</span>
      </div>
      <!-- 中间 -->
      <div class="confirmWin_middle flexRow">
        <div class="confirmMsg" v-html="content"></div>
      </div>
      <!-- 尾部 -->
      <div class="confirmWin_footer flexRow">
        <span class="confirm_cel" @click="cancelBtn">取消</span>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    name: 'confirm',
    props: ['img', 'contitle', 'content'],
    methods: {
      cancelBtn () {
        this.mask = false;
      }
    }
  }
</script>
