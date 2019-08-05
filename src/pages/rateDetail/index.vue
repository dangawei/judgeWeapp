<template>
    <div class="detail-wrap" :style="{'min-height':pageHeight,'background':'#F4F9FB'}">
        <navBar :importData="titleData"></navBar>
        <div :style="{'margin-top':titleHeight}">
            <workShow :importData="listData" v-if="isListData"></workShow>
        </div>
        <div class="centent-wrap">
            <view class='centent-detail' v-if="pattern==0">
                <view v-for="(items,index) in attachArr" :key="index">
                    <view class="centent-detail-title-wrap centent-detail-common">
                        <text class="centent-detail-title">{{items.attachName}}</text>
                    </view>
                    <view class="centent-detail-common" v-for="(it,num) in items.fileList" :key="num">
                        <view class="from-name-left" v-if="it.type!=4 && it.type!=5">
                            <text>{{it.name}}</text>
                        </view>
                        <view class="from-name-left-common" v-show="it.type==4" @click="watchSee4">
                            <text>{{it.name}}</text>
                        </view>
                        <view class="from-name-leit.type!=5ft-common" v-show="it.type==5" @click="watchSee5">
                            <text>{{it.name}}</text>
                        </view>
                        <!-- <text>{{it.name}}</text> -->
                        <view style="float:right;" v-show="it.type==1" @click="handleClick(it)">
                            <button class="centent-detail-button">查看</button>
                        </view>
                        <view v-if="it.type==2">
                            <view v-if="vId != 'myVideo'+num" @click="palyVideo(num)" class="video-wrap">
                                <image src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/Shape.png" class="video-cell-img"></image>
                                <!-- <view class="video-cell-text">点击播放</view> -->
                            </view>
                            <video :id="'myVideo'+num" class="video-cell" :src="it.url" controls v-show="vId=='myVideo'+num" @fullscreenchange="bindfullscreenchange" @play="videoPlay"></video>
                        </view>
                        <view v-if="it.type==3">
                            <view class="centent-detail-common" v-if="it.url">
                                <uploadComponents :importData="it.url" :importAdd="addShow"></uploadComponents>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="centent-detail-common">
                    <uploadComponents :importData="pictureList" @exportData="pictureChange" v-if="pictureShow"></uploadComponents>
                </view>
            </view>
            <view class='centent-detail' v-if="pattern==1">
                <view v-for="(items,index) in attachArr" :key="index">
                    <!-- <view class="centent-detail-title-wrap centent-detail-common fromItem"  @click="clickChange(items)"> -->
                    <view class="centent-detail-title-wrap centent-detail-common fromItem centent-detail-title-img-wrap"  @touchstart='touchStart' @touchend="touchEnd(items,index,$event)">
                        <view class="from-left-img" @click="clickLeft(items)">
                            <img src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/Chevron2.png" alt="">
                        </view>
                        <view class="fromCenter from-left">
                            <text class="centent-detail-title">{{items.attachName}}</text>
                        </view>
                        <view class="fromRight from-right from-right-img" @click="clickRight(items)">
                            <img src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/Chevron@2x.png" alt="">
                        </view>
                    </view>
                    <view class="centent-detail-common" v-for="(it,num) in items.fileList" :key="num">
                        <view :class="[it.type==1?'from-name-left':'from-name-left-common']">
                            <text>{{it.name}}</text>
                        </view>
                        <!-- <text>{{it.name}}</text> -->
                        <view style="float:right;" v-show="it.type==1" @click="handleClick(it)">
                            <button class="centent-detail-button">查看</button>
                        </view>
                        <view v-if="it.type==2">
                            <view v-if="vId != 'myVideo'+num" @click="palyVideo(num)" class="video-wrap">
                                <image src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/Shape.png" class="video-cell-img"></image>
                                <!-- <view class="video-cell-text">点击播放</view> -->
                            </view>
                            <video :id="'myVideo'+num" class="video-cell" :src="it.url" controls v-show="vId=='myVideo'+num" @fullscreenchange="bindfullscreenchange" @play="videoPlay"></video>

                        </view>
                        <view v-if="it.type==3">
                            <view class="centent-detail-common">
                                <uploadComponents :importData="it.url" :importAdd="addShow"></uploadComponents>
                            </view>
                        </view>
                    </view>
                    <view class="centent-detail-common">
                        <uploadComponents :importData="pictureList" @exportData="pictureChange" v-if="pictureShow"></uploadComponents>
                    </view>
                </view>
            </view>
        </div>
        <div class="footer-wrap">
            <view class='footer-centent-wrap'>
                <van-tabbar>
                    <van-tabbar-item icon="wap-nav" :active="false" @click="toggleRight">列表</van-tabbar-item>
                    <button class="footer-centent-right" @click="toggleBottom">{{expertText}}</button>
                </van-tabbar>
            </view>
        </div>
        <div class="drawer-wrap">
            <i-drawer mode="right" :visible="drawerShow" @close="onDrawerClose">
                <view class="drawer-container" :style="{'height':drawerHeight,'padding-top':titleHeight}" v-if="drawerShow">
                    <view style="margin-top:10px;">已评审作品</view>
                    <view class="drawer-container-wrap" v-for="(items,index) in expertedData" :key="index" @click="enterDetail(items)">
                        <view class="drawer-container-title" v-if="competitorShow && items.title">{{items.title}}</view>
                        <view class="drawer-container-title" v-else>{{items.id}}</view>
                        <view class="drawer-container-item">
                            <view class="drawer-container-item-left">
                                <text>得分:</text>
                                <text class="drawer-container-item-blue">({{items.score}})</text>
                            </view>
                            <view class="drawer-container-item-right">
                                <text>已评:</text>
                                <text class="drawer-container-item-red">{{items.num}}/{{items.allNum}}</text>
                            </view>
                        </view>
                    </view>
                </view>
            </i-drawer>
        </div>
        <!-- 附件选择组件 -->
        <div class="drawer-bottom-wrap">
            <van-popup
              :show="attachmentSwitch"
              z-index="998"
              position="bottom"
              :overlay="true"
              :safe-area-inset-top="true"
              @close="attachmentClose"
            >
                <attachSwitch :importData="attachList" @exportData="exportAttachData" v-if="attachmentSwitch"></attachSwitch>
                <!-- <view>我是attach</view> -->
            </van-popup>
        </div>
        <!-- 评分组件 -->
        <div class="drawer-bottom-wrap">
            <van-popup
              :show="drawerBottomShow"
              z-index="999"
              position="bottom"
              :overlay="true"
              custom-style="padding-bottom:50px"
              :safe-area-inset-top="true"
              @close="onClose"
            >
                <popupScore :importData="scoreData" :importPic="pictureList" @exportData="exportPopupData"  v-if="drawerBottomShow"></popupScore>
            </van-popup>
        </div>
    </div>
</template>

<script>
import popupScore from "../../components/popupScore.vue"
import attachSwitch from "../../components/attachmentSwitch.vue"
import workShow from "../common/workShow.vue"
import uploadComponents from "../common/uploadComponent.vue"
import navBar from "@/components/navBar/index"
import api from '@/api/index'
import { getSysInfo,getTouchData } from '@/utils/index'
export default {
    components: {
        popupScore,
        attachSwitch,
        workShow,
        uploadComponents,
        navBar
    },
    data () {
        return {
            addShow:true,
            pattern:1,//评审规则
            pageHeight:'',//页面高度
            searchValue:'',//搜索关键字
            ellipsis:true,
            drawerShow:false,
            // 评分数据
            drawerBottomShow:false,//评分组件显示
            num1:100,
            remakeMes:'',
            titleData:{
                text:"作品详情",
                isBack:true
            },
            // 侧边栏列表高度
            drawerHeight:'',
            // 标题栏和状态栏的高度
            titleHeight:wx.getStorageSync('titleHeight')+'px',
            pattern:1,//评审方式
            workId:1,//作品编号
            attachList:[],//附件选择数据
            attachArr:[],//附件数据
            attachmentSwitch:false,//附件
            listData:{},
            isListData:false,
            pictureList:[],//图片列表
            pictureShow:false,

            scoreData:{},//评分组件传值数据
            expertText:"评分",//评分显示文字,
            expertedData:[],//列表数据
            touch:{},//记录滑动位置
            attachIndex:0,//记录附件序号
            fullBool:false,
            vId:''
        }
    },
    created () {
        let sysInfos=wx.getSystemInfoSync()
        // this.drawerHeight=sysInfos.windowHeight-152+"px"
        var _this=this;
        wx.getStorage({
            key:'titleHeight',
            success:function(res){
                _this.pageHeight=sysInfos.windowHeight-50-res.data+'px'
                _this.drawerHeight=sysInfos.windowHeight+'px'
            }
        })
    },
    onLoad(e){
        this.attachArr=[]
        this.workId=e.id
        this.pattern=wx.getStorageSync("pattern")
        this.pictureList=[]
        this.vId=""
        this.drawerShow=false
        this.pictureShow=false
        this.attachIndex=0
        this.list()
    },
    onShow(){
        this.fullBool=false
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
    },
    mounted(){
        if(this.titleHeight=='px'){
            this.getTitle();
        }
    },
    methods:{
        // getTitle
        getTitle(){
            var _this=this
            let sysInfos=wx.getSystemInfoSync()
            let titHeight = sysInfos.system.indexOf('iOS')>-1?40:48;
            let statusBarHeight=sysInfos.statusBarHeight
            _this.titleHeight= titHeight+statusBarHeight+'px'
        },
        //获取作品详情
        async list(e){
            let data={
                id:this.workId,
                rowId:wx.getStorageSync("competitionData").rowId
            }
            let lists = await api.getWorksDetail(data)
            if(lists.code===20000){
                this.listData=lists.data
                this.isListData=true
                this.attachList=lists.data.infoObj.attachList
                if (this.pattern==0) {
                    this.attachArr=lists.data.infoObj.attachList
                }else {
                    this.attachArr.push(this.attachList[0])
                    this.attachIndex=0
                }
                this.getScore();
            }else{
                wx.showToast({
                    title: lists.message,
                    icon: 'none',
                    duration: 4200
                })
            }
        },
        toggleRight(){
            this.drawerShow=true;
            this.getList();
        },
        // 获取列表
        async getList(){
            let data={
                pageNum: 1,
                pageSize: 999,
                reviewStatus:1,
                rowId:wx.getStorageSync('competitionData').rowId,
                pattern:this.pattern,
            }
            let lists = await api.getWorksList(data)
            if(lists.code===20000){
                // this.total=lists.data.total
                this.expertedData=lists.data.pageData
            }else{
                wx.showToast({
                    title: reset.message,
                    icon: 'none',
                    duration: 4200
                })
            }
        },
        //获取是否已经评审
        getScore(){
            let data={
                poolId:this.workId
            }
            if(this.pattern==1){
                data.attachId=this.attachArr[0].attachId
            }
            api.getScores(data).then((reset)=>{
                if(reset.code===20000){
                    if(reset.data){
                        this.expertText="编辑 ("+reset.data.total+"分)"
                        if (this.pattern==1) {
                            if (reset.data.pictureList && reset.data.pictureList.length>0) {
                                for (var i = 0; i < reset.data.pictureList.length; i++) {
                                    if (reset.data.pictureList[i].name==data.attachId) {
                                        this.pictureList=reset.data.pictureList[i].pictureUrl
                                    }
                                }
                            }else{
                                this.pictureList=[]
                            }
                        }else{
                            if (reset.data.pictureList && reset.data.pictureList.length>0) {
                                this.pictureList=reset.data.pictureList[0].pictureUrl
                            }else{
                                this.pictureList=[]
                            }
                        }
                        this.pictureShow=true;
                    }else{
                        this.pictureShow=true;
                        this.expertText="评分"
                    }
                }else{
                    wx.showToast({
                        title: reset.message,
                        icon: 'none',
                        duration: 4200
                    })
                }
            })
        },
        // 视屏全屏
        palyVideo(e){
            var _this=this;
            this.vId="myVideo"+e
            this.videoCon=wx.createVideoContext(this.vId)
            setTimeout(function(){
                _this.fullBool=true;
                _this.videoCon.play();
            },500)
            // this.videoCon.requestFullScreen({direction:60})
        },
        // 视屏播放
        videoPlay(e){
            if(this.fullBool){
                this.videoCon.requestFullScreen()
            }

        },
        //退出全屏
        bindfullscreenchange(e){
            let fullScreen = e.target.fullScreen //值true为进入全屏，false为退出全屏
            if (!fullScreen ){ //退出全屏
                wx.createVideoContext(this.vId).stop()
                this.vId=''
                this.fullBool=false
            }else{ //进入全屏
                this.fullBool=false
            }
        },
        // 接收上传图片
        pictureChange(e){
            // for (var i = 0; i < e.data.length; i++) {
            //     this.pictureList.push(e.data[i])
            // }
            this.pictureList=e.data
        },
        // 评分组件是否显示
        toggleBottom(){
            // Object.keys(
            if(this.pictureList.length>0){
                if (this.pattern==0) {
                    this.scoreData.id=this.workId
                }else{
                    this.scoreData=this.attachArr[0]
                    this.scoreData.id=this.workId
                }
                this.drawerBottomShow=true;
            }else{
                wx.showToast({
                    title: "请先拍照上传图片,再评分!",
                    icon: 'none',
                    duration: 4200
                })
            }
        },
        onClose(){
            this.drawerBottomShow=false;
        },
        onDrawerClose(){
            this.drawerShow=false;
        },
        handleClick(e){
            let str=e.url
            if (e.url.indexOf("http://")>-1) {
                str=e.url.replace(/http:/g,"https:")
            }
            wx.downloadFile({
                url: str,      //要预览的PDF的地址
                success: function (res) {
                    if (res.statusCode === 200) { //成功
                        var Path = res.tempFilePath //返回的文件临时地址，用于后面打开本地预览所用
                        wx.openDocument({
                            filePath: Path, //要打开的文件路径
                            success: function (res) {
                                console.log('打开PDF成功');
                            }
                        })
                    }
                },
                fail: function (res) {
                    console.log(res); //失败
                    wx.showToast({
                        title: "该文件暂无法在小程序中查看,如有需要,请在电脑端查看!",
                        icon: 'none',
                        duration: 7000
                    })
                }
            })
        },
        // 点击外链
        watchSee4(){
            wx.showToast({
                title: "暂不支持查看外链作品,如有需要请去电脑端查看!",
                icon: 'none',
                duration: 7000
            })
        },
        // 点击压缩文件
        watchSee5(){
            wx.showToast({
                title: "暂不支持下载压缩文件,如有需要请去电脑端下载!",
                icon: 'none',
                duration: 7000
            })
        },
        // 评分
        handleChange(e){
            // let numVal="num"+e;
            // this.num1++;
            this.num1=e.target.value
        },
        // 评分取消
        popupClose(){
            this.drawerBottomShow=false
        },
        // 评分确定
        popupSure(){
            this.drawerBottomShow=false
        },
        exportPopupData(e){
            if (e.data) {
                this.getScore();
            }
            this.drawerBottomShow=e.show;
        },

        // 筛选附件
        clickChange(){
            this.attachmentSwitch=!this.attachmentSwitch
        },
        exportAttachData(e){
            if (e.data) {
                this.attachArr=[]
                this.attachArr.push(e.data)
                this.pictureList=[]
                this.pictureShow=false;
                this.getScore();
            }
            this.attachmentSwitch=!this.attachmentSwitch
        },
        attachmentClose(){
            this.attachmentSwitch=!this.attachmentSwitch
        },
        // 点击列表
        enterDetail(e){
            if (e.reviewType==1) {
                let url='/pages/networkDetail/main?id='+e.id
                wx.redirectTo({url})
            }else{
                let url='/pages/rateDetail/main?id='+e.id
                wx.redirectTo({url})
            }
        },
        // 判断滑动事件
        touchStart(event){
            this.touch.x=event.mp.changedTouches[0].clientX
            this.touch.y=event.mp.changedTouches[0].clientY
        },
        touchEnd(items,index,event){
            let x = event.mp.changedTouches[0].clientX
            let y = event.mp.changedTouches[0].clientY
            // console.log(items)
            // console.log(index)
            // console.log(event)
            let touchType=getTouchData(x,y,this.touch.x,this.touch.y)
            if (touchType=="right") {
                if (this.attachIndex>0) {
                    this.attachIndex--
                    this.attachArr=[]
                    this.attachArr.push(this.attachList[this.attachIndex])
                    this.pictureList=[]
                    this.pictureShow=false;
                    this.getScore();
                }
            }else if(touchType=="left"){
                if (this.attachIndex<this.attachList.length-1) {
                    this.attachIndex++
                    this.attachArr=[]
                    this.attachArr.push(this.attachList[this.attachIndex])
                    this.pictureList=[]
                    this.pictureShow=false;
                    this.getScore();
                }
            }
        },
        // 点击左右切换附件事件
        clickRight(items){
            if (this.attachIndex<this.attachList.length-1) {
                this.attachIndex++
                this.attachArr=[]
                this.attachArr.push(this.attachList[this.attachIndex])
                this.pictureList=[]
                this.pictureShow=false;
                this.getScore();
            }
        },
        clickLeft(items){
            if (this.attachIndex>0) {
                this.attachIndex--
                this.attachArr=[]
                this.attachArr.push(this.attachList[this.attachIndex])
                this.pictureList=[]
                this.pictureShow=false;
                this.getScore();
            }
        },
    }
}
</script>

<style scoped>
.detail-wrap{
    width: 750rpx;
    color:rgba(74,74,74,1);
    background-color: #F4F9FB;
    padding-bottom: 50px;
}
/* centent */
.centent-wrap{
    /* padding-left: 30rpx; */
}
.centent-detail{
    margin-top:30rpx;
    background-color: #fff;
    padding:0rpx 30rpx 20rpx 30rpx;
}
.centent-detail-common{
    font-size:36rpx;
    line-height:64rpx;
    padding:20rpx 0rpx;
}
.centent-detail-title-wrap{
    font-weight:550;
    border-bottom: 1px solid #F4F4F4;
}
.centent-detail-title-img-wrap{
    display: flex;
    justify-content: center;
}
.centent-detail-button{
    margin-top: 8rpx;
    margin-right: 30rpx;
    width: 122rpx;
    /* background-color: #0080E5; */
    background: -webkit-linear-gradient(left,rgba(0,176,243,1),rgba(0,120,226,1));
    font-size: 16px;
    color: #fff;
    padding:0rpx 20rpx;
    line-height: 60rpx;
    border-radius: 35rpx;
}
/* 视频样式 */
.video-wrap{
    width: 100%;
    height: 225px;
    background-color: #000;
    /* text-align: center; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* justify-content: center; */
    /* vertical-align: middle; */
}
.video-cell-img{
    width: 36px;
    height: 36px;
}
.video-cell-text{
    width: 100%;
    text-align: center;
}
.video-cell{
    width: 100%;
    height: 225px;
}
/* footer */
.footer-wrap{
    width: 750rpx;
    height: 50px;
    background-color: #fff;
    position: fixed;
    bottom:0rpx;
    z-index:996;
}
.footer-centent-left{
    position: absolute;

    left:30rpx;
}
.footer-centent-right{
    width:460rpx;
    padding:10rpx;
    line-height:50rpx;
    height:70rpx;
    text-align:center;
    margin-right:30rpx;
    margin-top:20rpx;
    border-radius:40rpx;
    color:#fff;
    /* background-color: #0083E5; */
    background: -webkit-linear-gradient(left,rgba(0,176,243,1),rgba(0,120,226,1));
}
/* drawer */
.drawer-wrap{
    position: relative;
}
.drawer-container{
    width: 600rpx;
    background-color: #fff;
    padding-bottom:66px;
    padding-right:20rpx;
    padding-left:20rpx;
    box-sizing: border-box;
    overflow-y: scroll;
    /* margin-top:106rpx; */
}
.drawer-container-wrap{
    margin-top: 50rpx;
    padding:20rpx 15rpx;
    background-color: #F5F7FD;
    overflow: hidden;
    line-height: 48rpx;
    border-radius: 20rpx;
}
.drawer-container-item-left{
    float: left;
}
.drawer-container-item-right{
    float: right;
}
.drawer-container-item-blue{
    color:#3996E7;
    margin-left: 15rpx;
}
.drawer-container-item-red{
    color:#D10820;
    margin-left: 15rpx;
}
.drawer-container-title{
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow:hidden; /* 通过以上四行实现文字省略 */
}
/* 附件 */
.fromItem{
    height: auto;
    margin-bottom: 20rpx;
    overflow: hidden;
}
.fromCenter{
    text-align: center;
    line-height: 20px;
}
.from-left{
    width: 84%;
    height: auto;
}
.from-name-left{
    display:inline-block;
    width:510rpx;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow:hidden; /* 通过以上四行实现文字省略  */
}
.from-right.fromRight{
    width: 8%;
    height: auto;
    line-height: normal;
}
.from-left-img{
    float: left;
    text-align: left;
    width: 8%;
    height: auto;
    line-height: normal;
    display: flex;
    justify-content: center;
    align-items: center;
}
.from-right-img{
    height: auto;
    line-height: normal;
    display: flex;
    justify-content: center;
    align-items: center;
}
.from-left-img>._img{
    display:inline-block;
    width:20rpx;
    height:38rpx;
}
</style>
