import network from '../utils/network'
// import java from '../utils/crossJava'
export default {
    intro:params=>(network.post('competition/intro',params)), //信息
    news:params=>(network.post('competition/news',params)), //竞赛动态
    newsDetail:params=>(network.post('competition/news/detail',params)), //竞赛动态
    info:params=>(network.post('competition/info',params)), //指南
    from:params=>(network.post('login',params)), //登录

    groupMenbers:params=>(network.post('competition/groupMenbers',params)), //团队成员
    passMenbers:params=>(network.post('competition/passMenbers',params)), //审核
    listSignupCompetition:params=>(network.post('competition/listSignupCompetition',params)), //赛项
    competitionChild:params=>(network.post('competition/competitionChild',params)), //赛项分赛
    getGroup:params=>(network.post('competition/getGroup',params)), //团队列表
    sginup:params=>(network.post('competition/sginup',params)), //竞赛报名提交
    getUserinfo:params=>(network.postLogin('nodeforwx/user/getinfo',params)), //获取个人信息
    setUserinfo:params=>(network.post('user/setinfo',params)), //提交个人信息
    bindingWechat:params=>(network.postLogin('nodeforwx/user/bindingWechat',params)), //绑定微信帐号
    bindPhone:params=>(network.postLogin('nodeforwx/bind/phone',params)), //绑定手机号
    getMsm:params=>(network.postLogin('nodeforwx/get/msm',params)), //获取短信验证码
    //微信登录
    wxlogin:params=>{
        // console.log(params)
        return network.postLogin('nodeforwx/wxloginJ',params)
    },
    //获取oss签名
    getOssUploadPolicy:params=>{
        let data={}
        return network.postLogin('nodeforwx/common/wxupload/getOssUploadPolicy',null)
    },
    // 获取竞赛列表
    getCompetitionList:params=>(network.get('usercenter/user/getSpecialistCompetition',params)),
    // 获取赛项列表
    getCompChildrenList:params=>(network.get('web/competition/childsReviewCompetition',params)),
    // 获取赛项规则
    getPattern:params=>(network.get('web/review/rule/get',params)),
    // 获取赛项作品列表
    getWorksList:params=>(network.post('web/resource/getPoolList',params)),
    // 搜索作品id编号
    searchWorksId:params=>(network.post('web/resource/getPoolIds',params)),
    // 获取作品详情
    getWorksDetail:params=>{
        let data={}
        if(params.rowId){
            data.rowId=params.rowId
        }
        return network.get('web/resource/pool/'+params.id,data)
    },
    // 获取已评审分数
    getScores:params=>{
        return network.post('web/review/expert/get',params)
    },
    // 提交已评审分数
    submitScore:params=>{
        return network.post('web/review/expert/submit',params)
    },
    // 上传评分表
    loadTable:params=>{
        // console.log("上传")
        return network.post('web/resource/pool/signNameExpertExcel',params)
    },
}
