import axios from 'axios'
import qs from 'qs'
let wxapi = 'nodeforwx/cross/to/java'
// ,baseApi='http://121.40.206.170:8658/'
,baseApi='http://192.168.2.44:7001/'
// ,baseApi='http://192.168.2.231:7001/'
// 时间戳
const NewTimeStamp = new Date().getTime();

axios.defaults.timeout = 30000;
// axios.defaults.adapter = function (config) {
//   return new Promise((resolve, reject) => {
//     // console.log(config,'adapter')
//     let data = config.method === 'post' ? config.data : qs.stringify(config.params)
//     // wx小程序 发起请求相应 log 就可以看到熟悉的返回啦
//     wx.request({
//         url:baseApi+config.url,
//         method:config.method,
//         header:config.headers,
//         data:data,
//         success:(res)=>{
//             return resolve(res)
//         },
//         fail:(err)=>{return reject(err)}
//     })
//   })
// }
//axios.defaults.withCredentials = true
// axios 拦截器
// function Instance () {
//   //请求拦截器
//   axios.interceptors.request.use(function ( request ) {
//     // request.headers.token = 'token=11124654654687';
//     // console.log(request) //请求成功
//     request.headers['cookie'] = wx.getStorageSync('cookie')
//     return request
//   }, function ( error ) {
//     // console.log(error); //请求失败
//     return Promise.reject(error);
//   });
//
//   // 添加响应拦截器
//   axios.interceptors.response.use(function ( response ) {
//     //console.log(response.data.data) //响应成功
//     //if(!wx.getStorageSync(cookie))
//     let _cookie = response.header['Set-Cookie'] || response.header['set-cookie']
//     wx.hideLoading();
//     if(_cookie){
//       wx.setStorageSync('cookie',_cookie)
//     }
//     console.log("crossJava2")
//     console.log(response)
//     return response.data;
//   }, function ( error ) {
//     // console.log(error); //响应失败
//     return Promise.reject(error);
//   });
// }

// Instance()

function get (url,params) {
  params.nodeParams={
    method:'get',
    javaUrl:url
  }
  return axios({
    method:'post',
    url:wxapi,
    data:params
  })
}
function post (url,params) {
  params.nodeParams={
    method:'post',
    javaUrl:url
  }
  return axios({
    method:'post',
    url:wxapi,
    data:params
  })
}

export default{
    get,post
}
