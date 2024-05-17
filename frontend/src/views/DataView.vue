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
        <!-- вариант заголовка и элементов в v-card-title -->
        <v-card-title>
          Заголовок 1
          <v-spacer></v-spacer>
          <v-btn>
            <v-icon dark>
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>

        <!-- вариант заголовка и элементов в v-toolbar -->
        <v-toolbar> 
          <v-toolbar-title>Панель 1</v-toolbar-title>
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
            <v-list-item-title>{{ item }}</v-list-item-title>
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

  mounted() {},

  computed: {},

  watch: {},
}
</script>
