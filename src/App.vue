<script>
export default {
  created () {

    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

        let logs
        if (mpvuePlatform === 'my') {
            logs = mpvue.getStorageSync({key: 'logs'}).data || []
            logs.unshift(Date.now())
            mpvue.setStorageSync({
                key: 'logs',
                data: logs
            })
        } else {
            logs = mpvue.getStorageSync('logs') || []
            logs.unshift(Date.now())
            mpvue.setStorageSync('logs', logs)
        }
    },
    log () {
        console.log(`log at:${Date.now()}`)
    },
    onLoad(){

    },
    onShow(){
        wx.hideTabBar()
    },
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
page{
    font-size: 15px;
}
.experted-list-wrap .van-card{
    padding:19rpx 0px;
    border-bottom: 1px solid #F9F9F9;
    background-color: #fff;
}
.footer-centent-wrap .van-tabbar--safe{
    padding-bottom: 0px;
}
.tl{
    text-align: left;
}
.tc{
    text-align: center;
}
.tr{
    text-align: right;
}
.flex-wrap{
    -webkit-display: flex;
    display: flex;
    justify-content:center;
    align-items:center;
}
.flex-wrap-item{
    flex:1;
}
/* expert */
.btn-wrap .van-button{
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    padding:0px 21px;
}
.btn-hidden.van-button--info{
    background-color: #fff;
    color: #0078E2;
    z-index: 1;
}
.btn-wrap .btn-hidden.btn-hidden-right{
    margin-left:-33px;
    padding-right:13px;
    padding-left:35px;
}
.btn-wrap .btn-hidden.btn-hidden-left{
    margin-right:-33px;
    padding-left:13px;
    padding-right:35px;
}
.btn-show.van-button--info{
    z-index: 2;
}
/* rate */
.rate-input-wrap{
    border-radius:60rpx;
}
.rate-input.i-input{
    background-color: #F6FAFF;
    border-radius:60rpx;
    text-align:center;
}
/* .heiSty{
    margin-top: 100px;
} */
/* popup */
.van-popup--bottom.van-popup--safe{
    padding-bottom: 15px !important;
}
.van-cell.field-index--van-field{
    padding:10px 0px;
}
/* 列表样式 */
.fromItem{
    height: 20px;
    margin-bottom: 45px;
}
.fromLeft{
    float: left;
    height: 20px;
    line-height: 20px;
}
.fromLeft>img{
    width: 20px;
    height: 20px;
    margin-right: 12px;
}
.fromLeft>span{
    max-width:246rpx;
    font-size:16px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(74,74,74,1);
    letter-spacing:1px;
    display: inline-block;
    height: 16px;
    line-height: 20px;
    float: right;
}
.fromRight{
    float: right;
    text-align: right;
    width:190px;
    height: 25px;
    /* line-height: 20px; */
}
.fromRight>img{
    display: inline-block;
    width:10px;
    height:17px;
}
.fromRight>span{
    display: inline-block;
    width:145px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size:16px;
    font-family:SourceHanSansCN-Regular;
    font-weight:400;
    color:rgba(74,74,74,1);
    letter-spacing:1px;
    line-height: 20px;
}
/* 超出字体省略号 */
.text-overflow-style{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.van-card-wrap .van-card__thumb{
    width: 200rpx;
    height: 150rpx;
}
/* button按钮禁止点击 */
.van-button--disabled.rate-btn.van-button{
    background: #ccc !important;
}
.van-tabbar-item--active{
    color:#B6B6B6 !important;
}
.btn-wrap .van-button--normal{
    font-size: 16px;
}
/* 评审 */
.rate-input-wrap .i-input-input{
    font-size: 20px;
}
.cell-wrap .van-cell{
    font-size: 18px;
    line-height: 24px;
}
/* search */
.search-wrap .van-cell{
    font-size: 18px;
    line-height: 28px;
}
</style>
