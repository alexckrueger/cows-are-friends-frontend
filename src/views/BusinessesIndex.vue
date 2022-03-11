<script>
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  data: function () {
    return {
      message: "Cows are Friends.tm",
      message2: "BusinessesIndex",
      businesses: [],
      search: "",
      center: [41.8781, -87.6298],
    };
  },
  created: function () {
    axios.get("/businesses").then((response) => {
      console.log(response.data), (this.businesses = response.data);
    });
  },
  methods: {
    routeToBusinessShow: function (business) {
      console.log(business.id);
      this.$router.push(`/businesses/${business.id}`);
    },
    searchBusinesses: function () {
      this.businesses = [];
      axios.get(`/businesses?search=${this.search}`).then((response) => {
        console.log(response.data), (this.businesses = response.data);
      });
    },
    setupLeafletMap: function () {
      var mapboxKey = process.env.VUE_APP_MAPBOX_API_KEY;
      const mapDiv = L.map("mapContainer").setView(this.center, 14);
      L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution:
          'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        accessToken: mapboxKey,
      }).addTo(mapDiv);
    },
  },
  mounted: function () {
    this.setupLeafletMap();
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>{{ message2 }}</h2>
    <div>
      <input type="text" v-model="search" />
      <button v-on:click="searchBusinesses">Search</button>
    </div>
    <div id="mapContainer"></div>
    <div v-for="business in businesses" v-bind:key="business.id">
      <h2>{{ business.name }}</h2>
      <div v-if="business.review_count > 0">
        <p>Overall Rating: {{ business.overall_rating }} ({{ business.review_count }} reviews)</p>
        <p>Veggie Options Rating: {{ business.veggie_options_rating }}</p>
        <p>Veggie-friendly Menu Rating: {{ business.veggie_friendly_menu_rating }}</p>
      </div>
      <div v-else>
        <p>Be the first to review this restaurant!</p>
      </div>
      <div v-for="category in business.categories" v-bind:key="category.alias">
        {{ category.title }}
      </div>
      <img :src="business.image_url" alt="" />
      <br />
      <button v-on:click="routeToBusinessShow(business)">to business show page</button>
    </div>
  </div>
</template>

<style>
img {
  height: 200px;
  width: auto;
}
#mapContainer {
  width: 100vw;
  height: 60vh;
}
</style>
