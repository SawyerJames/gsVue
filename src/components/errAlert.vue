<template>
    <!-- 错误提示弹窗 -->
    <div>
        <div class="mask maskError" v-if="errShow"></div>
        <div class="errorWin" v-if="errShow">
            <img src="../assets/common/ErrLoading.gif">
            <p>{{errTxt}}</p>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    props: ['errShow', 'errTxt']
}
</script>
