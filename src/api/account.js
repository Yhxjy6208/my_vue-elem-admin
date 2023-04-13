import service from "@/utils/request";
export function Login(data = {}) {
    return service.request({
        method: "post",
        url: "/login/",
        data
    })
}

export function Register(data = {}) {
    return service.request({
        method: "post",
        url: "/register/",
        data
    })
}

export function Check(data = {}) {
    return service.request({
        method: "post",
        url: "/account/check",
        data
    })
}

export function Logout(data = {}) {
    return service.request({
        method: "post",
        url: "/logout/",
        data
    })
}
