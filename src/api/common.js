import service from "@/utils/request";

export function GetCode(data) {
    return service.request({
        method: "post",
        url: "/getCode/",
        data
    })
}