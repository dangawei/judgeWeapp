export function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export function getBarHeight(){
  let height=''
  wx.getSystemInfo({
    success: (res) => {
        height=res.statusBarHeight
    }
  })
  return height
}

export function getSysInfo(){
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
    // console.log("标题栏高度"+titleHeight)
    return sysInfos
}
// 判断滑动事件
export function getTouchData(endX, endY, startX, startY){
    let turn = "";
    if (endX - startX > 50 && Math.abs(endY - startY) < 50) {      //右滑
        turn = "right";
    } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) {   //左滑
        turn = "left";
    }
    return turn;
}
