import Vue from 'vue'
import Router from 'vue-router'
import Index from "../pages/index.vue"
import Banner from "../components/Banner.vue"
import Register from  "../pages/regist.vue"
import Login from "../pages/login.vue"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect:'/banner',
      children:[
        {
          path:'banner',
          name: 'banner',
          component:Banner
        }
      ]
    },
    {
      path:"/register",
      name:"Register",
      component:Register
    },
    {
      path:"/login",
      name:"login",
      component:Login
    },
  ]
})
