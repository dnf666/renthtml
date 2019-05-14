import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
import CompanyInfo from '@/components/Company-information'
import MemberMangement from '@/components/Member-mangement'
import Editor from '@/components/editorMember'
import CuisineManagement from '@/components/CuisineManagement.vue'
import ProjectManagement from '@/components/ProjectManagement'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Fristregister'
import Fristregister from '@/components/Fristregister'
import Secondregister from '@/components/Secondregister'
import EditorProject from '@/components/editorProject'
import EditorBook from '@/components/CuisineEdit'
import OrderDinner from '@/components/orderDinner'
import CostManagement from '@/components/CostManagement'
import RoomOwner from '@/components/RoomOwner'
import CuisineManagementOwner from '@/components/CuisineManagementOwner'
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: {
      requiresAuth: false
    },
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    children: [
      {
        path: '/',
        name: 'Fristregister',
        meta: {
          requiresAuth: true
        },
        component: Fristregister
      }
    ]
  },
  {
    path: '/register/Secondregister',
    name: 'Secondregister',
    meta: {
      requiresAuth: true
    },
    component: Secondregister
  },
  {
    path: '/orderDinner',
    name: 'OrderDinner',
    meta: {
      requiresAuth: false
    },
    component: OrderDinner
  },
  {
    path: '/RoomOwner',
    name: 'RoomOwner',
    redirect:'/CuisineManagementOwner',
    component: RoomOwner,
    children:[
      {
        path: '/CuisineManagementOwner',
        name: 'CuisineManagementOwner',
        meta: {
          requiresAuth: true
        },
        component: CuisineManagementOwner
      },
    ]
  },


  {
    path: '/Home',
    name: 'Home',
    component: Home,
    redirect: '/CompanyInfo',
    children: [
      {
        path: '/CompanyInfo',
        name: 'CompanyInfo',
        meta: {
          requiresAuth: true
        },
        component: CompanyInfo
      },
      {
        path: '/MemberMangement',
        name: 'MemberMangement',
        meta: {
          requiresAuth: true
        },
        component: MemberMangement
      },
      {
        path: '/CuisineMangement/Editor',
        name: 'EditorCuisine',
        meta: {
          requiresAuth: true
        },
        component: EditorBook
      },
      {
        path: '/CostManagement',
        name: 'CostManagement',
        meta: {
          requiresAuth: true
        },
        component: CostManagement
      },
      {
        path: '/MemberMangement/Editor',
        name: 'Editor',
        meta: {
          requiresAuth: true
        },
        component: Editor
      },
      {
        path: '/ProjectManagement',
        name: 'ProjectManagement',
        meta: {
          requiresAuth: true
        },
        component: ProjectManagement
      },
      {
        path: '/ProjectManagement/Editor',
        name: 'EnditorProject',
        meta: {
          requiresAuth: true
        },
        component: EditorProject
      },
      {
        path: '/CuisineManagement',
        name: 'CuisineManagement',
        meta: {
          requiresAuth: true
        },
        component: CuisineManagement
      },

    ]
  }

]

// 页面刷新时，重新赋值有没登录
if (window.sessionStorage.getItem('isLogin')) {
  store.commit('setIsLogin', window.sessionStorage.getItem('isLogin'))
}

const router = new Router({
  routes
})


export default router
