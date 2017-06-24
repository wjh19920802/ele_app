import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'


import app from './App'
import goods from './components/goods/goods.vue'
import seller from './components/seller/seller.vue'
import ratings from './components/ratings/ratings.vue'

import './mock/mockServer'
import  "./common/stylus/fonts.styl"

//使用路由
Vue.use(VueRouter)
Vue.use(VueResource)

//创建路由器对象
var router = new VueRouter({

})



//映射路由
router.map({
  '/goods':{
    component:goods
  },
  '/seller':{
    component:seller
  },
  '/ratings':{
    component:ratings
  }

})

//启动路由
router.start(app,'#app')

//设置默认路由
router.go('/goods')


