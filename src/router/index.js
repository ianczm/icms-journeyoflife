import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Agenda from '../views/Agenda.vue'
import Game from '../views/Game.vue'
import Rules from '../views/Rules.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/agenda',
      name: 'Agenda',
      component: Agenda
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },
    {
      path: '/rules',
      name: 'Rules',
      component: Rules
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

export default router
