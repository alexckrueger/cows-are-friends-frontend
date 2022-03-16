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
      mapDiv: "",
      myIcon: L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/723/723633.png",
        iconSize: [30, 40],
        popupAnchor: [0, -26],
      }),
      markerLayer: [],
      markers: [],
    };
  },
  created: function () {
    axios.get("/businesses").then((response) => {
      console.log(response.data), (this.businesses = response.data);
    });
  },
  methods: {
    searchBusinesses: function () {
      this.businesses = [];
      axios.get(`/businesses?search=${this.search}`).then((response) => {
        console.log(response.data), (this.businesses = response.data);
      });
      // Clear previous markers if they exist
      if (this.markerLayer) {
        this.mapDiv.removeLayer(this.markerLayer);
      }
    },
    setupLeafletMap: function () {
      var mapboxKey = process.env.VUE_APP_MAPBOX_API_KEY;
      this.mapDiv = L.map("mapContainer").setView(this.center, 13);
      L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution:
          'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        accessToken: mapboxKey,
      }).addTo(this.mapDiv);
    },
    addMarkersToMap: function () {
      // Display markers for each business
      this.markers = [];
      this.businesses.forEach((business) => {
        this.markers.push(
          L.marker([business.coordinates.latitude, business.coordinates.longitude], { icon: this.myIcon }).bindPopup(
            business.name
          )
        );
      });
      this.markerLayer = L.layerGroup(this.markers);
      this.markerLayer.addTo(this.mapDiv);
    },
    pluralizeReview: function (business) {
      if (business.review_count > 1) {
        return "reviews";
      } else return "review";
    },
  },
  mounted: function () {
    this.setupLeafletMap();
  },
  watch: {
    businesses() {
      // adds markers to map whenever the business array updates
      this.addMarkersToMap();
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>{{ message2 }}</h2>
    <div>
      <input type="search" v-model="search" />
      <button v-on:click="searchBusinesses">Search</button>
    </div>
    <div id="mapContainer"></div>
    <div v-for="business in businesses" v-bind:key="business.id">
      <h2>{{ business.name }}</h2>
      <div v-if="business.review_count > 0">
        <p>
          Overall Rating: {{ business.overall_rating }} ({{ business.review_count }} {{ pluralizeReview(business) }})
        </p>
        <p>Veggie Options Rating: {{ business.veggie_options_rating }}</p>
        <p>Veggie-friendly Menu Rating: {{ business.veggie_friendly_menu_rating }}</p>
      </div>
      <div v-else>
        <p>Be the first to review this restaurant!</p>
      </div>
      <div v-for="category in business.categories" v-bind:key="category">
        {{ category["title"] }}
      </div>
      <img :src="business.image_url" alt="" />
      <br />
      <button v-on:click="this.$router.push(`/businesses/${business.id}`)">to business show page</button>
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
