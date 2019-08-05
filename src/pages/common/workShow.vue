<template>
    <div class="top-wrap">
        <view class='bg-white marginTop10 vertical'>
            <view class="pay-hint-tille-wrap">
                <text class='pay-hint-tille'>{{workNum}}</text>
                <text class='pay-hint-tille-border'></text>
            </view>
            <text :class="['pay-hint-content',ellipsis?'ellipsis':'unellipsis',worksData.description?'':'des-null']">{{worksData.description?worksData.description:'暂无描述'}}</text>
            <view v-if="worksData.description">
                <view class='bg-white-ellipsis' v-if="ellipsis">
                    <view class="bg-white-ellipsis-shadow"></view>
                    <text class='bg-white-ellipsis-txt' @click='clickEllipsis'>查看全文</text>
                </view>
                <view class='bg-white-ellipsis' v-else>
                    <text class='bg-white-ellipsis-txt' @click='clickEllipsis'>收起</text>
                </view>
            </view>
        </view>
    </div>
</template>
<script>
// Use Vuex

export default {
    props: ['importData'],
    data(){
        return {
            workNum:'作品编号',//作品编号
            ellipsis:true,
            worksData:{
                description:''
            },
        }
    },
    computed: {

    },
    created(){
    },
    onLoad(options){
        if (options.id) {
            this.workNum=options.id
        }
        if (this.importData.description) {
            this.worksData.description=this.importData.description
        }else{
            this.worksData.description=''
        }
    },
    mounted(){
        // console.log("mounted")
    },
    onShow(){
        // console.log("onShow")
    },
    methods: {
        clickEllipsis(){
            // console.log(23);
            this.ellipsis=!this.ellipsis;
        },
    }
}
</script>

<style scoped>
.top-wrap{
    background:  -webkit-linear-gradient(left, #017AE0 , #2AD0B3);
    padding-top: 26rpx;
    font-size: 36rpx;
    line-height: 52rpx;
}
/* top-wrap */
.bg-white{
    background: #fff;
    padding-top: 32rpx;
    padding-bottom: 32rpx;
    position: relative;
    border-top-left-radius: 30rpx;
    border-top-right-radius: 30rpx;
    box-shadow: 0px 10rpx 10rpx #E6F0F7;
}
/* top-title */
.pay-hint-tille-wrap{
    text-align: center;
}
.pay-hint-tille{
    font-size: 19px;
    font-weight:550;
    color:rgba(74,74,74,1);
    line-height:24px;
}
.pay-hint-tille-border{
    display: block;
    width: 52rpx;
    border-bottom: 2px solid #D7DFE8;
    margin: 0 auto;
}
/* top-centent */
.pay-hint-content{
  margin-left: 30rpx;
  margin-right: 30rpx;
  margin-top: 10px;
  color: #4A4A4A;
  display: -webkit-box;
  -webkit-box-orient:vertical;
  text-overflow: ellipsis;
  overflow:hidden; /* 通过以上四行实现收缩功能 */
}
.ellipsis{
  -webkit-line-clamp:6; /* 最多显示3行 */
  opacity: 0.75; /* 透明度75% */
  /* text-align:center; */
}
.unellipsis{
  -webkit-line-clamp:0; /* 全部显示 */
  opacity: 1; /* 不透明 */
}
/* top-ellipsis */
.bg-white-ellipsis-shadow{
    position: absolute;
    bottom: 80rpx;
    width: 100%;
    height: 52rpx;
    background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
}
.bg-white-ellipsis{
    text-align: center;
    font-size:12px;
    font-weight:400;
    color:rgba(0,120,226,1);
    line-height:24px;
    background:linear-gradient(180deg,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
}
.des-null{
    text-align: center;
}
</style>
