import Vue from 'vue'
import axios from 'axios'
import lodash from 'lodash'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import Verification from '../../static/js/vCode'
import fs from 'fs'
import Util from '../../static/js/util'
import mysqlPool from './api/mysql-util'
import User from './api/user'
import Version from './api/version'
import Navigate from './api/navigate'
import Machine from './api/machine'
import shell from 'shelljs'
import cmdPromise from 'cmd-promise'
import Export from './api/export'

Vue.use(ElementUI)
Vue.prototype.$vCode = Verification
Vue.prototype.$fs = fs
Vue.prototype.$mysql = {User, Version, Navigate, Machine, Export}
Vue.prototype.$shell = shell
Vue.prototype.$cmdPromise = cmdPromise
Vue.prototype.$util = Util
Vue.prototype.$lodash = lodash
Vue.prototype.$mysqlUtil = mysqlPool

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.filter('moduleTypeToString', function (value) {
  let type = value
  let moduleString = ''
  if (lodash.isString(value) && !lodash.isEmpty(value)) type = Number(value)
  switch (type) {
    case 1:
      moduleString = 'MS6000'
      break
    case 2:
      moduleString = 'MS8000'
      break
    case 3:
      moduleString = 'MS9000'
      break
    default:
      moduleString = '未知类型'
      break
  }
  return moduleString
})

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
