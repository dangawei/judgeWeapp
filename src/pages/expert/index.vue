<template>
    <div>
        <navBar :importData="titleData"></navBar>
        <view class="btn-wrap" :style="{'margin-top':titleHeight}">
            <van-button round type="info" :custom-class="[btnShowLeft?'btn-show':'btn-hidden btn-hidden-left']" @click="btnLeftClick"><text>会评模式</text></van-button>
            <van-button round type="info" :custom-class="[btnShowLeft?'btn-hidden btn-hidden-right':'btn-show']" @click="btnRightClick"><text>网评模式</text></van-button>
        </view>
        <view class="i-index-demo">
            <view v-if="!btnShowLeft">
                <view v-if="listData.length>0" class="expert-centent-wrap">
                    <view class="experted-list-wrap" v-for="(items, index) in listData" :key="index" @click="enterDetail(items)">
                        <van-card custom-class="van-card-wrap">
                            <view slot="thumb" class="thumb-img-wrap">
                                <!-- <image mode="widthFix" :src="items.thunbnail?items.thunbnail:'https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/cover.jpg'"></image> -->
                                <image mode="aspectFill" :src="items.thunbnail?items.thunbnail:'https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/cover.jpg'"></image>
                            </view>
                            <view slot="title" class="experted-list-title">
                                <view class="experted-list-title-left" v-if="competitorShow">
                                    <view class="experted-list-title-left-num">编号:{{items.id}} 题目:匿名</view>
                                    <view class="experted-list-title-left-bottom">评审方式 : 匿名评审</view>
                                </view>
                                <view class="experted-list-title-left" v-else>
                                    <view class="experted-list-title-left-num text-overflow-style-float" v-show="!items.title" style="font-weight:500;">{{items.id}}</view>
                                    <view class="experted-list-title-left-num text-overflow-style-expert">{{items.title?items.title:"未标题"}}</view>
                                    <view class="experted-list-title-left-bottom text-overflow-style">{{items.groupName}} · {{items.school}}</view>
                                </view>
                            </view>
                            <view slot="desc" v-show="!items.title">
                                <view class="experted-list-desc">
                                    {{items.description?items.description:'暂无简介'}}
                                </view>
                            </view>
                        </van-card>
                    </view>
                </view>
                <view  v-show="!isLoading && listData.length==0" class="experted-list-null">
                    <image style="width: 191px; height: 169px;" mode="aspectFit" src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/tip.png"></image>
                    <view class="experted-list-null-text">
                        <text>暂无评审数据</text>
                    </view>
                </view>
                <view v-show="isLoading" style="text-align:center;">
                    <view style="display:inline-block;margin:15px auto;">
                        <van-loading size="15px" />
                        <text>加载中</text>
                    </view>
                </view>
            </view>
            <view v-else>
                <rateComponent></rateComponent>
            </view>
            <!-- <view>
                <van-button disabled type="primary" @click="daChange">禁用状态</van-button>
            </view> -->
        </view>
        <div class="">
            <tasb :selected="1"></tasb>
        </div>
    </div>
</template>

<script>
import rateComponent from "@/components/rate.vue"
import navBar from "@/components/navBar/index"
import tasb from "@/components/tasb.vue"
import api from '@/api/index'
export default {
    components: {
        rateComponent,
        navBar,
        tasb
    },

    data () {
        return {
            pageNum:1,
            // title数据
            titleData:{
                text:"评审",
                isBack:false
            },
            total:0,//数据总数目
            titleHeight:wx.getStorageSync('titleHeight')+'px',
            // 显示会评还是网评
            btnShowLeft:true,
            universitys:[],
            searchValue:'',//搜索关键字
            imageURL:'https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/tip.png',
            isLoading:true,
            listData:[],
            competitorShow:true,//是否匿名评审
        }
    },
    created () {

    },
    onLoad(){

    },
    onShow(){
        wx.hideTabBar()
        var _this=this;
        this.listData=[];
        this.isLoading=true;
        if (wx.getStorageSync('patternData').reviewConceal) {
            let reviewConceal=wx.getStorageSync('patternData').reviewConceal
            if(reviewConceal.indexOf(0)>=0){
                this.competitorShow=true
            }else{
                this.competitorShow=false
            }
        }else{
            this.competitorShow=false
        }
        this.pageNum=1
        _this.list()
    },
    onReachBottom(){
        if (this.listData.length<this.total) {
            this.isLoading=true;
            this.pageNum++
            this.list()
        }else{
            this.isLoading=false;
        }
    },
    mounted() {
        if (this.titleHeight=='px') {
            this.getTitle();
        }
    },
    methods:{
        async list(e){
            let data={
                pageNum: this.pageNum,
                pageSize: 30,
                reviewStatus:0,//0为未评审 1是已评审
                rowId:wx.getStorageSync('competitionData').rowId,
                pattern:wx.getStorageSync('pattern')
            }
            let lists = await api.getWorksList(data)
            if(lists.code===20000){
                if (lists.data) {
                    this.total=lists.data.total
                    for (var i = 0; i < lists.data.pageData.length; i++) {
                        this.listData.push(lists.data.pageData[i])
                    }
                    this.isLoading=false;
                }else{
                    this.listData=[];
                    this.isLoading=false;
                }

            }else{
                this.isLoading=false;
                wx.showToast({
                    title: lists.message,
                    icon: 'none',
                    duration: 3000
                })
            }
        },
        // getTitle
        getTitle(){
            var _this=this
            let sysInfos=wx.getSystemInfoSync()
            let titHeight = sysInfos.system.indexOf('iOS')>-1?40:48;
            let statusBarHeight=sysInfos.statusBarHeight
            _this.titleHeight= titHeight+statusBarHeight+'px'
        },
        // 显示会评还是网评
        btnLeftClick(){
            this.btnShowLeft=true;
        },
        btnRightClick(){
            this.btnShowLeft=false;
        },
        onFocus(e){
            let url='/pages/search/main'
            wx.navigateTo({url})
        },
        enterDetail(e){
            let url='/pages/networkDetail/main?id='+e.id
            wx.navigateTo({url})
        }
    }
}
</script>

<style scoped>
/* button */
.btn-wrap{
    text-align: center;
    padding-top:30rpx;
    padding-bottom:30rpx;
    /* position: fixed; */
    width: 750rpx;
    /* left: 0;
    z-index: 998; */
    background-color: #fff;
}
.btn-left-show button{
    margin-left:-26px;
}


.i-index-demo{
    /* position: absolute; */
    width:750rpx;
    /* top: 138rpx;
    left: 0; */
    padding-bottom: 120rpx;
}
.experted-content-load-wrap{
    padding:10px 16px;
    color: #fff;
    background-color: #2AD1B3;
}
.experted-list-null{
    padding: 20rpx 48rpx;
    text-align: center;
    color:rgba(155,155,155,1);
    margin-top:100rpx;
}
.experted-list-null-text{
    padding-top: 48rpx;
}
/* 评审列表样式 */
/* .expert-centent-wrap{
    position: absolute;
    top: 200rpx;
    left: 0;
} */
.experted-list-wrap{
    padding:0px 30rpx;
}
.thumb-img-wrap{
    width: 200rpx;
    height: 150rpx;
    margin-right: 20rpx;
}
.thumb-img-wrap image{
    width: 100%;
    height:inherit;
    display: inline-block;
    overflow: hidden;
}
.experted-list-title{
    overflow: hidden;
}
.experted-list-title-left{
    position: relative;
    float: left;
    max-width: 480rpx;
    width: 100%;
}
.experted-list-title-left-num{
    font-size: 36rpx;
    font-weight: 600;
    line-height: 55rpx;
}
.text-overflow-style-float{
    float:right;
    color: #0078E2;
}
.text-overflow-style-expert{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
.experted-list-title-left-bottom{
    font-size: 28rpx;
    line-height: 45rpx;
    color:rgba(155,155,155,1);
}
/* 描述 */
.experted-list-desc{
    color:#868686;
    /*overflow: hidden;/*超出部分隐藏*/
    /*text-overflow:ellipsis;/* 超出部分显示省略号 */
    /*white-space: nowrap;/*规定段落中的文本不进行换行 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 28rpx;
    line-height: 45rpx;
}
</style>
