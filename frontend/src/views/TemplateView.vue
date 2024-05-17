<!--
  скелет страницы с хуками

  здесь описывается назначение страницы, список демонстрируемого функционала,
  ссылки на сами подключенные библиотеки и ресурсы для более продвинутого использования
-->

<!-- Инсталляция
  здесь описывается, что нужно установить в npm для работы страницы
-->

<template>
  <v-row>
    <v-col>
      <v-card>

      </v-card>
    </v-col>
    <v-col></v-col>
  </v-row>
</template>

<script>

export default {
  name: 'MainView',
  data(){
    return {
      
    }
  },

  methods:  {},

  computed: {},

  watch: {},

  /* хуки Vue */

  beforeCreate(){},

  created() {},

  beforeMount(){},

  mounted() {},

  beforeUpdate(){},

  updated(){},

  beforeUnmount() { },

  unmounted() { },

  beforeDestroy() {},

  destroyed(){},

  activated() {},

  deactivated() {},


  /* хуки роутера (см. также глобальные хуки в index.js) */

  beforeRouteEnter(/*to, from, next*/){},

  beforeRouteUpdate(/*to, from, next*/){},

  beforeRouteLeave(/*to, from, next*/){},

}
</script>
