<template>
    <el-menu default-active="4" background-color="#344a5f" text-color="#fff"
        active-text-color="#ffd04b" router
    >
        <template v-for="item in routers" :key="item.path">
            <template v-if="!item.hidden">
                <!-- 一级菜单 -->
                <template v-if="hasOnlyChild(item.children)">
                    <el-menu-item v-if="item.children" :index="item.children[0].path">
                        <template #title>{{item.children[0].meta && item.children[0].meta.title}}</template>
                    </el-menu-item>
                </template>
                    <!-- 子级菜单 -->
                <template v-else>
                    <el-sub-menu v-if="item.children && item.children.length>0" :index="item.path">
                            <template #title>{{item.meta && item.meta.title}}</template>
                            <template v-for="child in item.children">
                            <el-menu-item v-if="!child.hidden" :index="item.path">
                                {{child.meta && child.meta.title}}
                            </el-menu-item>
                            </template>
                    </el-sub-menu>
                </template>
            </template>
        </template>
    </el-menu>
</template>
<script>
    import { useRouter } from 'vue-router';
    export default{
        setup(){
            const { options } = useRouter();
            const routers = options.routes;
            const hasOnlyChild = (children)=>{
                if(!children){
                    return false
                }
                const childRouter = children.filter(item=>{
                    return item.hidden? false:true;
                })
                if (childRouter.length===1){
                    return true
                }
                return false
            }
            return{
                routers,
                hasOnlyChild
            }
        }
    }

</script>