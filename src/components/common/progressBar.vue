<template>
    <div>
        <div class="progressBar">
            <div class="bar" :style="{width:progress+'%'}">{{(current||'')+"/"+(total ||'')}}</div>
        </div>
    </div>
</template>
<script>
export default {
    name:"detailProgress",
    props:['current','total'],
    computed:{
        progress(){
            return parseInt((this.current)/(this.total)*100)-2 || 0
        }
    }
}
</script>
<style lang="scss" scoped>
.progressBar {
    display: inline-block;
    width: 100%;
    font-size: 12px;
  
    // margin-left: -25px;
    /* padding: 0px 0; */
    background: #ebeef5;
    line-height: 20px;
    border-radius: 32px;
    color:#585858;
    
}
.bar {
    background-color: #409EFF;
    border-radius: 30px;
    padding-left:5px;
}
</style>
