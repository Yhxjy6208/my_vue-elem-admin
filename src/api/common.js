import service from "@/utils/request";

export function GetCode(data) {
    return service.request({
        method: "post",
        url: "/getCode/",
        data
    })
}

export function ErrorHttp(data) {
    return service.request({
        method: "post",
        url: "/news/detailed/",
        data
    })
}

export function UploadFile(data) {
    return service.request({
        method: "post",
        url: "/upload",
        data
    })
}

export function TableData(data={}) {
    return service.request({
        method: data.method,
        url: data.url,
        data:data.data
    })
}

export function SwitchSatus(data={}) {
    return service.request({
        method: data.method,
        url: data.url,
        data:data.data
    })
}

export function getDate(params){
    const new_date = params.value?new Date(params.value):new Date()
    //获取数据
    let year = new_date.getFullYear()
    let month = new_date.getMonth()
    let day = new_date.getDay()
    let hh = new_date.getHours()
    let mm = new_date.getMinutes()
    let ss = new_date.getSeconds()
    //不满两位数的全部变成0+个位
    if(month<10){month=`0${month}`}
    if(day<10){day=`0${day}`}
    if(hh<10){day=`0${hh}`}
    if(mm<10){day=`0${mm}`}
    if(ss<10){day=`0${ss}`}
    const conn = params.conn || "-" //连接符 用来连接年月日的
    const br = params.br ? "<br />":" " // 格式化 用来连接年月日和时分秒的
    const date = `${year}${conn}${month}${conn}${day}`
    const time = `${hh}:${mm}:${ss}`
    if (params.type=="date"){
        return date
    }
    if(params.type=="time"){
        return time
    }
    return `${date}${br}${time}`
}
// export function Register(data) {
//     return service.request({
//         method: "post",
//         url: "/register/",
//         data
//     })
// }

// export function Login(data = {}) {
//     return service.request({
//         method: "post",
//         url: "/login/",
//         data
//     })
// }