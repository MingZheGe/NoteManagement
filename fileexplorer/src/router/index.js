import Vue from 'vue'
import VueRouter  from 'vue-router'
Vue.use(VueRouter) 
 
//import Home from '../mainPage.vue'
import test from '../pages/tEs.vue'
import login from '../pages/loGin.vue'
import register from '../pages/reGister.vue'
import testtt from '../test.vue'
import add from '../pages/aDd.vue'

 
//2、在Vue实例内绑定路由和hash的对应关系
const router = new VueRouter({
  //在路由的实例对象中
  //用一个 routes:[]数组，来定义 hash地址与组件之间的对应关系
  routes:[
    {
      path:'/', 
      component:login, 
    },
    {path:'/test',component:test},
    {path:'/login',component:login},
    {path:'/register',component:register},
    {path:'add',component:add},
  ]
})

export default router