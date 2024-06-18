import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
// Vue.prototype.$http.defaults.baseURL = 'http://localhost:8000/';
const token = localStorage.getItem('token')
if (token) {
    Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Token ' + token
}


router.beforeEach((to, from, next) => { // для АУТЕНТИФИКАЦИИ...
  console.log("to = ", to);
  console.log("from = ", from);

  console.log("to.meta.requiresAuth = ", to.meta.requiresAuth);
  console.log("store.state.token = ", store.state.token);
  // console.log("store.state.user = ", store.state.user);
  console.log("...getToken() = ", store.getters.getToken);
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

new Vue({
  vuetify,
  router,
  store,

  beforeCreate() { // (в т.ч. АУТЕНТИФИКАЦИЯ) загрузка в storage данных после перезагрузки страницы
    this.$store.commit('initialiseStore');
  },

  render: h => h(App)
}).$mount('#app')
