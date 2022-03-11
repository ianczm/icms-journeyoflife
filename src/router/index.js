import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Agenda from '../views/Agenda.vue'
import Game from '../views/Game.vue'
import Rules from '../views/Rules.vue'
import Login from '../views/Login.vue'

import { getAuth } from "firebase/auth";

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
      component: Game,
      meta: {requiresAuth: true}
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

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth) {
    const auth = getAuth();
    if (!auth.currentUser) {
      next({name: 'Login'});
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router