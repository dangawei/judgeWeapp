<template>
    <div>
        <navBar :importData="titleData"></navBar>
        <view class="i-index-demo" :style="{'margin-top':titleHeight}">
            <view class="top-wrap">
                <view>
                    <van-search
                      v-model="searchValue"
                      placeholder="请输入作品ID"
                      background="linear-gradient(90deg,rgba(0,120,226,1) 0%,rgba(43,210,179,1) 100%)"
                      @focus="onFocus"
                    />
                </view>
                <view class="experted-content-load-wrap">
                    <van-row>
                        <van-col span="5">已评审:{{total}}</van-col>
                        <van-col span="7" offset="2">
                            <image  src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/download.png" style="width:20rpx;height:20rpx;margin-right:8rpx;"></image>
                            <text @click="downloadTable">下载评分表</text>
                        </van-col>
                        <van-col span="10" style="text-align:right;">
                            <image src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/load.png" style="width:20rpx;height:20rpx;margin-right:8rpx;"></image>
                            <text @click="loadTable">上传签字评分图</text>
                        </van-col>
                    </van-row>
                </view>
            </view>

            <view>
                <view v-if="listData.length>0" class="experted-centent-wrap">
                    <view class="experted-list-wrap" v-for="(items, index) in listData" :key="index" @click="enterDetail(items)">
                        <van-card custom-class="van-card-wrap">
                            <view slot="thumb" class="thumb-img-wrap">
                                <!-- <image mode="widthFix" :src="items.thunbnail?items.thunbnail:'https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/cover.jpg'"></image> -->
                                <image mode="aspectFill" :src="items.thunbnail?items.thunbnail:'https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/cover.jpg'"></image>
                            </view>
                            <view slot="title" class="experted-list-title">
                                <view class="experted-list-title-left" v-if="competitorShow">
                                    <view class="experted-list-title-left-num">编号:{{items.id}}</view>
                                    <view class="experted-list-title-left-bottom">匿名评审</view>
                                </view>
                                <view class="experted-list-title-left" v-else>
                                    <view class="experted-list-title-left-num text-overflow-style-expert">{{items.title?items.title:"未标题"}}</view>
                                    <view class="experted-list-title-left-bottom text-overflow-style">{{items.groupName}} · {{items.school}}</view>
                                </view>
                                <view class="experted-list-title-right">
                                    <image class="experted-list-title-right-img" style="width: 144rpx; height: 62rpx;" mode="aspectFit" src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/Group@2x.png"></image>
                                    <view class="experted-list-title-right-score">{{items.score}}</view>
                                </view>
                            </view>
                            <view slot="desc">
                                <view class="experted-list-desc">
                                    <text>{{items.description?items.description:'暂无简介'}}</text>
                                </view>
                            </view>
                        </van-card>
                    </view>
                </view>
                <view v-show="!isLoading && listData.length==0" class="experted-list-null">
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
        </view>
        <div class="">
            <tasb :selected="0"></tasb>
        </div>
    </div>
</template>

<script>
import navBar from "@/components/navBar/index"
import api from '@/api/index'
import oss from '@/utils/upload'
import tasb from "@/components/tasb.vue"
export default {
    components: {
        navBar,
        tasb
    },
    data () {
        return {
            // title数据
            titleData:{
                text:wx.getStorageSync("competitionData").name,
                isBack:false
            },
            total:0,//已评审总条数
            pageNum:1,//分页
            titleHeight:wx.getStorageSync('titleHeight')+'px',
            searchValue:'',//搜索关键字
            imageURL:'https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/tip.png',
            isLoading:true,
            listData:[],
            competitorShow:true,//是否匿名评审
            scoreInt:10,//评分整数
            scoreFloat:67,//评分小数
        }
    },
    created () {

    },
    onLoad(e){

    },
    onShow(){
        wx.hideTabBar()
        var _this=this;
        this.listData=[];
        this.isLoading=true;
        this.titleData.text=wx.getStorageSync("competitionData").name
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
                reviewStatus:1,
                rowId:wx.getStorageSync('competitionData').rowId,
                pattern:wx.getStorageSync('pattern'),
            }
            let lists = await api.getWorksList(data)
            if(lists.code===20000){
                if (lists.data) {
                    this.total=lists.data.total
                    for (var i = 0; i < lists.data.pageData.length; i++) {
                        this.listData.push(lists.data.pageData[i])
                    }
                }else{
                    this.total=0
                    this.listData=[]
                }
                this.isLoading=false;
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
        // 上传评分表
        loadTable(){
            wx.chooseImage({
                count: 1, //最多可以选择的图片总数
                sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function(res) {
                    wx.showLoading({
                        title: '上传中',
                        mask: true
                    })
                    oss.upLoad(res.tempFiles[0].path,function (reset) {
                        var data={
        					competitionId:wx.getStorageSync("competitionData").id,
        					rowId:wx.getStorageSync("competitionData").rowId,
        					url:reset,
        				}
                        api.loadTable(data).then(result=>{
                            if(result.code===20000){
                                wx.hideToast()
                                wx.showToast({
                                    title: '上传成功',
                                    icon: 'success',
                                    mask: true,
                                    duration: 2000
                                })
                            }else{
                                wx.showToast({
                                    title: result.message,
                                    icon: 'none',
                                    duration: 3000
                                })
                            }
                        })
                    }, function (result) {
                        wx.showToast({
                            title: '上传失败',
                            icon: 'none',
                            mask: true,
                            duration: 2000
                        })
                        wx.hideLoading()
                    })
                },
                fail:function(res){
                    console.log(res);
                }
            })
        },
        // 下载评分表
        downloadTable(){
            wx.showToast({
                title: "小程序暂无下载功能,请去电脑端摩课云竞赛评审平台登录下载!",
                icon: 'none',
                duration: 7000
            })
        },
        onFocus(e){
            let url='/pages/search/main'
            wx.navigateTo({url})
        },
        //进入详情
        enterDetail(e){
            if (e.reviewType==1) {
                let url='/pages/networkDetail/main?id='+e.id
                wx.navigateTo({url})
            }else{
                let url='/pages/rateDetail/main?id='+e.id
                wx.navigateTo({url})
            }
        }
    }
}
</script>

<style scoped>
.i-index-demo{
    /* background: #F7F8FA; */
    /* opacity: 0.3; */
    position: relative;
    padding-bottom: 120rpx;
}
.top-wrap{
    background:linear-gradient(90deg,rgba(0,120,226,1) 0%,rgba(43,210,179,1) 100%);
    overflow: hidden;
    /* position: fixed; */
    width: 750rpx;
    /* left: 0;
    z-index: 998; */
}
.experted-centent-wrap{
    padding-top:6px;
}
.experted-content-load-wrap{
    padding:10px 16px;
    color: #fff;
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
.text-overflow-style-expert{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}
/*
.experted-list-null{
    padding: 20rpx 48rpx;
    width:480rpx;
    position: absolute;
    top: 200rpx;
    left:50%;
    margin-left: -288rpx;
    text-align: center;
    color:rgba(155,155,155,1);
}*/
/* 评审列表样式 */
.experted-list-wrap{
    padding:0px 30rpx;
}
/* .van-card-wrap .van-card__thumb{
    height: 150rpx;
} */
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
    float: left;
    max-width: 325rpx;
}
.experted-list-title-left-num{
    font-size: 38rpx;
    font-weight: 600;
    line-height: 60rpx;
}
.experted-list-title-left-bottom{
    font-size: 26rpx;
    line-height: 45rpx;
    color:rgba(155,155,155,1);
}
.experted-list-title-right{
    float: right;
    position: relative;
}
.experted-list-title-right-img{
    width: 144rpx;
    height:62rpx;
}
.experted-list-title-right-score{
    position:absolute;
    right:0px;
    top:0px;
    font-size:32rpx;
    line-height:62rpx;
    color:#fff;
    font-weight:600;
    width:114rpx;
    text-align:center;
}
/* 描述 */
.experted-list-desc{
    color:#868686;
    /*overflow: hidden;/*超出部分隐藏*/
    /*text-overflow:ellipsis;/* 超出部分显示省略号 */
    /*white-space: nowrap;/*规定段落中的文本不进行换行 */
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-size: 26rpx;
    line-height: 45rpx;
}
</style>
