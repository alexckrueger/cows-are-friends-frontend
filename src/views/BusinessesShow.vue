<script>
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Lightgallery from "lightgallery/vue";
import lgZoom from "lightgallery/plugins/zoom";
import lgVideo from "lightgallery/plugins/video";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

export default {
  components: {
    Lightgallery,
  },
  data: function () {
    return {
      isLoggedIn: !!localStorage.jwt,
      user_id: localStorage.user_id,
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
      plugins: [lgZoom, lgVideo],
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
      this.mapDiv = L.map("smallMapContainer").setView(this.center, 15);
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
    onInit: () => {
      console.log("lightGallery has been initialized");
    },
    onBeforeSlide: () => {
      console.log("calling before slide");
    },
    testDayjs: function (created_at) {
      return dayjs(created_at).toNow(true);
    },
    deleteReview: function (review) {
      if (confirm("Are you sure you to delete this?")) {
        axios.delete(`/reviews/${review.id}`).then((response) => console.log("Success!", response.data));
        this.$router.go();
      }
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
    <router-link to="/">Back to search</router-link>
    <h1>{{ business.name }}</h1>
    <div v-if="business.photos">
      <lightgallery :settings="{ speed: 500, plugins: plugins }" :onInit="onInit" :onBeforeSlide="onBeforeSlide">
        <a data-lg-size="1406-1390" class="gallery-item" :data-src="`${business.photos[0]}`">
          <img class="img-responsive" :src="`${business.photos[0]}`" />
        </a>
        <a v-if="business.photos[1]" data-lg-size="1406-1390" class="gallery-item" :data-src="`${business.photos[1]}`">
          <img class="img-responsive" :src="`${business.photos[1]}`" />
        </a>
        <a v-if="business.photos[2]" data-lg-size="1406-1390" class="gallery-item" :data-src="`${business.photos[2]}`">
          <img class="img-responsive" :src="`${business.photos[2]}`" />
        </a>
      </lightgallery>
    </div>

    <div id="smallMapContainer"></div>
    <div v-if="business.review_count">
      <p>overall_rating: {{ business.overall_rating }}</p>
      <p>veggie_options_rating: {{ business.veggie_options_rating }}</p>
      <p>Menu labels:</p>
      <div>
        Vegetarian: {{ business.menu_vegetarian_labels }}, Vegan: {{ business.menu_vegan_labels }}, Vegan:
        {{ business.menu_gluten_free_labels }}
      </div>
    </div>
    <div v-else>
      <p>Be the first to review this restaurant!</p>
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
      <p>reviewed {{ testDayjs(review.created_at) }} ago</p>
      <p>overall_rating: {{ review.overall_rating }}</p>
      <p>Menu labels:</p>
      <div>
        Vegetarian: {{ review.menu_vegetarian_labels }}, Vegan: {{ review.menu_vegan_labels }}, Vegan:
        {{ review.menu_gluten_free_labels }}
      </div>
      <p>veggie_options_rating: {{ review.veggie_options_rating }}</p>
      <p v-if="review.recommended_dishes">recommended_dishes: {{ review.recommended_dishes }}</p>
      <p>comment: {{ review.comment }}</p>
      <img v-if="review.image_url" :src="review.image_url" />
      <button v-if="user_id == review.user.id" v-on:click="deleteReview(review)">Delete Your Review</button>
    </div>
  </div>
</template>

<style>
#smallMapContainer {
  width: 30vw;
  height: 30vh;
}
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lightgallery.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-zoom.css");
@import url("https://cdn.jsdelivr.net/npm/lightgallery@2.0.0-beta.4/css/lg-video.css");
body {
  margin: 0;
}
.gallery-item {
  margin: 5px;
}
</style>
