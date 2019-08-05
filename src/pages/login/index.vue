<template>
  <div class="content" >
    <!-- <div style="position:absolute;top:0;left:0;z-index:999;">
      <navBar :data="title"/>
    </div> -->
    <div class="connent" >
      <div class="logo">
        <img src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/logo1.png" alt="">
      </div>
      <div class="title">
        <p>欢迎登陆线下评审平台！</p>
        <span class="btn btnco" v-if="againShow" @click="toAgain">再次尝试登录</span>
        <p v-if="bindShow">请先绑定手机号</p>
      </div>
      <form  v-if="bindShow">
          <view class="section">
              <input name="input" @input="phoneBlur" placeholderStyle="color:#fff;font-size:16px;font-family:SourceHanSansCN-Regular;font-weight:400;opacity:0.6" style="padding-left:20px;" v-model="phone" placeholder="请输入绑定手机号" />
              <div class="sms">
                <input name="input" @input="smsBlur" placeholderStyle="color:#fff;font-size:16px;font-family:SourceHanSansCN-Regular;font-weight:400;opacity:0.6" style="padding-left:20px;" v-model="smsCode" placeholder="请输入验证码" />
                <span v-if="!setime" @click="getMsm" :class="{'bco':bcolor}">获取验证码</span>
                <span v-if="setime">重新获取{{seconds}}</span>
              </div>

          </view>
          <div >
              <span :class="{'btnco':btnco,'btn':true}" @click="submit">绑定</span>
          </div>
      </form>


        <!-- <input name="input" v-model="username" placeholder="用户名" />
        <input name="input" v-model="password" placeholder="密码" />
        <button @click="btns">登录</button> -->
    </div>
    <div class="btmLogo"  v-if="bindShow">
        <img src="https://compeition-excute.oss-cn-beijing.aliyuncs.com/wx-xcx-images/logo2.png" alt="">
      </div>
    <div class="btmTitle"  v-if="bindShow">杭州简学技术有限公司</div>
    <button class="getBtn" v-if="buttonVisible" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">获取微信授权</button>
  </div>
</template>

<script>
import network from '@/api/index'
import navBar from "@/components/navBar/index"
export default {
  components: {
    navBar
  },

  data () {
    return {
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      title:{
            'text':'登录'
      },
      buttonVisible:false,
      code:'',
      bindShow:false,
      userInfo:{},
      username:'',
      password:'',
      phone:'',
      smsCode:'',
      bcolor:false,
      btnco:'',
      setime:false,
      seconds:'',
      againShow:false

    }
  },

    created () {
        // 获取设备信息
        let sysInfos=wx.getSystemInfoSync()
        let titHeight = sysInfos.system.indexOf('iOS')>-1?40:48;
        let statusBarHeight=sysInfos.statusBarHeight
        let titleHeight= titHeight+statusBarHeight
        let windowHeight= sysInfos.windowHeight
        wx.setStorage({
            key: 'windowHeight',
            data:windowHeight
        })
        wx.setStorage({
            key: 'titleHeight',
            data:titleHeight
        })
    },
    onLoad() {
        const self = this;
        // 查看是否授权
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.login({
                        success (res) {
                            if (res.code){
                                self.code = res.code;
                                self.wxGetUserInfo(res.code);
                            }
                        },
                    })
                }else{
                    self.buttonVisible=true;
                    self.againShow=false
                }
            },
            fail(err){
                self.buttonVisible=true;
                self.againShow=false;
            }
        })
    },
    mounted(){


    },
  methods:{
    async submit(){
      let isClick=true

        if(isClick){
          isClick=false

          setTimeout(function(){
              isClick = true;
          }, 500);

          let that=this
          let params={
            nickName:this.userInfo.nickName,
            avatarUrl:this.userInfo.avatarUrl,
            country:this.userInfo.country,
            province:this.userInfo.province,
            city:this.userInfo.city,
            language:this.userInfo.language,
            gender:this.userInfo.gender,
            mobile:this.phone,
            smsCode:this.smsCode
          }
          let list = await network.bindPhone(params)
            if(list.code===20000){
              wx.login({
                  success (res) {
                      if (res.code){
                          console.log(res.code)
                          // that.code = res.code;
                          that.wxGetUserInfo(res.code);
                      }
                  },
              })
          }else{
            that.toast(list.message)
          }
        }else{
          return
        }


    },
    toAgain(){
      const self = this;
      wx.login({
          success (res) {
              if (res.code){
                  self.code = res.code;
                  self.wxGetUserInfo(res.code);
              }
          },
      })
    },
    async tgetUserInfo(){
      let lists = await network.getUserinfo()
      if(lists.code===20000){
        await wx.setStorageSync('userInfo',lists.data)
        let url = '/pages/switchComp/main'
        await wx.navigateTo({url})
      }else{
        this.toast(lists.message)
      }
    },
    // 获取微信信息
    async wxGetUserInfo (code) {
      let that=this
      that.code=code
        wx.getUserInfo({
            withCredentials: true,
            success (res) {
              that.buttonVisible = false;
              that.userInfo=res.userInfo
                let { encryptedData,userInfo,iv } = res;
                let datas={
                    code:that.code,
                    encryptedData,
                    iv
                }
                network.wxlogin(datas).then(reset =>{
                    if (reset.code==20000) {
                        that.againShow=false
                        if(!reset.data.user.username){
                            that.bindShow=true
                        }else{
                            that.tgetUserInfo()
                        }
                    }else{
                        wx.showToast({
                            title: reset.message,
                            icon: 'none',
                            duration: 5000
                        })
                    }

                }).catch(err => {
                    that.toast(err.code)
                    that.againShow=true
                    console.log(`自动请求api失败 errgetUserInfo:`,err);
                })

            },
            fail (err) {
                console.log('自动wx.getUserInfo失败:',err);
                // 显示主动授权的button
                that.buttonVisible = true;
                that.againShow = false;
            }
        })
    },
    bindGetUserInfo(e) {
        // console.log('回调事件后触发')
        const self = this;
        if (e.mp.detail.userInfo) {
          self.userInfo=e.mp.detail.userInfo
            self.buttonVisible=false
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.login({
                success (result) {
                    if (result.code){
                        self.code = result.code;
                        self.wxGetUserInfo(result.code);
                        // let { encryptedData,userInfo,iv } = e.mp.detail;
                        // network.wxlogin({
                        //   code:self.code,
                        //   encryptedData,
                        //   iv
                        // })
                        // .then(res =>{
                        //     if(!res.data.user.username){
                        //         self.bindShow=true
                        //     }else{
                        //         self.tgetUserInfo()
                        //     }
                        // })
                        // .catch(err => {
                        //   self.toast(err.message)
                        //   console.log(`自动请求api失败 err:wxlogin`,err);
                        // })
                    }
                },
            })
        } else {
            //用户按了拒绝按钮
            // console.log('用户按了拒绝按钮')
            console.log('用户按了拒绝按钮')
        }
    },
    phoneBlur(){
      if(this.phone){
        this.bcolor=true
      }else{
        this.bcolor=false
      }
      if(this.phone&&this.smsCode){
        this.btnco=true
      }else{
        this.btnco=false
      }
    },
    smsBlur(){
      if(this.phone&&this.smsCode){
        this.btnco=true
      }else{
        this.btnco=false
      }
    },
    async getMsm(){
      if(this.phone){
        await network.getMsm({
          mobile:this.phone
        }).then(res =>{
          if(res.code===20000){
            this.setime=true
            let _this = this;
            this.seconds = 59;
            let secTimer = setInterval(function() {
              _this.seconds--;
              if (_this.seconds == 0) {
                _this.setime=false
                clearInterval(secTimer);
              }
            }, 1000);
          }else{
            this.toast(res.message)
          }
        })

      }

    },
    toast(title){
        wx.showToast({
            title: title,
            icon: 'none',
            duration: 2000
        })
    },

  },
}
</script>
<style >
page{
  background:linear-gradient(49deg,rgba(0,120,226,1) 0%,rgba(43,210,179,1) 100%);
}
</style>
<style>
.connent{
    position:absolute;
    top:96px;
    z-index:11;
    padding: 0 51px 0 48px;
}
.logo{
  width: 60px;
  height: 60px;
  margin-top: 6px;
}
.logo>img{
  width: 100%;
  height: 100%;
}
.title{
  margin-top: 25px;
  color: #fff;
  font-size: 20px;
  font-family:SourceHanSansCN-Normal;
  letter-spacing:1px;
}
.title>p:first-child{
  font-weight: 400;
}
.title>p:last-child{
  font-weight: 500;
}
.title>span{
  margin-top: 100px;
}
.section{
    margin-top: 39px;
}
.section input{
  width:256px;
  height:44px;
  background:rgba(236,238,242,0.2);
  border-radius:22px;
  margin-bottom: 30px;
  color: #fff;
  font-size: 16px;
}
.sms{
  position: relative;
}
.sms>span{
  position: absolute;
  width:114px;
  height:44px;
  background:rgba(209,212,219,1);
  border-radius:22px;
  display: inline-block;
  font-size:16px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(163,163,163,1);
  text-align: center;
  line-height: 44px;
  top: 0;
  right: 0;
  z-index: 666;
}
.sms .bco{
  background:rgba(0,131,247,1);
  color: #fff;
}
.btn{
  width:276px;
  height:44px;
  background:rgba(209,212,219,1);
  border-radius:22px;
  font-size:16px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(163,163,163,1);
  text-align: center;
  line-height: 44px;
  display: inline-block;
}
.btnco{
  background:rgba(0,131,247,1);
  color: #fff;
}
.btmLogo{
  width: 196px;
  height: 235px;
  position: absolute;
  bottom: 0;
  right: 0 ;
}
.btmLogo>img{
  width: 100%;
  height: 100%;
}
.btmTitle{
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  font-size:12px;
  font-family:SourceHanSansCN-Normal;
  font-weight:400;
  color:rgba(255,255,255,1);
  letter-spacing:1px;
}
.getBtn{
  width:276px;
  height:44px;
  background:rgba(0,131,247,1);
  border-radius:22px;
  font-size:16px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(255,255,255,1);
  text-align: center;
  line-height: 44px;
  margin-top:296px;
  position:inherit;
}

</style>
