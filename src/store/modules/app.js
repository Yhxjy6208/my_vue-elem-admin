import { Login } from "@/api/account"

const state = { 
    count:100,
    text:"Vue+Element+js"
}//存储
const getters = {
    getCount:(state)=>{
        return state.count+10
    },
    getText:(state)=>{
        return "我正在努力"+state.text
    }
}//获取state对象数据
const mutations = {
    SET_COUNT(state){
        state.count = 10
    },
    SET_TEXT(state,payload){
        state.text = payload
    }
}//更新
const actions = {
    update_count(context){
        context.commit("SET_COUNT")
    },
    update_text({commit,state,getters,dispatch},payload){
        commit("SET_TEXT",payload)
    },
    loadAction(context,requesData){
        return new Promise((resolve,reject)=>{
            Login(requesData).then((response)=>{
                resolve(response)
            }).catch(error=>{
                reject(error)
            })
        })
    }
}//更新，通过其他的store对象进行更新

export default({
  namespaced:true,//限定在命令模块间
  state,
  getters,
  mutations,
  actions,
});