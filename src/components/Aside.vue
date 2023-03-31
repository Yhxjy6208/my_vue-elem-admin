<template> 
    <h1 class="logo"><img :src="logo" alt="nice to meet you"></h1>
    <el-menu :default-active="currentPath" background-color="#344a5f" text-color="#fff"
        active-text-color="#ffffff" router
    >
        <template v-for="item in routers" :key="item.path">
            <template v-if="!item.hidden">
                <!-- 一级菜单 -->
                <template v-if="hasOnlyChild(item.children)">
                    <el-menu-item v-if="item.children" :index="item.children[0].path">
                        <svg-icon :icon-name="item.meta && item.meta.icon" class-name="aside-menu-svg"></svg-icon>
                        <template #title>{{item.children[0].meta && item.children[0].meta.title}}</template>
                    </el-menu-item>
                </template>
                    <!-- 子级菜单 -->
                <template v-else>
                    <el-sub-menu v-if="item.children && item.children.length>0" :index="item.path">
                            <template #title><svg-icon :icon-name="item.meta && item.meta.icon" class-name="aside-menu-svg"></svg-icon>{{item.meta && item.meta.title}}</template>
                            <template v-for="child in item.children">
                            <el-menu-item v-if="!child.hidden" :index="child.path">
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
    import { useRouter,useRoute } from 'vue-router';
    import { computed,toRefs,reactive } from 'vue';
    export default{
        setup(){
            const data = reactive({
                logo:require('@/assets/gsx.png')
            });
            const { options } = useRouter();
            const routers = options.routes;
            const {path} = useRoute()
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
            const currentPath = computed(()=>path)
            return{
                routers,
                hasOnlyChild,
                currentPath,
                ...toRefs(data)
            }
        }
    }

</script>
<style lang="scss" scoped>
    .logo{
        width: 200px;
        padding: 20px 0;
        padding-bottom: 1px solid #2d4153;
        img {margin: auto;}
    }
</style>