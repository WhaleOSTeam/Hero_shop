<template>
  <!-- 登录 注册 购物车... -->
  <div class="container-fluid">
    <div class="col-md-4">
      <img src="../../static/img/public/log.jpg"  style="width:198px;height:57px;"/>
    </div>
    <div class="col-md-5">
      <img src="../../static/img/header.png" />
    </div>
    <div class="col-md-3" style="padding-top:20px">
      <ul class="list-inline">
        <li><router-link to="/login">登陆</router-link></li>
        <li><router-link to="/register">注册</router-link></li>
        <li><router-link to="/">购物车</router-link></li>
        <li><router-link to="/">我的订单</router-link></li>
      </ul>
    </div>
  </div>
</template>
<script>

    export default {
        name: "",
        data() {
            return {}
        },
        created() {

        },
        computed: {},
        watch: {},
        methods: {},
        activated() {
        },
        mounted() {
        },
        components: {},
    }
</script>
<style scoped>
</style>
