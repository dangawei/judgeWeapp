<template>
    <div class="search-wrap">
        <navBar :importData="titleData"></navBar>
        <view class="i-index-demo" :style="{'margin-top':titleHeight}">
            <view>
                <van-search
                  v-model="searchValue"
                  :focus="true"
                  placeholder="请输入搜索关键词"
                  @change="onSearch"
                />
            </view>
            <view v-if="listArr.length>0">
                <van-cell custom-class="i-cell-p" title-class="i-cell-t" :title="items.id" v-for="(items, index) in listArr" :key="index" @click="selClick(items)">
                </van-cell>
            </view>
            <view v-if="wuShow">
                <van-cell custom-class="i-cell-p" title-class="i-cell-t" title="暂无此作品编号">
                </van-cell>
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
            titleHeight:'',
            listArr:[],
            searchValue:'',//搜索关键字
            isFocus:true,
            titleData:{
                text:"搜索作品",
                isBack:true
            },
            wuShow:false,
        }
    },
    created () {

    },
    onLoad(e){
        var _this=this;
        wx.getStorage({
            key:'titleHeight',
            success:function(res){
                _this.titleHeight=res.data+'px'
            }
        })
        this.listArr=[]
        this.searchValue=''
        this.wuShow=false
    },
    methods:{
        onSearch(e){
            let data={
                rowId:wx.getStorageSync('competitionData').rowId,
                poolId:e.mp.detail
            }
            if (e.mp.detail) {
                api.searchWorksId(data).then((reset)=>{
                    if(reset.code===20000){
                        this.listArr=reset.data
                        if (this.listArr.length==0) {
                            this.wuShow=true
                        }else{
                            this.wuShow=false
                        }
                    }else{
                        this.toast(reset.message)
                    }
                })
            }else{
                this.listArr=[]
                this.wuShow=false
            }

        },
        selClick(e){
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
.i-cell-p{
    font-size: 12px;
    line-height: 28px;
    border-bottom: 1px solid #F2F2F2;
}
.i-cell-text{
    background-color: #E1E8F4;
}
</style>
