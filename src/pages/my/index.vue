<template>
    <div class="connent">
        <!-- <navBar :importData="titleData"></navBar> -->
        <div class="header">
            <div class="imgb">
                <img src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/userB.png" alt="">
            </div>
            <div class="user">
                <div>
                    <img :src="iconUrl" alt="">
                </div>
                <p>{{idcardName}}</p>
            </div>
        </div>
        <div class="content">
            <div class="from">
                <div class="fromItem">
                  <div class="fromLeft">
                    <img src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/signUp.png" alt="" style="width:16px;height:20px;">
                    <span>评审竞赛</span>
                  </div>
                  <div class="fromRight" @click="clickChange">
                        <view class="my-span">{{compName}}</view>
                        <img src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/Chevron@2x.png" alt="">
                  </div>
                </div>
                <div class="fromItem">
                  <div class="fromLeft">
                    <img src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/school.png" alt="" style="width:19px;height:18px;">
                    <span>绑定高校</span>
                  </div>
                  <div class="fromRight">
                      <span>{{schoolName}}</span>
                  </div>
                </div>
                <div class="fromItem">
                  <div class="fromLeft">
                    <img src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/phone.png" alt="" style="width:14px;height:18px;">
                    <span>绑定手机</span>
                  </div>
                  <div class="fromRight">
                      <span>{{contactPhone}}</span>
                  </div>
                </div>
            </div>
        </div>
        <div class="">
            <tasb :selected="2"></tasb>
        </div>
  </div>
</template>

<script>
import tasb from "@/components/tasb.vue"
export default {
    components: {
        tasb
    },
    data () {
        return {
            iconUrl:"",
            idcardName:"",
            compName:"",
            schoolName:"",
            contactPhone:"",
        }
    },
    created () {

    },
    onLoad(){

    },
    onShow(){
        wx.hideTabBar()
        let _this=this;
        // 获取选择竞赛
        if(wx.getStorageSync("competitionData")){
            this.compName=wx.getStorageSync("competitionData").name
        }else{
            this.compName=wx.getStorageSync("compData").name
        }
    },
    mounted(){
        this.getUser()
    },
    methods: {
        toper(){
            let url='/pages/userPerfect/main'
            wx.navigateTo({url})
        },
        clickChange(){
            let url='/pages/switchComp/main'
            wx.navigateTo({url})
        },
        async getUser(){
            let _this=this;
            wx.getStorage({
                key:"userInfo",
                success:function(res){
                    if (res.data) {
                        _this.iconUrl=res.data.icon
                        _this.idcardName=res.data.idcardName
                        _this.schoolName=res.data.school
                        _this.contactPhone=res.data.contactPhone
                    }
                },
                fail:function(err){
                    let url='/pages/login/main'
                    wx.navigateTo({url})
                }
            })
        },
        toBindphone(){
            let url='/pages/bindPhone/main'
            wx.navigateTo({url})
        }
    },
}
</script>
<style scoped>

.detailsMatch{
    width: 100%;
    position: relative;
}
.header{
    width: 100%;
    height: 256px;
    position: relative;
    /* background:linear-gradient(90deg,rgba(0,120,226,1) 0%,rgba(43,210,179,1) 100%); */
}
.imgb{
    width: 100%;
    height: 100%;
    display: inline;
}
.imgb>img{
    width: 100%;
    height: 100%;
}
.user{
    width: 100px;
    height: 132px;
    position: absolute;
    top: 94px;
    left: 50%;
    margin-left: -50px;
}
.user>div{
    width: 100px;
    height: 100px;
}
.user>div>img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.user>p{
    width:100px;
    height:20px;
    font-size:20px;
    font-family:SourceHanSansCN-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:30px;
    text-align: center;
}
.content{
    padding: 80rpx 50rpx 0px 50rpx;
    background:rgba(255,255,255,1);
    box-shadow:0px -5px 4px 0px rgba(0,0,0,0.05);
    border-radius:10px 10px 0px 0px;
    position: absolute;
    top: 250px;
    width: 650rpx;
}
.fromItem{
    height: 20px;
    margin-bottom: 45px;
}
.my-span{
    display: inline-block;
    width: 165px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: SourceHanSansCN-Regular;
    font-weight: 400;
    color: rgba(74,74,74,1);
    letter-spacing: 1px;
    height: 20px;
    line-height: 20px;
    font-size: 17px;
}
</style>
