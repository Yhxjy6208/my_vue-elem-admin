<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view />
  <el-button type="success">主要按钮</el-button> -->
  <el-config-provider :locale="locale"/>
  <router-view />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
import  zhCn from 'element-plus/lib/locale/lang/zh-cn';

export default{
  name:"App",
  setup(){
    let locale = zhCn
    return {locale}
  }
}
// import Login from './views/account/Login.vue';
</script>