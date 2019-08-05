<template>
    <view class="tabbar_box">
        <view v-for="(item,index) in list" :key="index">
            <!-- <navigator class="tabbar_nav" :url="item.pagePath" style="width:33.33%" open-type="redirect">
                <image class="tabbar_icon" :src="item.selected ? item.selectedIconPath : item.iconPath"></image>
                <text :style="{'color':item.selected ? tabbar.selectedColor : tabbar.color}">{{item.text}}</text>
            </navigator> -->
            222
        </view>
        <view>
            111
        </view>
    </view>
</template>
<script>
export default {
    data(){
        return {
            list: [
                {
                    text: "已评审",
                    pagePath: "pages/experted/main",
                    iconPath: "static/tabs/judge.png",
                    selectedIconPath: "static/tabs/judged.png",
                    selected: false
                },
                {
                    text: "去评审",
                    pagePath: "pages/expert/main",
                    iconPath: "static/tabs/go.png",
                    selectedIconPath: "static/tabs/go.png",
                    selected: false
                },
                {
                    text: "我的",
                    pagePath: "pages/my/main",
                    iconPath: "static/tabs/my.png",
                    selectedIconPath: "static/tabs/myed.png",
                    selected: true
                }
            ]
        }
    },
    created() {
        console.log("tab");
    },
    onLoad(){
        console.log(22);
    },
    methods: {
        changeTabBar: function () {
            var _curPageArr = getCurrentPages();
            console.log(_curPageArr)
            var _curPage = _curPageArr[_curPageArr.length - 1];
            var _pagePath = _curPage.__route__;
            if (_pagePath.indexOf('/') != 0) {
              _pagePath = '/' + _pagePath;
            }
            var tabBar = this.tabbar;
            for (var i = 0; i < tabBar.list.length; i++) {
              console.log(_pagePath + '--' + tabBar.list[i].pagePath)
              tabBar.list[i].selected = false;
              if (tabBar.list[i].pagePath == _pagePath) {
                tabBar.list[i].selected = true;//根据页面地址设置当前页面状态
              }
            }
            _curPage.setData({
              tabbar: tabBar
            });
        },
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
    border-top: 1rpx solid #d7d7d7;
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
    top:-32rpx;
    width:80rpx;
    height:80rpx;
}
.tabbar_nav:nth-child(2) text{
    position:relative;
    top:-32rpx;
}
</style>
