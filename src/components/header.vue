<template>
  <div>
    <!-- 登录 注册 购物车... -->
    <Nav></Nav>
    <!-- 导航条 -->
    <div class="container-fluid">
      <nav class="navbar navbar-inverse">
        <div class="container-fluid">
          <!-- Brand and toggle get grouped for better mobile display -->
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">首页</a>
          </div>
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav" id="categoryUl" v-for="(item , index) in category">
              <li><a href="#">{{item.cname}}</a></li>
            </ul>
            <form class="navbar-form navbar-right" role="search">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Search">
              </div>
              <button type="button" class="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
    import Nav from "./nav.vue"
    import {ProductServlet} from '../service/requset'
    export default {
        name: "",
        data() {
            return {
                category:[]
            }
        },
        created() {
          this.getCategory();
        },
        computed: {},
        watch: {},
        methods: {
          async getCategory () {
            let _this = this;
            let res = await ProductServlet("categoryList");
            _this.category = res.data;
          },
        },
        activated() {
        },
        mounted() {
        },
        components: {
          Nav,
        },
    }
</script>
<style scoped>
</style>
