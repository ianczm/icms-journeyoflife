import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Agenda from '../views/Agenda.vue'

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
    }
  ]
})

export default router
