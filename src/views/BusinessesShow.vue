<script>
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
      message: "Cows are Friends.tm",
      message2: "BusinessesShow",
      business: [],
      favorited: false,
      favorited_id: 0,
      display_photo: "",
      display_address: "",
      categories: [],
      myIcon: L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/723/723633.png",
        iconSize: [30, 40],
        popupAnchor: [0, -26],
      }),
      center: [],
      mapDiv: "",
    };
  },
  created: function () {
    axios.get(`/businesses/${this.$route.params.id}`).then((response) => {
      this.center = [response.data.coordinates.latitude, response.data.coordinates.longitude];
      this.business = response.data;
      this.favorited = response.data.favorited;
      this.favorited_id = response.data.favorited_id;
      this.display_photo = response.data.photos[0];
      this.display_address = response.data.location.display_address[0].concat(
        ", ",
        response.data.location.display_address[1]
      );
      response.data.categories.forEach((category) => {
        this.categories.push(category["title"]);
      });
    });
  },
  methods: {
    createFavorite: function () {
      axios.post(`/favorites`, { business_id: this.business.id }).then((response) => {
        console.log(response.data);
        this.favorited_id = response.data.id;
      });
      this.favorited = true;
    },
    deleteFavorite: function () {
      axios.delete(`/favorites/${this.favorited_id}`).then((response) => console.log(response.data));
      this.favorited = false;
      this.favorited_id = 0;
    },
    redirectToReview: function (business) {
      this.$router.push(`/reviews/new?id=${business.id}`);
    },
    setupLeafletMap: function () {
      var mapboxKey = process.env.VUE_APP_MAPBOX_API_KEY;
      this.mapDiv = L.map("mapContainer").setView(this.center, 15);
      L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution:
          'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        accessToken: mapboxKey,
      }).addTo(this.mapDiv);
      var marker = L.marker([this.business.coordinates.latitude, this.business.coordinates.longitude], {
        icon: this.myIcon,
      }).bindPopup(this.business.name);
      marker.addTo(this.mapDiv);
    },
  },
  watch: {
    business() {
      this.setupLeafletMap();
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <button v-on:click="setupLeafletMap()">map!</button>
    <router-link to="/">Back to search</router-link>
    <h1>{{ business.name }}</h1>
    <div id="mapContainer"></div>
    <div v-if="business.review_count">
      <p>overall_rating: {{ business.overall_rating }}</p>
      <p>veggie_friendly_menu_rating: {{ business.veggie_friendly_menu_rating }}</p>
      <p>veggie_options_rating: {{ business.veggie_options_rating }}</p>
    </div>
    <div v-else>
      <p>Be the first to review this restaurant!</p>
    </div>
    <div v-if="business.photos">
      <img :src="business.photos[0]" alt="" />
    </div>
    <p>Categories: {{ categories.join(", ") }}</p>
    <p>{{ display_address }}</p>
    <p>phone number: {{ business.display_phone }}</p>
    <p>yelp rating: {{ business.rating }}</p>
    <div v-if="isLoggedIn">
      <p>Has user favorited? {{ favorited }}</p>
      <p>Has user reviewed? {{ business.reviewed }}</p>
      <button v-if="!favorited" v-on:click="createFavorite()">Favorite this restaurant</button>
      <button v-else v-on:click="deleteFavorite()">Unfavorite this restaurant</button>
      <button v-if="!business.reviewed" v-on:click="redirectToReview(business)">Review this restaurant</button>
    </div>
    <div v-for="review in business.reviews" v-bind:key="review.id">
      <h3>REVIEW</h3>
      <p>reviewer: {{ review.user.name }}</p>
      <p>overall_rating: {{ review.overall_rating }}</p>
      <p>veggie_friendly_menu_rating: {{ review.veggie_friendly_menu_rating }}</p>
      <p>veggie_options_rating: {{ review.veggie_options_rating }}</p>
      <p v-if="review.recommended_dishes">recommended_dishes: {{ review.recommended_dishes }}</p>
      <p>comment: {{ review.comment }}</p>
      <img v-if="review.image_url" :src="review.image_url" />
    </div>
  </div>
</template>

<style>
#mapContainer {
  width: 30vw;
  height: 30vh;
}
</style>
