<template>
    <div>
        <navBar :importData="titleData"></navBar>
        <view class="i-index-demo" :style="{'margin-top':titleHeight}">
            <!-- <view>
                <van-search
                  v-model="searchValue"
                  placeholder="请输入搜索关键词"
                  @change="onSearch"
                />
            </view> -->
            <view class="cell-wrap">
                <van-cell custom-class="i-cell-p" title-class="i-cell-t" :title="items.name" v-for="(items, index) in listArr" :key="index" @click="navUrl(items)" is-link>
                </van-cell>
            </view>
            <view  v-show="!isLoading && listArr.length==0" class="experted-list-null">
                <image style="width: 191px; height: 169px;" mode="aspectFit" src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/tip.png"></image>
                <view class="experted-list-null-text">
                    <text>暂无分配竞赛</text>
                </view>
            </view>
            <view v-show="isLoading" style="text-align:center;">
                <view style="display:inline-block;margin:15px auto;">
                    <van-loading size="15px" />
                    <text>加载中</text>
                </view>
            </view>
        </view>
    </div>
</template>

<script>
import navBar from "@/components/navBar/index"
import api from '@/api/index'
export default {
    components: {
        navBar
    },
    data () {
        return {
            listArr:[],
            searchValue:'',//搜索关键字
            titleData:{
                text:"切换竞赛",
                isBack:false,
            },
            isLoading:true,
            titleHeight:wx.getStorageSync('titleHeight')+'px',
        }
    },
    created () {

    },
    onLoad(){

    },
    onShow(){
        this.titleData.isBack=true;
    },
    mounted() {
        if (this.titleHeight=='px') {
            this.getTitle();
        }
        this.list();
    },
    methods:{
        async list(){
            let data={
                groupId: -1
            }
            api.getCompetitionList(data).then((reset)=>{
                if(reset.code===20000){
                    if(reset.data){
                        this.isLoading=false;
                        this.listArr=reset.data
                    }else{
                        this.isLoading=false;
                        this.listArr=[]
                    }
                }else{
                    this.isLoading=false;
                    wx.showToast({
                        title: reset.message,
                        icon: 'none',
                        duration: 3000
                    })
                }
            })
        },
        // getTitle
        getTitle(){
            var _this=this
            let sysInfos=wx.getSystemInfoSync()
            let titHeight = sysInfos.system.indexOf('iOS')>-1?40:48;
            let statusBarHeight=sysInfos.statusBarHeight
            _this.titleHeight= titHeight+statusBarHeight+'px'
        },
        // 点击竞赛选择赛项
        navUrl(items){
            // let url='/pages/search/main'
            // wx.navigateTo({url})
            wx.setStorage({
                key:"compData",
                data:items
            })
            let url='/pages/switchCompChild/main?id='+items.id+'&name='+items.name
            wx.navigateTo({url})
        },
        onSearch(e){
            this.searchValue=e.mp.detail
            console.log(e)
        }
    }
}
</script>

<style>
.cell-wrap{
    padding-left: 15px;
    padding-right: 15px;
}
.i-cell-p.i-cell{
    font-size: 14px;
    line-height: 28px;
    border-bottom: 1px solid #F2F2F2;
    box-sizing: content-box;
}
.i-cell-text{
    background-color: #E1E8F4;
}
.experted-list-null{
    text-align: center;
    padding-top: 100rpx;
}
</style>
