<template>
    <div class="upload-wrap">
        <view class="weui-uploader">
            <view class="weui-uploader__hd">
                <view class="weui-uploader__bd">
                    <block v-for="(item,index) in imagesList" :key="index" >
                        <view class="weui-uploader__file">
                            <image class="weui-uploader__img" :src="item" @click="previewImg(item,imagesList)"></image>
                            <view class="weui-uploader__icon" v-if="!show">
                                <i-icon type="offline_fill" size="26" color="#D0021B" @click="iconClick(index)"/>
                            </view>
                        </view>
                    </block>
                    <view class="weui-uploader__input-box" v-if="!show">
                        <view class="weui-uploader__input-replace" @click='uploader'>
                            <image class="weui-uploader-input-img" src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/photograph.png"></image>
                            <!-- <van-icon name="photograph" size="75rpx" custom-class="upload-icon" /> -->
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </div>
</template>
<script>
import oss from '@/utils/upload'
export default {
    props: ['importData','importAdd'],
    data(){
        return {
            imagesList:[],
            show:true
        }
    },
    computed: {

    },
    created(){
        console.log(this.importAdd)
        this.show=this.importAdd
        if(this.importData){
            if (typeof(this.importData)=='string') {
                this.imagesList.push(this.importData)
            }else{
                this.imagesList=this.importData
            }
        }else{
            this.imagesList=[]
        }
    },
    onLoad(options){
    },
    mounted(){

    },
    onShow(){

    },
    methods: {
        // 点击删除图片
        iconClick(e){
            this.imagesList.splice(e,1)
            this.$emit("exportData",{data:this.imagesList})
        },
        // 图片预览
        previewImg(src,imgList){
            // console.log(event)
            // var src = event.currentTarget.dataset.src;//获取data-src
            // var imgList = event.currentTarget.dataset.list;//获取data-list
            //图片预览
            wx.previewImage({
                current: src, // 当前显示图片的http链接
                urls: imgList // 需要预览的图片http链接列表
            })
        },
        uploader:function(){
            var _this=this;
            let maxSize=1024*1024;
            let maxLength=3;
            let flag=true;
            wx.chooseImage({
                count: 9, //最多可以选择的图片总数
                sizeType: ['original','compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function(res) {
                    wx.showToast({
                        title: '正在上传...',
                        icon: 'loading',
                        mask: true,
                        duration: 500
                    })
                    for(let i=0;i<res.tempFiles.length;i++){
                        if(res.tempFiles[i].size>maxSize){
                            flag=false;
                            wx.showToast({
                                title: '图片太大，不允许上传',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    }
                    if (flag == true) {
                        for (var i = 0; i < res.tempFiles.length; i++) {
                            //显示消息提示框
                            wx.showLoading({
                                title: '上传中' + (i + 1) + '/' + res.tempFilePaths.length,
                                mask: true
                            })
                            oss.upLoad(res.tempFiles[i].path,function (result) {
                                wx.hideToast()
                                _this.imagesList.push(result)
                            }, function (result) {
                                wx.showToast({
                                    title: '上传失败',
                                    icon: 'none',
                                    mask: true,
                                    duration: 2000
                                })
                                wx.hideLoading()
                            })
                        }
                    }
                    // if (res.tempFiles.length>maxLength){
                    //     wx.showModal({
                    //         content: '最多能上传'+maxLength+'张图片',
                    //         showCancel:false,
                    //         success:function(res){
                    //             if(res.confirm){
                    //                 console.log('确定');
                    //             }
                    //         }
                    //     })
                    // }
                    // if (flag == true && res.tempFiles.length <= maxLength){
                    //     _this.imagesList.push(res.tempFilePaths)
                    // }
                    _this.$emit("exportData",{data:_this.imagesList})
                    // wx.uploadFile({
                    //     url: 'https://shop.gxyourui.cn',
                    //     filePath: res.tempFilePaths[0],
                    //     name: 'images',
                    //     header: {
                    //         "Content-Type": "multipart/form-data",
                    //         'Content-Type': 'application/json'
                    //     },
                    //
                    //     success:function(data){
                    //         console.log(data);
                    //     },
                    //     fail:function(data){
                    //         console.log(data);
                    //     }
                    //
                    // })
                    // console.log(res);
                },
                fail:function(res){
                    console.log(res);
                }
            })
        },
    }
}
</script>

<style scoped>
    .upload-wrap{
        width: 100%;
        /* height: 200rpx; */
    }
    .weui-uploader__bd{
        padding:20rpx 0rpx 20rpx 0rpx;
        position: relative;
    }
    /* 删除图标 */
    .weui-uploader__icon{
        width:45rpx;
        height: 45rpx;
        text-align: center;
        vertical-align: middle;
        position: absolute;
        top:-88rpx;
        right: -10rpx;
    }
    .weui-uploader__file{
        display: inline-block;
        width: 175rpx;
        height: 175rpx;
        text-align: center;
        line-height:175rpx;
        /* border: 1px solid transparent; */
        border-radius: 4px;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 3px rgba(0,0,0,.1);
        margin-right: 43rpx;
        margin-bottom: 30rpx;
    }
    .weui-uploader__input-box{
        display: inline-block;
        width: 175rpx;
        height: 175rpx;
        text-align: center;
        line-height:175rpx;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 3px rgba(0,0,0,.1);
        margin-right: 43rpx;
        position: relative;
    }
    .weui-uploader__input-box .weui-uploader__input{
        width: 100%;
        height: 100%;
        /* background: url(https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/提示2.png) no-repeat; */
        /* display: none; */
        opacity: 0;
        position: relative;
        z-index:2;
    }
    .weui-uploader__input-box .weui-uploader__input-replace{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
        padding:50rpx;
        background-color: #ebecec;
        box-sizing: border-box;
    }
    .weui-uploader-input-img{
        width: 100%;
        height: 100%;
        vertical-align:top;
    }
    .weui-uploader__img{
        width:100%;
        height:100%;
    }
</style>
