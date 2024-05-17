import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import LoginView from '@/views/LoginView.vue'

import DataView from '@/views/DataView.vue'
import PlotView from '@/views/PlotView.vue'
import MapView from '@/views/MapView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    meta: { requiresAuth: false },
    // beforeEnter: (/*to, from*/) => {},
  }, 

  {
    path: '/',
    name: 'DataView',
    component: DataView,
    meta: { requiresAuth: true }, // АУТЕНТИФИКАЦИЯ
    // beforeEnter: (/*to, from*/) => {},
  },
  {
    path: '/plot',
    name: 'PlotView',
    component: PlotView,
    meta: { requiresAuth: true }, // АУТЕНТИФИКАЦИЯ
    // beforeEnter: (/*to, from*/) => {},
  },
  {
    path: '/map',
    name: 'MapView',
    component: MapView,
    meta: { requiresAuth: true }, // АУТЕНТИФИКАЦИЯ
    // beforeEnter: (/*to, from*/) => {},
  },
]

store.commit('initialiseStore'); // обязательно восстановить store из localstorage перед использованием router

const router = new VueRouter({
  routes
});


router.beforeEach((to, from, next) => { // для АУТЕНТИФИКАЦИИ...
  console.log("to = ", to);
  console.log("from = ", from);

  console.log("to.meta.requiresAuth = ", to.meta.requiresAuth);
  console.log("store.state.token = ", store.state.token);
  // console.log("store.state.user = ", router.app.$store.state.user);
  // console.log("...getToken() = ", router.app.$store.getters.getToken);
  console.log("store.state = ", store.state);
  // if (to.matched.some(record => record.meta.requiresAuth)) {
  if ((to.meta.requiresAuth===true) && !store.state.token) {
    return {
        name: 'LoginView',
        query: { redirect: to.fullPath }
    };
  } else {
      next();
  }
}); // ... для АУТЕНТИФИКАЦИИ

// router.beforeResolve((/*to, from, next*/)=>{console.log("router.beforeResolve");})
// router.beforeEach((to , from, next)=>{
//   console.log("router.beforeEach");
//   next();
//   // return false; // прервать переход
//   // return { name: 'Name' } или return '/url'
// });
// router.afterEach((/*to, from, failure*/)=>{console.log("router.afterEach");})

export default router
