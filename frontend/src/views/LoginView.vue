<!--
  форма аутентификации, система аутентификации работает совместно со
  1) store/index.js (vuex)
  2) main.js, router.beforeEach() - проверка наличия "meta: { requiresAuth: true }," на новой странице и переадресация на LoginView, если пользователь не авторизован
  3) main.js, beforeCreate() - инициализация storage после перезагрузки страницы сохранёнными в браузере данными, в т.ч. токеном авторизации
  4) router/index.js - в routes = [] помечено, какие страницы требуют авторизации "meta: { requiresAuth: true }," 
-->

<template>
    <v-row class="text-center"
      style="height: 100%" no-gutters>
      <v-col cols="12" 
      align-self="center">
        <v-sheet
          class="pa-12 mx-auto "
          max-width="500"
          color="grey lighten-3"
          rounded
          elevation="1"
        >

          <v-text-field
            v-model="username"
            label='Логин'
            outlined
            clearable
            background-color="white"
            :rules="[rules.required]" 
          ></v-text-field>

          <v-text-field
            v-model="password"
            label='Пароль'
            outlined
            clearable
            background-color="white"
            :rules="[rules.required]" 
            :type="show_password ? 'text' : 'password'"
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show_password = !show_password"
          ></v-text-field>

          <v-btn
            depressed
            color="primary"
            rounded
            dark
            large
            @click="login"
          >
            Вход
          </v-btn>

        </v-sheet>
      </v-col>
    </v-row>
</template>

<script>
// @ is an alias to /src
//eslint-disable-next-line no-unused-vars
import axios from "axios"; 
export default {
  name: 'LoginView',
  data(){
    return {
      username:'defaultuser',
      password: 'defaultpassword',
      show_password: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => (`The email and password you entered don't match`),
      },
    }
  },

  beforeMount(){
    // в случае, если страница отобразилась по ошибке
    // или пользователь пытается окрыть страницу по url
    // и он уже залогинен - перейти на View приложения
    if(this.$store.state.token && this.$store.state.username){
      this.$router.replace({name:"DataView"});
    }
  },

  methods:{
    login(){
      /*axios.post("/api/auth",
                  { username:this.username,
                    password:this.password } )
      .then(response => {
        const tmp_token = response.data.token;
        if(tmp_token && tmp_token.length==40){ // проверка формата токена
          this.$store.commit('setToken', tmp_token);
        }
        this.$store.commit('setUser', this.user);

        // токен авторизации - в постоянные заголовки API-запросов
        axios.defaults.headers.common['Authorization'] = "Token "+ tmp_token;

        // в финале - покинуть страницу авторизации
        this.$router.replace({name:"MainPanel"});
      })
      .catch(error => {
        this.$emit('showerror', error);
      })*/

      { //TODO это - заглушка, токен должен запрашиваться с сервера
        this.$store.commit('setToken', "0123456789012345678901234567890123456789");
        this.$store.commit('setUser', {name:this.username, lastname:"lastname"});
        this.$router.replace({name:"DataView"});
      }
      
    }
  }
}
</script>
