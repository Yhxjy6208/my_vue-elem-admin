<template>
    <div id="login">
        <div class="from-warp">
              <ul class="manu-tab">
                <!-- :class == v-bind -->
                <!-- @click="current_menu=item.type"   登录注册切换--> 
                    <li @click="toggleMenu(item.type)" :class="{'current':current_menu===item.type}" v-for="item in tab_menu" :key="item.type">{{ item.label }}</li>
                    <el-form ref="from" :model="form" :rules="form_rules">
                        <el-form-item prop="username">
                            <label class="from-label">邮箱</label>
                            <el-input v-model.trim="form.username"/>
                        </el-form-item>
                        <el-form-item prop="password">
                            <label class="from-label">密码</label>
                            <el-input type="password" v-model.trim="form.password"/>
                        </el-form-item>
                        <el-form-item v-if="current_menu==='register'" prop="passwords">
                            <label class="from-label">确认密码</label>
                            <el-input type="password" v-model.trim="form.passwords"/>
                        </el-form-item>
                        <el-form-item>
                            <label class="from-label">验证码</label>
                            <el-row :gutter="10">
                                <el-col :span="14">
                                    <el-input v-model.trim="form.code"></el-input>
                                </el-col>
                                <el-col :span="10">
                                    <el-button @click="getCode" type="success" class="el-button-block">获取验证码</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" class="el-button-block" disabled>{{ current_menu==='register'?"注册" :"登录"}}</el-button>
                         </el-form-item>
                    </el-form>
              </ul>
        </div>
    </div>
</template>
<style lang="scss" scoped>//scoped 全局只能在这使用
    #login{
        height: 100vh;
        background-color: #344a5f;
    }
    .from-warp{
        width: 320px;
        padding-top: 100px;
        margin: auto;
    }
    .manu-tab{
        text-align: center;
        li{
            display: inline-block;
            padding: 10px 24px;
            margin: 0 10px;
            color: #fff;
            font-size: 14px;
            border-radius: 5px;
            cursor: pointer;
            &.current{
                background-color: rgba(0,0,0,.1);
            }
        }
    }
    .from-label{
        display: block;
        color: #fff;
        font-size: 14px;
    }
</style>
<script>
import { reactive,toRefs,getCurrentInstance } from 'vue';
import { validate_email,validate_password,validate_code } from '../../utils/validate';
import { GetCode } from '../../api/common';
export default{
    setup(props,{root}){
        const validata_username_rules = (rele,value,callback) => {
            let reg_email = validate_email(value); 
            if(value===""){
                callback(new Error("请输入邮箱"))
            }else if(!reg_email){
                callback(new Error("请输入正确的邮箱格式"))
            }else{
                callback()
            }
        }
        const validata_password_rules=(rule,value,callback) => {
            let reg_password = validate_password(value);
            if(value===""){
                callback(new Error("请输入密码"))
            }else if(!reg_password){
                callback(new Error("请输入6-20位的密码,包含数字、字母"))
            }else{
                callback()
            }
        }
        const validata_passwords_rules=(rule,value,callback) => {
            let reg_password = validate_password(value);
            const passwordValues = data.form.password;
            if(value===""){
                callback(new Error("请输入密码"))
            }else if(!reg_password){
                callback(new Error("请输入6-20位的密码,包含数字、字母"))
            }else if(passwordValues && passwordValues !== value){
                callback(new Error("两次密码不一致"))
            }
            else{
                callback()
            }
        }
        const data = reactive({
            form:{
                username:"",
                password:"",
                passwords:"",
                code:"",
            },
            tab_menu:
            [
                {type:"login",label:"登录"},
                {type:"register",label:"注册"}
            ],
            form_rules:{
                username:[{validator:validata_username_rules,trigger:'change'}],
                password:[{validator:validata_password_rules,trigger:'change'}],
                passwords:[{validator:validata_passwords_rules,trigger:'change'}]
            },
            // form_rules:{
            //     username:[
            //         {required:true,message:'请输入用户名',tigger:'change'},
            //         {min:3,max:5,message:'长度在3和5之间',tigger:'change'}
            //     ],

            // },
            current_menu:"login"
        })
        
        const toggleMenu = ((type)=>{
            data.current_menu = type
        })
        // const {proxy} = getCurrentInstance()
        const getCode=()=>{
            // proxy.$axios.post("http://v3.web-jshtml.cn/api/getCode/",
            // {username:data.form.username,module:"register"})
            // const username = data.form.username;
            // const password = data.form.password;
            // const passwords = data.form.passwords;
            // if(!validate_email(username)){
            //     proxy.$message({
            //         message:"用户名不能为空",
            //         type:"error"
            //     })
            //     return false
            // }
            const data_post = {username:data.form.username,module:"register"}
            GetCode(data_post).then(response=>{
                console.log(response)
            }).catch(error=>{})

        }
        return{
            toggleMenu,...toRefs(data),getCode
        }
    }
}
    
</script>