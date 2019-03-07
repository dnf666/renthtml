import Vue from 'vue'
import Vuex from 'vuex'
import nav from './modules/nav'
import login from './modules/login'
import companyId from './modules/companyId'
import adminId from './modules/adminId'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    nav,
    login,
    companyId,
    adminId
  },
  getters
})
export default store
