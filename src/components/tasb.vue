<template>
    <view class="tabbar_box">
        <view v-for="(item,index) in list" :key="index" class="tabbar_item tabbar_nav" @click="switchTab(item)">
            <!-- <navigator class="tabbar_nav" :url="item.pagePath" open-type="redirect"> -->
                <image class="tabbar_icon" :src="selected==index ? item.selectedIconPath : item.iconPath"></image>
                <text :style="{'color':selected==index ? item.selectedColor : item.color}">{{item.text}}</text>
            <!-- </navigator> -->
        </view>
    </view>
</template>
<script>
export default {
    props: ['selected'],
    data(){
        return {
            list: [
                {
                    "text": "已评审",
                    "pagePath": "/pages/experted/main",
                    "iconPath": "/static/tabs/judge.png",
                    "selectedIconPath": "/static/tabs/judged.png",
                    "color":"#8E8E93",
                    "selectedColor":"#1B7CD5",
                    "selected": false
                },
                {
                    "text": "去评审",
                    "pagePath": "/pages/expert/main",
                    "iconPath": "/static/tabs/go.png",
                    "selectedIconPath": "/static/tabs/go.png",
                    "color":"#8E8E93",
                    "selectedColor":"#0076FF",
                    "selected": false
                },
                {
                    "text": "我的",
                    "pagePath": "/pages/my/main",
                    "iconPath": "/static/tabs/my.png",
                    "selectedIconPath": "/static/tabs/myed.png",
                    "color":"#8E8E93",
                    "selectedColor":"#0076FF",
                    "selected": true
                }
            ]
        }
    },
    created() {
        var _curPageArr = getCurrentPages()
    },
    onShow(){

    },
    methods: {
        switchTab (e) {
            wx.switchTab({ url: e.pagePath })
            // this.$setData({
            //   selected: index
            // })
        }
    }
}
</script>
<style>
.tabbar_box{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 120rpx;
    border-top: 1rpx solid #E5E6E6;
    background-color: #fff;
}
.tabbar_item{
    flex:1;
}
.tabbar_nav{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    height: 100%;
}

.tabbar_icon{
    width: 50rpx;
    height:50rpx;
}

.tabbar_nav:nth-child(2) image{
    position:relative;
    top:-16px;
    width:41px;
    height:41px;
}
.tabbar_nav:nth-child(2) text{
    position:relative;
    top:-9px;
}
</style>
