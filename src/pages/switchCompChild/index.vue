<template>
    <div>
        <navBar :importData="titleData"></navBar>
        <view class="i-index-demo" :style="{'margin-top':titleHeight}">

            <view class="cell-wrap">
                <!-- <van-cell-group> -->
                    <!-- <van-cell custom-class="i-cell-p" title-class="i-cell-t" :title="items.name" v-for="(items, index) in listArr" :key="index" is-link> -->
                    <van-cell custom-class="i-cell-p" title-class="i-cell-t" :title="items.name" v-for="(items, index) in listArr" :key="index" @click="navUrl(items)">
                        <!-- <p v-for="(it, ind) in item.list" :key="ind" class="i-cell-p" @click="selClick(it)">{{it.name}}</p> -->
                        <!-- <p @click="selClick(items)">{{items.name}}</p> -->
                    </van-cell>
                <!-- </van-cell-group> -->
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
                text:"切换赛项",
                isBack:false,
            },
            titleHeight:wx.getStorageSync('titleHeight')+'px',
            // url参数
            options:{},
            isLoading:true,
        }
    },
    created () {
        // let sysInfos=wx.getSystemInfoSync()
        // var _this=this;
        // wx.getStorage({
        //     key:'titleHeight',
        //     success:function(res){
        //         _this.titleHeight=res.data+'px'
        //     }
        // })
        // let storeCity = new Array(26);
        // const words = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        // words.forEach((item,index)=>{
        //     storeCity[index] = {
        //         key : item,
        //         list : []
        //     }
        // })
        // universitys.forEach((item)=>{
        //     let firstName = item.zone.substring(0,1).toUpperCase();
        //     let index = words.indexOf( firstName );
        //     storeCity[index].list.push({
        //         name : item.name,
        //         key : firstName
        //     });
        // })
        // this.universitys = storeCity;

    },
    onLoad(options){
        // var _this=this
        // wx.getStorage({
        //     key:'titleHeight',
        //     success:function(res){
        //         _this.titleHeight=res.data+'px'
        //     }
        // })
        if (this.titleHeight=='px') {
            this.getTitle();
        }
        this.list(options);
    },
    onShow(){
        this.titleData.isBack=true;
    },
    mounted() {

    },
    methods:{
        async list(e){
            let data={
                competitionId:e.id
            }
            api.getCompChildrenList(data).then((reset)=>{
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
                key:"competitionData",
                data:items
            })
            this.getPattern(items)
        },
        // 获取赛项规则
        getPattern(e){
            let data={
                competitionId:e.id,
                rowId:e.rowId,
            }
            api.getPattern(data).then((reset)=>{
                if(reset.code===20000){
                    wx.setStorage({
                        key:"patternData",
                        data:reset.data
                    })
                    wx.setStorage({
                        key:"pattern",
                        data:reset.data.pattern
                    })
                    let url='/pages/my/main'
                    wx.switchTab({url})
                }else{
                    wx.showToast({
                        title: reset.message,
                        icon: 'none',
                        duration: 3000
                    })
                }
            })
        },
        handleClick(){
            console.log("button")
        },
        onChange(event){
            console.log(event.detail,'click right menu callback data')
        },
        selClick(e){
            console.log(e)
        },
        onSearch(e){
            console.log(e)
            console.log(this.searchValue)
        }
    }
}
</script>

<style scoped>
.cell-wrap{
    padding-top:3px;
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
