<template>
    <div id="login">
        <div class="from-warp">
              <ul class="manu-tab">
                <!-- :class == v-bind -->
                <!-- @click="current_menu=item.type"   登录注册切换--> 
                    <li @click="toggleMenu(item.type)" :class="{'current':current_menu===item.type}" v-for="item in tab_menu" :key="item.type">{{ item.label }}</li>
                    <el-form ref="from">
                        <el-form-item>
                            <label class="from-label">用户名</label>
                            <el-input v-model.trim="username"/>
                        </el-form-item>
                        <el-form-item>
                            <label class="from-label">密码</label>
                            <el-input type="password" v-model.trim="password"/>
                        </el-form-item>
                        <el-form-item v-if="current_menu==='register'">
                            <label class="from-label">确认密码</label>
                            <el-input type="password" v-model.trim="passwords"/>
                        </el-form-item>
                        <el-form-item>
                            <label class="from-label">验证码</label>
                            <el-row :gutter="10">
                                <el-col :span="14">
                                    <el-input v-model.trim="code"></el-input>
                                </el-col>
                                <el-col :span="10">
                                    <el-button type="success" class="el-button-block">获取验证码</el-button>
                                </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" class="el-button-block" disabled>登录</el-button>
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
import { reactive,toRefs } from 'vue';
export default{
    setup(props,{root}){
        const data = reactive({
            username:"",
            password:"",
            passwords:"",
            code:"",
            tab_menu:
            [
                {type:"login",label:"登录"},
                {type:"register",label:"注册"}
            ],current_menu:"login"
        })
        const toggleMenu = ((type)=>{
            data.current_menu = type
        })
        return{
            toggleMenu,...toRefs(data)
        }
    }
}
    
</script>