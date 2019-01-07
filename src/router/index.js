import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index.vue'
import Login from "../views/login/Login";
import Nofind from '../views/404'
import router_system from './modules/router_system'  //系统与角色管理
import router_channel from './modules/router_channel'  //渠道商管理
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      name: "Index",
      component: Index,
			meta: { title: '首页' },
      children: [
          // router_system,
          router_channel,   //渠道商管理
      ]
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "*",
      name: "Nofind",
      component: Nofind
    }
  ],
  mode: "history"
});

export default router
