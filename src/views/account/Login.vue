<template>
    <div id="login">
        <div class="from-warp">
              <ul class="manu-tab">
                <!-- :class == v-bind -->
                <!-- @click="current_menu=item.type"   登录注册切换--> 
                    <li @click="toggleMenu(item.type)" :class="{'current':current_menu===item.type}" v-for="item in tab_menu" :key="item.type">{{ item.label }}</li>
                    <el-form ref="account_from" :model="form" :rules="form_rules">
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
                        <el-form-item prop="code">
                            <label class="from-label">验证码</label>
                            <el-row :gutter="10">
                                <el-col :span="14">
                                    <el-input v-model.trim="form.code"></el-input>
                                </el-col>
                                <el-col :span="10">
                                    <!-- :loading="true"  加载状态 -->
                                    <el-button :loading="code_button_loading" :disabled="code_button_disable" @click="getCode" type="success" class="el-button-block">{{code_button_text}}</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="zz" type="danger" class="el-button-block" :disabled="data_submit_button" :loading="data_submit_button_loading">{{ current_menu==='register'?"注册" :"登录"}}</el-button>
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
import { reactive,toRefs,onBeforeUnmount,getCurrentInstance } from 'vue';
import { validate_email,validate_password,validate_code } from '../../utils/validate';
import { GetCode } from '../../api/common';
import { Login,Register} from "../../api/account";
import sha1 from 'js-sha1';
import {useStore} from 'vuex';
// import { response } from 'express';
export default{
    setup(props,{root}){
        const {proxy} = getCurrentInstance()
        const store = useStore();
        const submitForm = ()=>{
            proxy.$refs.account_from.validate((valid)=>{
                if(valid){
                    // data.current_menu==="login"?login():register();
                    return true
                }else{
                    alert('表单校验不通过');
                    return false;
                }
            })
        }
        const zz = ()=>{
            if(submitForm && data.current_menu==="login"){
                login()
            }else if(submitForm && data.current_menu==="register"){
                register()
            }
        }
        const login = ()=>{
            const data_post = {
                username:data.form.username,
                password:sha1(data.form.password),
                code:data.form.code
            }
            data.data_submit_button_loading = true;
            store.dispatch("app/loadAction",data_post).then(response=>{
                // Login(data_post).then(response=>{
                ElMessage.success({
                    message:response.message
                })
                reset()
            }).catch(error=>{
                data.data_submit_button_loading = false;
            })
        }
        const reset = ()=>{
            proxy.$refs.form.resetFields()//四个input全部重置
            data.current_menu="login"//返回登录状态
            data.code_button_timer && clearInterval(data.code_button_timer)
            data.code_button_text = "获取验证码"
            data.code_button_disable = false
            data.data_submit_button = true
            data_submit_button_loading = false
        }
        const register = ()=>{
            const data_post = {
                username:data.form.username,
                password:sha1(data.form.password),
                code:data.form.code
            }
            data.data_submit_button_loading = true;
            Register(data_post).then(response=>{
                ElMessage.success({
                    message:response.message
                })
                reset()
            }).catch(error=>{
                data.data_submit_button_loading = false;
            })
        }
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
            if(data.current_menu==='login'){callback()}
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
        const validata_code_rules=(rule,value,callback) => {
            let reg_code = validate_code(value);
            if(value===""){
                callback(new Error("请输入验证码"))
            }else if(!reg_code){
                callback(new Error("请输入正确的验证码格式"))
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
                passwords:[{validator:validata_passwords_rules,trigger:'change'}],
                code:[{validator:validata_code_rules,trigger:'change'}]
            },
            // form_rules:{
            //     username:[
            //         {required:true,message:'请输入用户名',tigger:'change'},
            //         {min:3,max:5,message:'长度在3和5之间',tigger:'change'}
            //     ],

            // },
            current_menu:"login",
            code_button_loading:false,//true才是阻拦
            code_button_disable:false,//true才是阻拦
            code_button_text:"获取验证码",
            code_button_timer:null,
            data_submit_button:true,
            data_submit_button_loading:false
        })
        
        const toggleMenu = ((type)=>{
            data.current_menu = type
        })
        // 做定时器
        const count_down= (time) =>{
            let second = time || 60;
            data.code_button_loading = false;
            data.code_button_disable = true;
            data.code_button_text = `倒计时${second}秒`;
            if (data.code_button_timer){clearInterval(data.code_button_timer)}
            data.code_button_timer =setInterval(()=>{
                second--
                data.code_button_text = `倒计时${second}秒`
                if(second<=0){
                    data.code_button_text="重新获取"
                    data.code_button_disable=false
                    clearInterval(data.code_button_timer)
                }
            },1000);
        }
        //在用户离开界面 生命周期
        onBeforeUnmount(()=>{
            clearInterval(data.code_button_timer)
        })
        // const {proxy} = getCurrentInstance()
        const getCode=()=>{
            // proxy.$axios.post("http://v3.web-jshtml.cn/api/getCode/",
            // {username:data.form.username,module:"register"})
            const username = data.form.username;
            const password = data.form.password;
            const passwords = data.form.passwords;
            if(!validate_email(username)){
                ElMessage.error({
                    message:"用户名不能为空 或 格式不正确",
                    // duration:0
                })
                return false
            }
            if(!validate_password(password)){
                ElMessage.error({
                    message:"密码不能为空 或 格式不正确",
                })
                return false
            }
            if(data.current_menu=="register"&&(password !== passwords)){
                ElMessage.error({
                    message:"两次密码不一致"
                })
                return false
            }
            data.code_button_loading = true
            data.code_button_text = "发送中"
            const data_post = {username:data.form.username,module:data.current_menu==="login"?"login":"register"}
            // ErrorHttp(data_post).then(response=>{
            //     console.log(response)
            // }).catch(error=>{
            //     console.log(error)
            // })
            GetCode(data_post).then(response=>{
                if (response.resCode===1024){
                    ElMessage.error({
                        message:response.message
                    })
                    data.code_button_loading = false
                    data.code_button_text = "获取验证码"

                }
                ElMessage.success({
                    message:response.message,
                })
                count_down()  
                data.data_submit_button = false
            }).catch(error=>{
                data.code_button_loading = false
                data.code_button_text = "再次获取"
            })

        }
        return{
            toggleMenu,...toRefs(data),getCode,submitForm,zz
        }
    }
}
    
</script>