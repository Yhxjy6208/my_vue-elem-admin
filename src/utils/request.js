import axios from "axios";

const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 5000,
})

service.interceptors.request.use(function(config) {
    return config
}, function(error) {
    console.log(111)
    return Promise.reject(error)
})

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