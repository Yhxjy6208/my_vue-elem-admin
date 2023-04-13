import axios from "axios";
import { getToken,getUserName,delToken,delUserName } from "./cookies";
import router from "@/router";


const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 5000,
})

//请求前
service.interceptors.request.use(function(config) {
    if (getToken()){
        config.headers['Token'] = getToken()
    }
    if (getUserName()){
        config.headers['Username'] = getUserName()
    }
    
    return config
}, function(error) {
    console.log(111)
    return Promise.reject(error)
})

//请求后
service.interceptors.response.use(function(response) {
    const data = response.data;
    if (data.resCode === 0) {
        return Promise.resolve(data)
    } else {
        ElMessage.error({
            message: data.message
        })
        return Promise.reject(data)
    }
}, function(error) {
    const errorData = JSON.parse(error.request.response)
    if (errorData.message) {
        ElMessage.error({
            message: errorData.message
        })
    }
    if (errorData.resCode==1010){
        router.replace({
            name:"Login"
        })
        delToken()
        delUserName()
    }
    return Promise.reject(errorData)
})

export default service;