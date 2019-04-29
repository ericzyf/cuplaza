import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'
import Admin from './views/Admin.vue'
import Category from './views/Category.vue'
import Item from './views/Item.vue'
import Search from './views/Search.vue'
import User from './views/User.vue'
import PostItem from './views/PostItem.vue'
import Order from './views/Order.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      // @param id category id
      path: '/category/:id',
      name: 'category',
      component: Category
    },
    {
      // @param id item id
      path: '/item/:id',
      name: 'item',
      component: Item
    },
    {
      // @param b64 base64 encoded search keyword
      path: '/search/:b64',
      name: 'search',
      component: Search
    },
    {
      // @param uid user id
      path: '/user/:uid',
      name: 'user',
      component: User
    },
    {
      // @param uid seller id
      path: '/postitem/:uid',
      name: 'postitem',
      component: PostItem
    },
    {
      // @param id item id
      path: '/order/:id',
      name: 'order',
      component: Order
    }
  ]
})
