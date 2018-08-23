import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  'linkActiveClass': 'active',
  routes: [
    {
      path: '/',
      name: 'login',
      component: require('@/components/login').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/components/home').default
    }
  ]
})
