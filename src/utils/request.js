import axios from "axios";
import { getToken,getUserName } from "./cookies";

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
    return Promise.reject(errorData)
})

export default service;