<template>
    <view class="popup-wrap">
        <view class="popup-title-wrap flex-wrap">
            <view class="popup-title-item tl popup-title-close flex-wrap-item" @click="popupClose">关闭</view>
            <view class="popup-title-item tc popup-title-score flex-wrap-item">
                <text style="font-weight:600">{{totalScore}}</text>
                <text>分</text>
            </view>
            <view class="popup-title-item tr popup-title-sure flex-wrap-item" @click="popupSure">确定</view>
        </view>
        <view>
            <view style="padding: 16px" class="flex-wrap" v-for="(items,index) of reviewScores" :key="index">
                <view class="flex-wrap-item tl">
                    <text>{{items.title}}({{items.weight}}%)</text>
                </view>
                <view class="flex-wrap-item tr">
                    <!-- <i-input-number v-model="items.score" min="0" max="100" @change="handleChange" /> -->
                    <van-stepper v-model="items.score" min="0" max="100" integer @change="handleChange(index,items,$event)" />
                </view>
            </view>
            <view style="padding: 16px">
                <view>
                    <van-field
                    v-model="remarkValue"
                    label="点评"
                    type="textarea"
                    placeholder="请输入评论"
                    autosize
                    :border="false"
                    cursor-spacing="60"
                    :show-confirm-bar="false"
                    @change="remarkChange"
                    />
                </view>
            </view>
        </view>
    </view>
</template>
<script>
    import Vue from 'vue'
    import api from '@/api/index'
    export default {
        props: ['importData','importPic'],
        data () {
            return {
                // 评分数据
                drawerBottomShow:false,//评分组件显示
                num1:100,
                reviewScores:[],
                remarkValue:'',//点评
                totalScore:0,//总分
                pattern:wx.getStorageSync("pattern"),
                pictureUrl:[],//会评图片数组
            }
        },
        onLoad(){

        },
        mounted() {
            if (this.importPic) {
                this.pictureUrl=this.importPic
            }else{
                this.pictureUrl=[]
            }
            this.reviewScores=[]
            this.getScore();
        },
        methods:{
            getScore(){
                let data={
                    poolId:this.importData.id
                }
                if(this.pattern==1){
                    data.attachId=this.importData.attachId
                }
                api.getScores(data).then((reset)=>{
                    if(reset.code===20000){
                        if(reset.data){
                            this.reviewScores=reset.data.reviewScores
                            this.remarkValue=reset.data.comment
                            this.totalScore=reset.data.total
                            // for(let i in this.reviewScores){
                                // this.totalScore=this.totalScore+(this.reviewScores[i].score*this.reviewScores[i].weight/100)
                            // }
                        }else{
                            let reviewStandardList=wx.getStorageSync("patternData").reviewStandardListDto.reviewStandardList
                            if (this.pattern==1) {
                                for (var i = 0; i < reviewStandardList.length; i++) {
                                    if (reviewStandardList[i].attachId==this.importData.attachId) {
                                        this.reviewScores=reviewStandardList[i].reviewScores
                                        this.totalScore=reviewStandardList[i].total
                                    }
                                }
                            }else{
                                this.reviewScores=reviewStandardList[0].reviewScores
                                this.totalScore=reviewStandardList[0].total
                            }

                        }

                    }else{
                        wx.showToast({
                            title: reset.message,
                            icon: 'none',
                            duration: 3000
                        })
                    }
                })
            },
            // 附件评分
            //点评
            remarkChange(e){
                this.remarkValue=e.mp.detail
            },
            // 评分
            handleChange(index,val,eve){
                // this.num1=e.target.value
                val.score=eve.mp.detail
                Vue.set(this.reviewScores,index,val)
                this.totalScore=0
                for(let i in this.reviewScores){
                    this.totalScore=this.totalScore+(this.reviewScores[i].score*this.reviewScores[i].weight/100)
                }
                // 向下取整,保留两位小数
                // this.totalScore=parseFloat(this.totalScore+(newValue[i].score*newValue[i].weight/100))
                this.totalScore=Math.floor(this.totalScore * 100) / 100;
                // if(score<0){
                //     this.reviewScores[e].score=0
                //     Vue.set(this.reviewScores,e,this.reviewScores[e])
                // }else if(score>100){
                //     this.reviewScores[e].score=100
                //     Vue.set(this.reviewScores,e,this.reviewScores[e])
                // }
            },
            // 评分取消
            popupClose(){
                // this.drawerBottomShow=false
                this.$emit("exportData",{show:false})
            },
            // 评分确定
            popupSure(){
                let data={
                    poolId:this.importData.id,
                    comment:this.remarkValue,
                    competitionId:wx.getStorageSync("competitionData").id,
                    rowId:wx.getStorageSync("competitionData").rowId,
                    pattern:this.pattern,
                    reviewScores:this.reviewScores,
                    total:this.totalScore
                }

                if(this.pictureUrl.length>0){
                    data.pictureList=[]
                    let obj={}
                    if (this.pattern==0) {
                        obj.name=this.importData.id
                        obj.pictureUrl=this.pictureUrl
                    }else{
                        obj.name=this.importData.attachId
                        obj.pictureUrl=this.pictureUrl
                    }
                    data.pictureList.push(obj)
                }
                if (this.pattern==1) {
                    data.attachId=this.importData.attachId
                }
                api.submitScore(data).then((reset)=>{
                    if(reset.code===20000){
                        wx.showToast({
                            title: "评审成功!",
                            icon: 'success',
                            duration: 2000
                        })
                        this.$emit("exportData",{show:false,data:true})

                    }else{
                        wx.showToast({
                            title: "评审失败,请重新评审!",
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            },
        }
    }
</script>
<style scoped>

/* 评分组件 */
.popup-wrap{
    padding:20rpx 0rpx;
}
.popup-title-wrap{
    line-height: 62rpx;
    padding-left: 30rpx;
    padding-right: 30rpx;
    border-bottom:1px solid #F5F5F5;
}
.popup-title-close{
    color:#9D9D9D;
}
.popup-title-score{
    color:#4A4A4A;
}
.popup-title-sure{
    color:#0078E2;
}
</style>
