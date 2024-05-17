<!--
  работа с картами:
  - загрузка геоданных из разных источников
  - слои с информацией, графиками, контурами, heatmap
  - ручная разметка (рисование фигур, TODO выгрузка в geoJSON)
  - получение координат/контуров по адресам
  - TODO курсор, координаты

  карты https://leafletjs.com/, https://github.com/Leaflet/Leaflet, npm install leaflet
    плагин для кластеризации маркеров https://github.com/Leaflet/Leaflet.markercluster
    vue-обёртка https://vue2-leaflet.netlify.app/, npm install leaflet vue2-leaflet --save
    панель рисования на карте - https://geoman.io/leaflet-geoman, npm i @geoman-io/leaflet-geoman-free
    плагин для отображения геоданных (не только leaflet) https://developers.arcgis.com/esri-leaflet/ 
    плагин для отображения только heatmap.js https://github.com/pa7/heatmap.js
  карты https://openlayers.org/
    vue-обёртка https://vuelayers.github.io/#/demo
  карты с огромным функционалом (3D, слои и пр.) https://github.com/mapbox/mapbox-gl-js
  карты 3D https://github.com/CesiumGS/cesium, npm install cesium
  геометрическая инфографика на картах https://www.jasondavies.com/
  геометрическая инфографика на картах https://jvectormap.com/

  источники данных:
    http://maps.stamen.com/, https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png
    OSM, https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
-->

<!-- Инсталляция
  npm install leaflet vue2-leaflet --save
  npm i @geoman-io/leaflet-geoman-free
-->

<template>
  <v-row style="height: 100%" no-gutters>
    <v-col
      cols="12" md="6" class="pa-1" no-gutters  style="height: 100%"
    >
      <v-card class="pa-1" style="height: 100%;width:100%">
        <v-card-title>Leaflet.js</v-card-title>
        <l-map style="height: 92%;width:100%; flex: 1 0.95 auto;"
          :zoom="map_zoom"
          :center="map_center"
          ref="map">

          <l-tile-layer :url="map_url" :attribution="map_attribution"></l-tile-layer>
          
          <l-polygon 
           :lat-lngs="map_polygon"
           :color="'green'"
          ></l-polygon>

          <!-- https://vue2-leaflet.netlify.app/components/LGeoJson.html#demo -->
          <l-geo-json :geojson="map_geojson"></l-geo-json>
          
          <l-marker :lat-lng="map_marker_latlon"></l-marker>
        </l-map>
      </v-card>
    </v-col>
    <v-col cols="12" md="6"  class="pa-1">
      <v-card class="pa-1" style="height: 100%;width:100%">
        <v-card-title>Openlayers.org</v-card-title>
        <div id="mapbox_id"
          style="height: 92%;width:100%; flex: 1 1 auto;"
        ></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

import L from "leaflet";
import {
  LMap,
  LTileLayer /*, LMarker */,
  LMarker,
  // LControl,
  LPolygon,
  LGeoJson,
} from "vue2-leaflet";
// import LDraw from 'leaflet-draw'; // устаревший
import "leaflet/dist/leaflet.css";

// блок кода для прогрузки маркеров-"капелек" для leaflet
delete Icon.Default.prototype._getIconUrl;
import { Icon }  from 'leaflet';
Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

// аналогичный блок, не работает
// import 'leaflet/dist/images/marker-shadow.png';
// import 'leaflet/dist/images/marker-icon.png';

import "@geoman-io/leaflet-geoman-free";
import "@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import axios from "axios";

export default {
  name: 'MapView',

  components: {
    LMap,
    LTileLayer,
    LPolygon,
    LGeoJson,
    LMarker,
    // LControl
  },

  data(){
    return {
      map_object:null,
      map_attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      map_zoom: 12,
      map_center: [55.854138, 38.442477], //[55.751244, 37.618423],
      map_url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      map_polygon:[
        [37.290502, 55.8019897],
        [37.2932645, 55.7980647],
        [37.2931684, 55.7963971],
        [37.2941684, 55.7966347],
        [37.2941174, 55.7967126],
        [37.2944097, 55.7967872],
        [37.2944673, 55.7967167],
        [37.2982173, 55.7976281],
        [37.3023539, 55.7986335],
        [37.3027769, 55.8012728],
        [37.3029227, 55.8024772],
        [37.3032652, 55.8031819],
        [37.3035641, 55.8035588],
        [37.2996863, 55.8035219],
        [37.2986365, 55.8034501],
        [37.2977692, 55.803354],
        [37.2966321, 55.8032024],
        [37.2954221, 55.8029975],
        [37.290502, 55.8019897],
      ],
      map_geojson : null,
      map_marker_latlon : [55.854138, 38.442477], // [55.751244, 37.618423],

      mapbox_object : null,
      mapbox_marker : null,
      geojson : {
        'type': 'FeatureCollection',
        'features': [
          {
            typ: 'Feature',
            properties: {
              name: 'Everest',
              height: 8849
            },
            geometry: {
              type: 'Point',
              coordinates: [86.925278, 27.988056]
            }
          },
        ],
      }
    }
  },

  methods: {
    async getGeoJSON(name /*название улицы или нас.пункта*/)
    {
      await axios
      .get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: name,
          format: "json",
          polygon: 1,
          polygon_geojson: 1,
        },
      })
      .then((response) => {
        // https://vue2-leaflet.netlify.app/components/LGeoJson.html#demo
        this.map_geojson = response.data[0].geojson;
        console.log("getGeoJSON():", response.data[0]);
        this.map_center = [response.data[0].lat, response.data[0].lon];
        return response.data[0].geojson;
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
    },
  },

  beforeCreate(){},

  created() {},

  beforeMount(){},

  mounted() {
    this.map_object = this.$refs.map.mapObject;
    console.log("this.map_object = ", this.map_object);
    L.marker([51.50915, -0.096112], { pmIgnore: true }).addTo(this.map_object);
    this.map_object.pm.addControls({
      position: "topleft",
      drawCircle: true, // отмена круговой области в панели
      drawMarker: true, // отмена маркера
      drawCircleMarker: true, // отмена кругового маркера
      drawText: true, // отмена текста
    });

    this.getGeoJSON("ногинск");

    mapboxgl.accessToken = '<your access token here>'; // ОБЯЗАТЕЛЬНО ОСТАВИТЬ ТАК, ИНАЧЕ ОТРУБИТСЯ!
    this.mapbox_object = new mapboxgl.Map({
      container: 'mapbox_id', // container ID
      projection: 'globe',
      center: [38.442477, 55.854138], // starting position [lng, lat]
      zoom: 2, // starting zoom
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            'type': 'raster',
            'tiles': [
              // возможные варианты (может другие есть, надо поискать)
              //'https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
              //'https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
              'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            'tileSize': 256,
          },
        },
        'layers': [
          {
            'id': 'simple-tiles',
            'type': 'raster',
            'source': 'raster-tiles',
            'minzoom': 0,
            'maxzoom': 22
          }
        ]
      },
    });

    /* добавление эффекта атмосферы над глобусом */
    this.mapbox_object.on('style.load', () => {
      this.mapbox_object.setFog({
          color: 'rgb(186, 210, 235)', // Lower atmosphere
          'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
          'horizon-blend': 0.02, // Atmosphere thickness (default 0.2 at low zooms)
          'space-color': 'rgb(11, 11, 25)', // Background color
          'star-intensity': 1.0// Background star brightness (default 0.35 at low zoooms )
      });

      /* добавление загоризонтных маркеров */
      // const el = document.createElement('div');
      // el.className = 'marker';
      // // const size = this.geojson.features[0].properties.height / 100;
      // el.style.width = "50px" //`${size}px`;
      // el.style.height = "50px" //`${size}px`;
      // const popup = new mapboxgl.Popup({ offset: 25 });
      // popup.setHTML(
      //   `<h2>${this.geojson.features[0].properties.name}</h2>${this.geojson.features[0].properties.height}m<br/>`
      // );
      // this.mapbox_marker = new mapboxgl.Marker({
      //   // element: el,
      //   // Point markers toward the nearest horizon
      //   rotationAlignment: 'horizon',
      //   offset: [0, -25]
      // })
      // .setLngLat(this.geojson.features[0].geometry.coordinates)
      // .setPopup(popup) // настройка всплывающей подсказки
      // .addTo(this.mapbox_object);
    });

    /* добавление растра - карта погоды над америкой */
    this.mapbox_object.on('load', () => {

      this.mapbox_object.addSource('radar', {
        'type': 'image',
        'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
        'coordinates': [
        [-80.425, 46.437],
        [-71.516, 46.437],
        [-71.516, 37.936],
        [-80.425, 37.936]
        ]
      });

      this.mapbox_object.addLayer({
        id: 'radar-layer',
        'type': 'raster',
        'source': 'radar',
        'paint': {
        'raster-fade-duration': 0
        }
      });

    });

    /* добавление загоризонтных маркеров */
    const el = document.createElement('div');
    el.className = 'mapboxgl_custom_marker';
    // const size = this.geojson.features[0].properties.height / 100;
    el.style.width = "50px" //`${size}px`;
    el.style.height = "50px" //`${size}px`;
    const popup = new mapboxgl.Popup({ offset: 25 });
    popup.setHTML(
      `<h2>${this.geojson.features[0].properties.name}</h2>${this.geojson.features[0].properties.height}m<br/>`
    );
    this.mapbox_marker = new mapboxgl.Marker({
      element: el,
      // Point markers toward the nearest horizon
      rotationAlignment: 'horizon',
      offset: [0, -25]
    })
    .setLngLat(this.geojson.features[0].geometry.coordinates)
    .setPopup(popup) // настройка всплывающей подсказки
    .addTo(this.mapbox_object);
  },

  computed: {},

  watch: {},

}
</script>

<style>
.leaflet-attribution-flag { /*убрать флаг UA*/
	display: none;
  visibility: hidden;
}
</style>
