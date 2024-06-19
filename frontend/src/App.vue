<template>
<v-app>

    <!-- clipped-left в v-app-bar и clipped в v-navigation-drawer размещает
    v-navigation-drawer под v-app-bar без пересечений -->
    <v-app-bar color="primary" dark app clipped-left>
      <!-- TODO вписать лого в v-app-bar не указывая max-width и др. величины в пикселях -->
      <!-- <v-img src="favicon.png" max-width="50"></v-img> -->
      <v-app-bar-title justify-start class="ml-2">
        <h2 justify-start>Блог</h2>
      </v-app-bar-title>

      <v-spacer></v-spacer>
      <v-divider class="mx-1" vertical></v-divider>
      <v-avatar class="white mx-1">
        <v-icon color="primary">
          <!-- mdi-account-multiple -->
          mdi-account-circle
        </v-icon>
      </v-avatar>
      <!-- <p>{{ $store.state.user ? $store.state.user.name : "" }}</p> -->
      <v-divider class="mx-1" vertical></v-divider>
      <v-btn v-if="$store.state.token" class="ml-2" outlined @click="logout">Выход</v-btn>
    </v-app-bar>

    <!-- опция "app" растягивает drawer по кромке экрана,и он не мешает раскладке main -->
    <v-navigation-drawer
      :mini-variant.sync="is_drawer_mini"
      v-model="drawer"
      width="180"
      app
      clipped
      dark
      class="pa-0"
    >

      <v-divider></v-divider>
      <v-list class="ma-0 pa-0">

        <!-- статичное поле над меню навигации, реализация через элемент листа -->
        <!-- <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Application
            </v-list-item-title>
            <v-list-item-subtitle>
              subtext
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider> -->
        
        <!-- меню навигации, список ссылок -->
        <v-list-item-group
          v-model="selected_nav_link"
          color="primary"
          mandatory
        >
          <v-list-item
            v-for="(item,i) in navigation_model"
            :key="i"
            link  
          >
            <!--
            старый вариант навигации@click="$router.push({name:item.link})"
            теперь перенесён в watch модели selected_nav_link
            -->
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>

            <v-list-item-title class="text-wrap">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

    </v-navigation-drawer>

    <v-main style="height: 100vh;">
        <v-container
          fluid style="height: 100%">
          <!-- style="height: 100%;" вместо fill-height + style="align-items: flex-start;" -->
          <!-- fluid - для заполнения v-container по ширине страницы -->

          <router-view></router-view>
        </v-container>
    </v-main>

    <v-footer app>
      
    </v-footer>
</v-app>
</template>

<script>
export default {
  data(){
    return {
      navigation_model : [
        {title:"Списки и таблицы", icon:"mdi-table", link:"DataView"},
        {title:"Карты", icon:"mdi-earth-box", link:"MapView"},
        {title:"Графики", icon:"mdi-chart-line", link:"PlotView"},
      ],
      selected_nav_link : 0,
      is_drawer_mini : false,
      drawer:false,
    }   
  },

  methods: {
    logout(){
      this.$store.commit('setToken', null);
      // this.$store.commit("setUser", null);
      this.$router.replace({ name: "LoginView" });
    },
  },

  beforeCreate(){},

  created() {},

  beforeMount(){},

  mounted() {},

  computed: {},

  watch: {
    selected_nav_link: function(val /*, oldVal*/){
      // навигация, преход не при нажатии ссылки, а при изменении модели
      this.$router.push({name:this.navigation_model[val].link})
    }
  },

}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

//body { // предотвратить пролистывание/ появление скроллбара всей страницы
//  overflow: hidden;
//  height: 100vh;
//}
</style>
