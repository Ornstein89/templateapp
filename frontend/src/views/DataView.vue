<!--
  работа со спискам и таблицами:
  - поиск, фильтрация, pagination,
  - вписывание больших списков в размеры страницы (scroll на списке, а не на странице),
  выбор
  - представление элементов, выбор
  - контекстное меню на элементах

  Яркая подсветка для контроля границ элементов и заполнения по высоте
 -->
<template>
  <v-row
    class=""
    style="height:100%;"
    no-gutters
  >
    <v-col
      cols="12" md="12" class=""
      style="height:100%;"
    >

      <v-card class="d-flex flex-column"
        height="100%"
        >
        <!-- вариант заголовка и элементов в v-toolbar -->
        <v-toolbar> 
          <v-toolbar-title>Публикации</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            label='Поиск'
            v-model="searchstring"
            filled
            rounded
            clearable
            dense
            hide-details="true"
            @keypress.enter="search"
            @click:clear="searchstring=''"
          >
            <template v-slot:append>
              <v-btn
                color="primary"
                large icon
                class="mt-n2 mr-n5"
                @click="filter">
                <v-icon large> mdi-magnify </v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </v-toolbar>
        <v-divider></v-divider>

        <v-list
          class="text-left overflow-y-auto"
          style="height:100%;"
          >
          <v-list-item
            v-for="(item,i) in list_model"
            :key="i"
          >
            <v-list-item-avatar>
              <!-- <v-lazy> -->
                <v-img
                  lazy-src="https://cataas.com/cat/close?type=small"
                  :src="`https://cataas.com/cat/close?type=small&cache=${i}`"
                  ></v-img>
              <!-- </v-lazy> -->
               asfdasf
              
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-html="item.title"></v-list-item-title>
              <v-list-item-subtitle
                class="text-wrap"
                v-html='`<a class="text--primary" href="#">${item.author.username}</a> &mdash; ${item.text}`'
              ></v-list-item-subtitle>
              <v-list-item-subtitle v-html="item.datetime"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <div class="text-center">
          <v-pagination class="ma-0 pa-0"
            v-model="pagination"
            :length="6"
          ></v-pagination>
        </div>
      </v-card>
    </v-col>

  </v-row>
</template>

<script>
import axios from 'axios';

// @ is an alias to /src

export default {
  name: 'DataView',
  data(){
    return {
      list_model: Array(50).fill().map((v,i)=>++i),
      searchstring:"",
      pagination: 1,
    }
  },

  methods:{
    filter(){
      //
    },
  },

  beforeCreate(){},

  created() {},

  beforeMount(){},

  mounted() {
    // api/publications
    // api/login
    axios.get("/api/publications")
    .then(response => {
      //console.log("response.data = ", response.data);
      this.list_model = response.data;
        })
    .catch(error => {
      console.log("ERROR /api/publications ", error)
    })
              
          //   }
          //   else{
          //     this.$emit('showerror', "Неверный логин или пароль");
          //   }
          // })
          // .catch(error => {
          //   this.$emit('showerror', error);
          // })
  },

  computed: {},

  watch: {},
}
</script>
