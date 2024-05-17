import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null, // АУТЕНТИФИКАЦИЯ
    user: null, // АУТЕНТИФИКАЦИЯ

    // error_show: false,
    // error_string: "",
    // searchstring: "", // если в <AppBar> строка с поиском, а поиск в одном из View
    // selected_language:"en", // если в <AppBar> выбор языка
  },
  getters: {},
  //    getToken(state) { // АУТЕНТИФИКАЦИЯ
  //        console.log("getToken() emerged");
  //        return state.token;
  //    },
  //    getUser(state) { // АУТЕНТИФИКАЦИЯ
  //        return state.user;
  //    },
  //},
  mutations: {
      initialiseStore(state) {
          // восстановление полей vuex из localStorage
          // после перезагрузки страницы
          console.log("initialiseStore() emerged");

          if (localStorage.getItem('token')) {  // АУТЕНТИФИКАЦИЯ
              state.token = localStorage.token;
          }
          if (localStorage.getItem('user')) { // АУТЕНТИФИКАЦИЯ
              state.user = JSON.parse(localStorage.user);
          }
      },

      // набор set-методов для сохранения полей vuex в localstorage
      // для сохранности данных между перезагрузками страницы
      setToken(state, data) { // АУТЕНТИФИКАЦИЯ
          state.token = data;
          localStorage.setItem("token", data); // простые типы можно сохранять через setItem

      },
      setUser(state, data) { // АУТЕНТИФИКАЦИЯ
          state.user = data;
          localStorage.setItem("user", JSON.stringify(data)); // объекты можно сохранять, сериализовав в JSON
      },
  },
  actions: {

  },
  modules: {

  }
})
