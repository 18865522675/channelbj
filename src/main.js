import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import api from "@/api";
Vue.prototype.$api=api;

import toolkit from "@/common/toolkit.js";
Vue.prototype.$toolkit=toolkit;

//
//import moment from 'moment'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//import VueQuillEditor from 'vue-quill-editor'
//Vue.prototype.$moment = moment
//Vue.use(VueQuillEditor)
//import VueAMap from 'vue-amap';
//Vue.use(VueAMap);
////全局时间格式化过滤
//Vue.filter('moment', function (value, formatString) {
//  formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
//  return moment(value).format('YYYY-MM-DD');
//});

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    // if (to.matched.some(record => record.meta.requireAuth)) {
    //     const userInfo = JSON.parse(toolkit.getCookie("userInfo"))
    //     if (!userInfo||!(Object.keys(userInfo).length)) {
    //         next({
    //             path: '/login',
    //             query: { redirect: to.fullPath }
    //         })
    //         toolkit.removeCookie("userInfo")
    //         return false
    //     }
    //     if(to.name=='login'){
    //         toolkit.removeCookie("userInfo")
    //         return false
    //     }
    //     next()
    // } else {
    //     next() // make sure to always call next()!
    // }
 next()
})

Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
