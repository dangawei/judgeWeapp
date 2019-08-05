<template>
    <div class="rate-wrap">
        <div class="rate-search-wrap">
            <view class="rate-tag rate-tag-num">
                <img src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/tag-num.png" alt="">
            </view>
            <view class="rate-input-wrap">
                <input v-model="searchVal" placeholder="请输入作品编号" maxlength="20" class="rate-input" @input="rateInputChange"></input>
            </view>
            <view class="rate-button-wrap">
                <van-button round size="large" :disabled="isDisabled" custom-class="rate-btn" @click="nextClick">下一步</van-button>
            </view>
        </div>
        <div class="rate-centent-wrap">
            <view class="rate-tag">
                <!-- <van-tag mark custom-class="rate-tag">评审流程</van-tag> -->
                <img src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/tag.png" alt="">
            </view>
            <view class="rate-tag-title">欢迎进入{{competitionName}}评审， 接下来您可以参考以下流程进行评审工作</view>
            <view class="rate-text-wrap"><view class="text-num-tag text-inline">1</view><view class="text-inline">输入评审作品编号，点击下一步</view></view>
            <view class="rate-text-wrap"><view class="text-num-tag text-inline">2</view><view class="text-inline">根据系统匹配的作品进行拍照提交，并进行评审打分</view></view>
            <view class="rate-text-wrap"><view class="text-num-tag text-inline">3</view><view class="text-inline">完成后系统将循环第一步骤</view></view>
            <view class="rate-text-wrap"><view class="text-num-tag text-inline">4</view><view class="text-inline">评审页面可以进行查看已评审作品，当完成实际评审作品数量，并确认评分无误后，下载评分表进行签字确认并上传</view></view>
        </div>

    </div>
</template>
<script>
// Use Vuex

export default {
    data(){
        return {
            searchVal:'',
            isDisabled:true,//是否禁用
            competitionName:wx.getStorageSync("competitionData").name
        }
    },
    computed: {

    },
    created(){

    },
    mounted(){

    },
    methods: {
        onSearch(){

        },
        onCancel(){

        },
        rateInputChange(e){
            this.searchVal=e.mp.detail.value;
            if (this.searchVal) {
                this.isDisabled=false
            }else{
                this.isDisabled=true;
            }
        },
        // 下一步
        nextClick(){
            if(!this.isDisabled){
                let url='/pages/rateDetail/main?id='+this.searchVal
                wx.navigateTo({url})
            }
        }
    },
    onShow(){

    }
}
</script>

<style>
    .rate-wrap{
        padding:20rpx 30rpx;
    }
    .rate-centent-wrap{
        background-color:#F6FAFF;
        padding:20rpx 20rpx;
        font-size: 36rpx;
        letter-spacing:5rpx;
        line-height: 60rpx;
        color: #7C7C7C;
    }

    .rate-tag-title{
        color: #4A4A4A;
    }
    .rate-tag{
        margin-left:-30rpx;
        /* background: -webkit-linear-gradient(left, #017AE0 , #2AD0B3); */
        width: 60px;
        height: 20px;
        margin-bottom: 20rpx;
    }
    .rate-tag img{
        width: 100%;
        height: 100%;
    }
    .rate-text-wrap{
        display: flex;
        margin-top:10px;
    }
    .text-inline{
        display: inline-block;
    }
    .text-num-tag{
        padding:0rpx 3.2px 0rpx 5px;
        font-size: 13px;
        line-height: 20px;
        width: 12px;
        height: 20px;
        border-radius: 20px;
        background-color: #0078E2;
        color:#fff;
        text-align: center;
        margin-right: 12rpx;
        margin-top: 11rpx;
    }
    /* 搜索 */
    .rate-search-wrap{
        padding:20rpx 20rpx 50rpx;
    }
    .rate-tag-num{
        position: relative;
        margin-bottom: -20rpx;
        z-index: 999;
    }
    .rate-input-wrap{
        border-radius:60rpx;
    }
    .rate-input-wrap .rate-input{
        background-color: #F6FAFF;
        border-radius:60rpx;
        text-align:center;
        padding:10px;
        font-size: 18px;
    }
    /* button */
    .rate-button-wrap{
        margin-top: 30rpx;
    }
    .rate-btn.van-button{
        background: -webkit-linear-gradient(left,rgba(0,176,243,1),rgba(0,120,226,1));
        color:#fff;
    }
</style>
