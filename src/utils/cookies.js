import Cookies from "js-cookie";


const tokenKey = "tokenAdmin" 
const userNameKey = "username"
// 获取token值
export function getToken(){return Cookies.get(tokenKey)}
// 设置token值
export function setToken(value){ Cookies.set(tokenKey,value) }
// 删除token
export function delToken(){ Cookies.remove(tokenKey) }

export function setUserName(value){ Cookies.set(userNameKey,value)}

export function getUserName(){return Cookies.get(userNameKey)}

export function delUserName(){ Cookies.remove(userNameKey) }