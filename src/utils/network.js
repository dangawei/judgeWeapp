import axios from 'axios'
import qs from 'qs'
let wxapi = 'nodeforwx/cross/to/java'
,baseApi='https://wxapi.moocollege.com/'
// ,baseApi='http://121.40.206.170:8658/'
// ,baseApi='http://192.168.2.44:7001/'
// ,baseApi='http://192.168.2.231:7001/'
// let baseApi='http://192.168.3.85:9090/'
// 时间戳
const NewTimeStamp = new Date().getTime();

axios.defaults.timeout = 30000;
axios.defaults.adapter = function (config) {

    // config.data=JSON.parse(config.data)
  return new Promise((resolve, reject) => {
    let data = config.method === 'post' ? config.data : qs.stringify(config.params)
    // wx小程序 发起请求相应 log 就可以看到熟悉的返回啦
    wx.request({
        url:baseApi+config.url,
        method:config.method,
        header:config.headers,
        data:data,
        success:(res)=>{
            resolve(res)
        },
        fail:(err)=>{reject(err)}
    })
  })
}
// axios.defaults.headers[ 'Content-Type' ] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.adapter = function (config) {
//   return new Promise((resolve, reject) => {
//     // let data = config.method === 'post' ? config.data : qs.stringify(config.params)
//     let data = config.method === 'post' ? config.data : config.params
//     // wx小程序 发起请求相应 log 就可以看到熟悉的返回啦
//     if(config.url!='nodeforwx/cross/to/java'){
//         wxapi=config.url
//     }
//     // if (config.url=="nodeforwx/wxloginJ"||config.url=="nodeforwx/get/msm"||config.url=="nodeforwx/bind/phone"||config.url=="nodeforwx/user/getinfo") {
//     //     wxapi=config.url
//     // }else{
//     //     wxapi = 'nodeforwx/cross/to/java'
//     // }
//     wx.request({
//         // url:baseApi+config.url,
//         url:baseApi+wxapi,
//         method:"POST",
//         header:config.headers,
//         data:data,
//         success:(res)=>{
//             return resolve(res)
//         },
//         fail:(err)=>{
//             console.log(112)
//             return reject(err)
//         }
//     })
//   })
// }
//axios.defaults.withCredentials = true
// axios 拦截器
function Instance () {
  //请求拦截器
  axios.interceptors.request.use(function ( request ) {
    request.headers['cookie'] = wx.getStorageSync('cookie')
    return request
  }, function ( error ) {
    return Promise.reject(error);
  });

  // 添加响应拦截器
 axios.interceptors.response.use(function ( response ) {

    let _cookie = response.header['Set-Cookie'] || response.header['set-cookie']
    wx.hideLoading();
    if(_cookie){
      wx.setStorageSync('cookie',_cookie)
    }
    return response.data;
  }, function ( error ) {
    return Promise.reject(error);
  });
}

Instance()


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
function postLogin (url,params) {
  return axios({
    method:'post',
    url:url,
    data:params
  })
}
function getLogin (url,params) {
  return axios({
    method:'get',
    url:url,
    params:params
  })
}

export default{
    get,post,postLogin,getLogin
}
