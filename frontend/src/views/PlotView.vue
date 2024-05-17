<!--
  работа с графиками, разными графическими библиотеками: plotly.js, charts.js

  демонстрируемый функционал:
  - отображение
  - обновление данных
  - элементы управления графиком (масштабирование, легенда, курсор), создаваемые самой библиотекой

  библиотека plotly.js: https://plotly.com/javascript/getting-started/, npm i plotly.js ИЛИ npm install plotly.js-dist (не забять поменять в import)
  библиотека charts.js: https://www.chartjs.org/docs/latest/getting-started/, npm install chart.js
  библиотека Google charts: https://developers.google.com/chart (только через загрузку JS в теге script)
  библиотека echarts: https://echarts.apache.org/
    vue-обёртка https://vue-echarts.dev/, https://github.com/ecomfe/vue-echarts
  3D графика https://threejs.org/
  инфографика https://github.com/d3/d3
  
  Заметки:
  - элементы управления (масштабирование, пролистывание, скриншот) есть только в plotly
  - 
-->

<!-- Инсталляция
  npm install plotly.js-dist
  npm install chart.js
-->

<template>
<div style="width:100%;height:100%;">
  <v-row class="pa-1" no-gutters style="width:100%;height:100%;">
      <v-col cols="12" md="6" class="pa-1" style="height:100%;">
        <v-card class="ma-0 pa-0" style="height:100%;">
          <v-card-title>Plotly.js</v-card-title>
          <div style="flex: 1 1 auto;width:100%;height:80%;"
            id="plotly_element"
          ></div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="pa-1" style="height:100%;">
        <v-card class="ma-0 pa-1" style="height:100%;">
          <v-card-title>Chart.js</v-card-title>
          <div style="flex: 1 1 auto;width:100%;height:80%;">
            <canvas id="chartjs_element" style="flex: 1 1 auto;width:100%;height:100%;"></canvas>
          </div>
        </v-card>
      </v-col>
  </v-row>
</div>
</template>

<script>
// @ is an alias to /src
// eslint-disable-next-line no-unused-vars
import Plotly from "plotly.js-dist"; // если ставился из npm install plotly.js-dist
import Chart from 'chart.js/auto'; // npm install chart.js

export default {
  name: 'PlotView',
  data() {
      return {
        plotly_element : null,
        plotly_data : [
          {
              x: Array(50).fill().map((v,i)=>++i),
              y: Array(50).fill(0.5),
              type: 'scatter',
              color:"red",
              name: "Series 1"
          },
          {
              x: Array(50).fill().map((v,i)=>++i),
              y: Array(50).fill(0),
              type: 'scatter',
              color:"blue",
              name: "Series 2"
          },
          {
              x: Array(50).fill().map((v,i)=>++i),
              y: Array(50).fill(-0.5),
              type: 'scatter',
              color:"green",
              name: "Series 3"
          }, ],

        chartjs_element : null,
        chartjs_object : null,
        chartjs_data : {
          datasets: [
            {
              label: 'Series 1',
              data: Array(50).fill().map((v,i)=>{ return {x : i, y : i*0.02+1} }), // массив вида [{x:..., y:...}, ...]
            },
            {
              label: 'Series 2',
              data: Array(50).fill().map((v,i)=>{ return {x : i, y : i*0.02} }), // массив вида [{x:..., y:...}, ...]
            },
            {
              label: 'Series 3',
              data: Array(50).fill().map((v,i)=>{ return {x : i, y : i*0.02 - 1} }), // массив вида [{x:..., y:...}, ...]
              stepped : true,
            }
          ]
        },

        plot_i : 0,
        
        plot_timer : null,
      }
  },

  methods: {
    plotly_update(){
      /* документация и примеры про обновление графиков https://plotly.com/javascript/streaming/
      и https://plotly.com/javascript/plotlyjs-function-reference/ */

      console.log("plotly_update()");

      this.plotly_data[1].y.shift();
      this.plotly_data[1].y.push(Math.sin(this.plot_i * 0.1));

      this.plotly_data[0].y.shift();
      this.plotly_data[0].y.push(Math.random());

      this.plotly_data[2].y.shift();
      this.plotly_data[2].y.push(Number((this.plot_i % 4) > 1));

      // TODO написать пример
      // использовать если точки только добавляются в конце 
      // Plotly.extendTraces(
      //  'plotly_element',
      //  {y:[[Math.sin(this.plot_i * 0.1)]]}
      // );

      // TODO разобраться в отличиях
      // Plotly.react(
      //   'plotly_element',
      //   this.plotly_data
      // );

      // обновление только для элементов оформления
      // Plotly.restyle(
      //   'plotly_element',
      //   this.plotly_data,
      // );
      
      // полное обновление данных графика
      //eslint-disable-next-line no-unused-vars
      var data_update = { // новые данные, которые нужно заменить на графике
        y:[ // массив y для всех кривых
          this.plotly_data[0].y, // первая кривая
          this.plotly_data[1].y, // вторая кривая
          this.plotly_data[2].y // третья кривая и т.д.
        ]
      };

      Plotly.update(
        'plotly_element',
        data_update,
        //[0,1] //TODO разобраться, как пользоваться параметром
      );
    },

    chartsjs_update(){
      
      console.log("this.chartjs_object.data = ", this.chartjs_object.data);
      console.log("this.chartjs_object.data.datasets = ", this.chartjs_object.data.datasets);

      var x_array = []; var y_array1 = []; var y_array2 = []; var y_array3 = [];
      var len = this.chartjs_object.data.datasets[0].data.length;
      for(var i = 0; i < len; i++) {
        x_array.push(this.chartjs_object.data.datasets[0].data[i].x);
        y_array1.push(this.chartjs_object.data.datasets[0].data[i].y);
        y_array2.push(this.chartjs_object.data.datasets[1].data[i].y);
        y_array3.push(this.chartjs_object.data.datasets[2].data[i].y);
      }

      y_array1.shift(); y_array2.shift(); y_array3.shift();
      y_array1.push(Math.sin(this.plot_i * 0.1));
      y_array2.push(Math.random());
      y_array3.push(this.plot_i % 2);

      //eslint-disable-next-line no-redeclare
      for(var i = 0; i < x_array.length; i++){
        this.chartjs_object.data.datasets[0].data[i] =
         {x:x_array[i], y:y_array1[i]};
        this.chartjs_object.data.datasets[1].data[i] =
         {x:x_array[i], y:y_array2[i]};
        this.chartjs_object.data.datasets[2].data[i] =
         {x:x_array[i], y:y_array3[i]};
      }

      this.chartjs_object.update();
    },
  },

  mounted() {

    // инициализация plotly
    // this.plotly_element = document.getElementById('plotly_element');
    Plotly.newPlot( 'plotly_element', // id элемента либо ссылка на него
      this.plotly_data, // данные и свойства можно задавать при создании
      {},// { margin: { t: 0 } } // настройки вида
      {displayModeBar: true, autosize: false, margin: { l: 0, r: 0, b: 0, t: 0, pad: 0},}
    );

    // инициализация chartjs
    this.chartjs_element = document.getElementById('chartjs_element');
    this.chartjs_object = new Chart(
      this.chartjs_element,
      {
        type: 'line',
        data: this.chartjs_data,
        options: {
          scales: {
            x: {
              type: 'linear',
              position: 'bottom'
            }
          },
          // animation: { duration: 0, },
        }
      }
    );

    // запуск таймера обновления графиков
    this.plot_timer = setInterval(function(){
      this.plotly_update();
      this.chartsjs_update();
      this.plot_i++;
    }.bind(this), 200);

  },

  beforeUnmount() { },

  unmounted() { },

  beforeDestroy() {
    clearInterval(this.plot_timer); // остановить таймер при уходе со страницы
    this.plot_timer = null;
  },

  // beforeRouteLeave(to, from, next){
  //   console.log("beforeRouteLeave()");
  //   clearInterval(this.plot_timer); // остановить таймер при уходе со страницы
  //   this.plot_timer = null;
  //   next(); // обязательно вызывать next, иначе ломается вся навигация
  // },

  computed: {},

  watch: {},
}
</script>
