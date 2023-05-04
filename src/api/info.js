import service from "@/utils/request";

//添加父级分类
export function firstCategory_add(data) {
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    })
}

//获取分类
export function GetCategory(data) {
    return service.request({
        method: "post",
        url: "/news/getCategoryAll/",
        data
    })
}

//添加子级分类
export function ChildrenCategory_add(data) {
    return service.request({
        method: "post",
        url: "/news/addChildrenCategory/",
        data
    })
}

//编辑分类
export function CategoryEdit(data) {
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
    })
}

//删除分类
export function CategoryDel(data) {
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    })
}

//添加信息
export function InfoCreate(data) {
    return service.request({
        method: "post",
        url: "/news/add/",
        data
    })
}