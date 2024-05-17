<!--
  дашборды (настраиваемые плитки)

  https://github.com/jbaysolutions/vue-grid-layout
    демо https://jbaysolutions.github.io/vue-grid-layout/
    установка npm install vue-grid-layout --save

  https://github.com/yugasun/x-chart (не поддерживается 8 месяцев)
  https://github.com/bensladden/vue-responsive-dash (переведено в архив в январе 2023)
  https://github.com/xiaoluoboding/vue-smart-widget
  
  TODO просмотреть другие проекты на https://awesome-vue.js.org/components-and-libraries/ui-layout.html
-->

<template>
  <v-row class="grey lighten-3" style="height: 100%" no-gutters>
    
    <v-col
      cols="12" md="12"
      class="pa-1"
      style="height: 100%" 
      no-gutters >
      <v-card style="height: 100%">
        <!-- панель управления -->
        <v-toolbar>
          <v-icon>mdi-cog</v-icon>

          <v-toolbar-title>Изменяемая раскладка vue-grid-layout</v-toolbar-title>

          <v-spacer></v-spacer>
          <v-toolbar-items class="pa-1">
          <v-select
            class="mx-1"
            :items="default_layout"
            v-model="layout"
            :return-object="true"
            label="Тип карточки"
            solo
            multiple
            clearable
            chips
            small-chips
            dense
            style="max-width:300px;"
            counter="true"
            :menu-props="{ maxWidth: '200' }"
            :disabled="fixLayout"
          ></v-select>
          <v-switch
            class="mx-1"
            v-model="fixLayout"
            label="Зафиксировать"
          ></v-switch>

          </v-toolbar-items>
        </v-toolbar>

        <!-- поле изменяемой раскладки -->
        <grid-layout
          :layout.sync="layout"
          :col-num="12"
          :row-height="30"
          :vertical-compact="true"
          :use-css-transforms="true"
          :is-draggable="!fixLayout"
          :is-resizable="!fixLayout"
          >
            <grid-item
              class="v-card v-sheet"
              v-for="item in layout"
              :static="item.static"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.i"
              :key="item.i"
              drag-allow-from=".vue-draggable-handle"
            >
              <!-- <v-card-title
                class="text grey lighten-3 vue-draggable-handle"
              >
                {{item.i}}
              </v-card-title>
              <v-card-actions>
                <v-btn></v-btn>
              </v-card-actions> -->
              <component v-bind:is="item.component"></component>
            </grid-item>
        </grid-layout>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'; // npm install vue-grid-layout --save
export default {
  name: 'DashboardView',

  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,

    // компоненты для дашборда
    DashboardComp1: () => import('@/components/DashboardComp1.vue'),
    DashboardComp2: () => import('@/components/DashboardComp2.vue'),
    DashboardComp3: () => import('@/components/DashboardComp3.vue'),
    DashboardComp4: () => import('@/components/DashboardComp4.vue'),
  },

  data(){
    return {
      fixLayout : false,
      card_types : ["Тип 1", "Тип 2", "Тип 3", "Тип 4"],
      
      // свойства для vue-grid-layout
      default_layout: [
          { component:"DashboardComp1", text:"Тип 1", x: 0, y: 0, w: 3, h: 5, i: "0" },
          { component:"DashboardComp2", text:"Тип 2", x: 2, y: 0, w: 4, h: 5, i: "1" },
          { component:"DashboardComp3", text:"Тип 3", x: 4, y: 0, w: 2, h: 5, i: "2" },
          { component:"DashboardComp4", text:"Тип 4", x: 6, y: 0, w: 3, h: 5, i: "3" },
      ],
      layout: [{ component:"DashboardComp2", text:"Тип 2", x: 2, y: 0, w: 4, h: 5, i: "1" },],
    }
  },

  methods:  {},

  computed: {},

  watch: {},

}
</script>
