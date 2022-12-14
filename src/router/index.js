import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signup from '../views/Signup.vue'
import Login from '../views/Login.vue'

const requireAuthOnHome = (to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'))
  if (!user) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

const requireAuthOnLoginAndSignup = (to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    next({ name: 'Home' })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuthOnHome
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    beforeEnter: requireAuthOnLoginAndSignup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: requireAuthOnLoginAndSignup
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router