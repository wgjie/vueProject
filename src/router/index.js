import Vue from 'vue'
import Router from 'vue-router'
// 导入登录组件
import Login from 'components/Login'
// 导入Home组件
import Home from 'components/Home'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})

// 导航守卫判断是否登录
router.beforeEach((to, from, next) => {
  if (to.path === '/login') { // 如果是要跳转到登录路由的时候
    next() // 直接跳过
    return false
  }
  let token = localStorage.getItem('token')
  if (token) { // 如果token存在，表示已经登录了
    next()
  } else {
    next('/login') // 跳转到登录路由
  }
})

export default router
