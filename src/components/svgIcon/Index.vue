<template>
    <!-- <svg class="svg-class" aria-hidden="true">
        <use xlink:href="#icon-home"></use>
    </svg> -->
    <svg class="svg-class" :class="svgClassName" aria-hidden="true">
        <use :xlink:href="svgIcon"></use>
    </svg>
</template>

<script>
import {ref,computed} from "vue";
export default{
    name:"SvgIcon",
    props:{
        iconName:{
            type:String,
            defalt:""
        },
        className:{
            type:String,
            defalt:""
        }
    },
    setup(props){
        const svgClassName = ref(props.className)
        const svgIcon = computed(()=>`#icon-${props.iconName}`)
        return {svgClassName,svgIcon}
    }
}
</script>
<style>
    .svg-class{
        width: 1em;
        height: 1em;
        fill: currentColor;
    }
</style>