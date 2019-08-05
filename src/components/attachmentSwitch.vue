<template>
    <view class="picker-wrap">
        <van-picker
          show-toolbar
          :columns="attachArr"
          value-key="attachName"
          visible-item-count="3"
          @cancel="onCancel"
          @confirm="onConfirm"
        />
    </view>
</template>
<script>
    export default {
        props: ['importData'],
        data () {
            return {
                // 评分数据
                attachArr:[]
                // attachArr: ['杭州', '宁波', '温州', '嘉兴', '湖州']
            }
        },
        created(){
            if (this.importData.length>0) {
                this.attachArr=this.importData
            }
        },
        mounted() {
        },
        methods:{
            // 取消
            onCancel(e){
                // this.drawerBottomShow=false
                this.$emit("exportData",{show:false})
            },
            // 确定
            onConfirm(e){
                // this.drawerBottomShow=false
                this.$emit("exportData",{data:e.target.value,show:false})
            },
        }
    }
</script>
<style scoped>

/* 评分组件 */
.picker-wrap{
    padding:20rpx 0rpx;
}
.picker-title-wrap{
    line-height: 62rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    border-bottom:1px solid #F5F5F5;
}
.picker-title-close{
    color:#9D9D9D;
}
.picker-title-score{
    color:#4A4A4A;
}
.picker-title-sure{
    color:#0078E2;
}
</style>
