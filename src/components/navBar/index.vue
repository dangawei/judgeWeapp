<template>
  <div class="navBar" :style="{'padding-top':statusBarHeight+'px'}">
    <div :class="{'nav-wrap':true,'changBach':changBach}" :style="{'padding-top':alignTop,'padding-bottom':alignTop}">
        <!-- // 导航栏  左上角的返回按钮 和home按钮 -->
        <!-- //  其中v-if='{{navbarData.showCapsule}}' 是控制左上角按钮的显示隐藏，首页不显示 -->
        <div class="nav-capsule">
            <div @click="goBack" style="text-align:center;" v-if="isBack">
                <img src='https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/back.png' mode='aspectFill' class='back-home'>
            </div>
        </div>
        <!-- // 导航栏 中间的标题 -->
        <div class="nav-title">{{title}}</div>
        <!-- <div class="nav-title nav-title-left" v-if="!isBack">{{title}}</div> -->
        <div class="nav-null"></div>
    </div>

  </div>
</template>

<script>
import { getBarHeight,getSysInfo } from '@/utils/index'
export default {
  props: ['importData'],
  data(){
    return{
        height:'',
        share:1,
        title:'',
        isBack:false,
        heiStyle:false,
        changBach:false,
        // 状态栏高度
        statusBarHeight:getSysInfo().statusBarHeight,
        // 标题栏高度
        titHeight:40,
        alignTop:'4px',
    }
  },
    created(){
        console.log("nav")
        this.titHeight = getSysInfo().system.indexOf('iOS')>-1?40:48;
        this.alignTop=(this.titHeight-32)/2+'px'
        this.title=this.importData.text
        this.isBack=this.importData.isBack
        if(this.title==='登录'){
            this.changBach=true
        }
    },
//   computed:{
//       height(){
//           return `${this.height}`
//       }
//   },
    onReady(){
        let that=this
        let height= getBarHeight();
        if(height>20){
            this.heiStyle=true
        }else{
            this.heiStyle=false
        }
        // wx.getStorage({
        //     key: 'share',
        //     success(res) {
        //         that.share=res.data
        //     }
        // })
    },
    onShow(){

        this.title=this.importData.text
        this.isBack=this.importData.isBack
    },
  methods:{
    toDetail(){
      let url = '/pages/details/main'
       wx.navigateTo({url})
    },
    goBack(){
    //     console.log('111')
    //     let url = '/pages/details/main'
    //    wx.navigateTo({url})
        wx.navigateBack({
            delta:1
        })
    }
  }

}
</script>


<style  scoped>
/* .card {
   width: 336rpx;
   margin-bottom: 16px;
} */
.navBar{
    background:linear-gradient(90deg,rgba(0,120,226,1) 0%,rgba(43,210,179,1) 100%);
    color: #000;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 996;
}
.nav-wrap {
    height: 32px;
    /* padding-top: 28px;
    padding-bottom: 18px; */
    width: 750rpx;
    z-index: 999;
    line-height: 32px;
    vertical-align: middle;
    position: relative;
    display: flex;
}
/* 标题要居中 */
.nav-title {
    text-align: center;
    width: 400rpx;
    height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #2c2b2b;
    font-weight: 600;
    font-size:18px;
    font-family:SourceHanSansCN-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height: 32px;
    /* position: absolute;
    top: 0;
    left: 50%;
    margin-left: -260rpx; */
    margin: 0 auto;
    vertical-align: middle;
    flex:4;
}
.nav-title-left.nav-title{
    text-align: left;
    padding-left: 16px;
}
.nav-null{
    flex:1;
}
.nav-capsule {
    /* position: absolute;
    top: 0;
    left: 30rpx; */
    flex:1;
    height: 32px;
    overflow: hidden;
}
.nav-capsule img {
    vertical-align: middle;
    width: 12px;
    height: 20px;
}
.changBach{
  background:rgba(0,131,247,0);
}
</style>
