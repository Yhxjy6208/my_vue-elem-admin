<template>
  <parent-commet @my-event=""></parent-commet>
  <div class="about" style="position:relative;">
  <h1>我是测试111</h1>
  </div>
  <teleport to="h1">
  <div class="zz">我要去哪里</div>
  </teleport>
  </template>
  <script>
  export default{
    name:"demo",
    emits:["myEvent"],
    setup(props,{emits}){
      emits("myEvent")
    }
  }
</script>