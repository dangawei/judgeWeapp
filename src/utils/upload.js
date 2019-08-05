import network from '../api/index'
async function upLoad (imgPath,successc, failc){
    let that = this;
    let imgType=''
    if(imgPath.indexOf(".png")>-1){
        imgType=".png"
    }else if(imgPath.indexOf(".jpg")>-1){
        imgType=".jpg"
    }
    let data = await network.getOssUploadPolicy()
    if(data.code===20000){
      let ossData=data.data
      let aliyunServerURL='https://wxfile.moocollege.com' + '/'
      // let aliyunFileKey='wx/rz/'+ new Date().getTime() + Math.floor(Math.random() * 150) + '.png'
      let aliyunFileKey='wx/rz/'+ new Date().getTime() + Math.floor(Math.random() * 150)+imgType
      //上传文件
      wx.uploadFile({
        url: aliyunServerURL, // 开发者服务器 url
        filePath: imgPath, // 要上传文件资源的路径
        name: 'file', // 必须填file
        formData: {
            'key': aliyunFileKey,
            'policy': ossData.policy,
            'OSSAccessKeyId': ossData.OSSAccessKeyId,
            'signature': ossData.signature,
            'success_action_status': '200',
            'x-oss-security-token':ossData.token
        },
        success: function (res) {
            if (res.statusCode !== 200) {
              failc(new Error('上传错误:' + JSON.stringify(res)))
                return
            }
            successc(aliyunServerURL  + aliyunFileKey)

            // successc(aliyunServerURL + aliyunFileKey)
        },
        fail: function (err) {
          err.wxaddinfo = aliyunServerURL
            failc(err)
        }
      })
    }else{
      return
    }


  }
  export default {
    upLoad
  }
