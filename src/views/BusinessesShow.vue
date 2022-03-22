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
    reviewDayjs: function (created_at) {
      return dayjs(created_at).toNow(true);
    },
    ratingSaying: function (rating) {
      if (rating > 4) {
        return "Wonderful!";
      } else if (rating > 3) {
        return "Good!";
      } else {
        return "Could be better...";
      }
    },
    ratingIcon: function (rating) {
      var icon = require("/src/assets/Question Mark.png");
      if (rating > 0.49) {
        icon = require("/src/assets/checkmark.png");
      } else if (rating < -0.49) {
        icon = require("/src/assets/Red X.png");
      }
      return icon;
    },
    toReviewEdit: function (review) {
      this.$router.push(`/reviews/edit/${review.id}`);
    },
  },
  mounted: function () {
    this.setupLeafletMap();
  },
};
</script>

<template>
  <div class="home">
    <!-- start listing-details section -->
    <section style="background-color: #e8d1ff">
      <div class="container">
        <div class="row">
          <div class="col-lg-8 margin-50px-bottom">
            <!-- Header -->
            <div class="listing-detail margin-50px-bottom sm-margin-35px-bottom">
              <h3 class="font-weight-500">{{ business.name }}</h3>
              <div>
                <ul class="padding-20px-tb padding-30px-lr rounded" style="background-color: #f1e3ff">
                  <li>
                    <i class="fas fa-map-marked-alt margin-10px-right text-theme-color"></i>
                    {{ display_address }}
                  </li>
                  <li>
                    <i class="fa fa-phone margin-10px-right text-theme-color"></i>
                    {{ business.display_phone }}
                  </li>
                </ul>
              </div>
            </div>

            <!-- Rating -->
            <div class="margin-50px-bottom sm-margin-35px-bottom">
              <h5 class="font-size20 border-bottom padding-20px-bottom">Cows Are Friends Rating</h5>
              <div class="row align-items-center" v-if="business.review_count">
                <div class="col-lg-3 col-md-4">
                  <div class="bg-theme padding-30px-tb text-center border-radius-4">
                    <h5 class="font-size40 no-margin-bottom text-white">{{ business.overall_rating }}</h5>
                    <h6 class="no-margin-bottom text-white font-size18">{{ ratingSaying(business.overall_rating) }}</h6>
                  </div>
                </div>
                <div class="col-lg-9 col-md-8 mb-30">
                  <h6>Veggie Options Rating: {{ business.veggie_options_rating }}</h6>
                  <h6>Menu labels:</h6>
                  <div class="sm-margin-10px-top">
                    <div>
                      Vegetarian
                      <img :src="ratingIcon(business.menu_vegetarian_labels)" alt="" />
                    </div>
                    <div>
                      Vegan
                      <img :src="ratingIcon(business.menu_vegan_labels)" alt="" />
                    </div>
                    <div>
                      Gluten-Free
                      <img :src="ratingIcon(business.menu_gluten_free_labels)" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row align-items-center" v-else>
                <div class="col-lg-3 col-md-4">
                  <div class="bg-theme padding-30px-tb text-center border-radius-4">
                    <h5 class="font-size40 no-margin-bottom text-white">?</h5>
                  </div>
                </div>
                <div class="col-lg-9 col-md-8 mb-30">
                  <h6>Be the first to review this restaurant!</h6>
                </div>
              </div>
            </div>

            <!-- Gallery -->
            <div class="margin-50px-bottom sm-margin-35px-bottom">
              <h5 class="font-size20 border-bottom padding-20px-bottom">Gallery</h5>
              <div class="row margin-30px-bottom">
                <div class="col-6">
                  <lightgallery
                    :settings="{ speed: 500, plugins: plugins }"
                    :onInit="onInit"
                    :onBeforeSlide="onBeforeSlide"
                  >
                    <a data-lg-size="1406-1390" class="gallery-item" :data-src="`${business.photos[0]}`">
                      <img class="img-responsive" :src="`${business.photos[0]}`" />
                    </a>
                  </lightgallery>
                </div>
                <div class="col-6">
                  <lightgallery>
                    <a
                      v-if="business.photos[1]"
                      data-lg-size="1406-1390"
                      class="gallery-item"
                      :data-src="`${business.photos[1]}`"
                    >
                      <img class="img-responsive" :src="`${business.photos[1]}`" />
                    </a>
                  </lightgallery>
                </div>
              </div>
            </div>
          </div>
          <!-- Side Bar -->
          <div class="col-lg-4">
            <div class="side-bar">
              <div class="widget">
                <div id="smallMapContainer"></div>
              </div>
              <div class="widget">
                <div class="widget-title margin-35px-bottom">
                  <h3>Categories</h3>
                </div>
                <ul class="widget-list" v-for="category in categories" v-bind:key="category">
                  <li>{{ category }}</li>
                </ul>
                <div>
                  <div class="price-range"></div>
                </div>
              </div>
              <div class="widget">
                <div class="widget-title">
                  <h3>More</h3>
                </div>
                <ul class="widget-list">
                  <li>Yelp Rating: {{ business.rating }}</li>
                  <li v-if="isLoggedIn">
                    <button class="butn" v-if="!favorited" v-on:click="createFavorite()">
                      Favorite this restaurant
                    </button>
                    <button class="butn" v-else v-on:click="deleteFavorite()">Unfavorite this restaurant</button>
                  </li>
                  <li>
                    <button
                      class="butn margin-30px-bottom"
                      v-if="!business.reviewed && !!isLoggedIn"
                      v-on:click="redirectToReview(business)"
                    >
                      Review this restaurant
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- Reviews -->
        <div class="margin-60px-bottom">
          <h2 class="border-bottom padding-20px-bottom">Reviews ({{ business.reviews.length }})</h2>
          <div class="comments-area">
            <div class="comment-box" v-for="review in business.reviews" v-bind:key="review.id">
              <div class="row">
                <div class="author-thumb col-xs-4 col-sm-3 col-md-2">
                  <h4>{{ review.user.name }}</h4>
                  <img
                    :src="review.user.image_url"
                    alt="/src/assets/cowsarefriends.png"
                    class="rounded-circle width-85 xs-width-100 avatar-picture"
                  />
                </div>
                <div class="comment-info col">
                  <div class="row margin-10px-bottom">
                    <div class="col-3">
                      <div class="bg-theme padding-30px-tb text-center border-radius-4">
                        <h5 class="font-size40 no-margin-bottom text-white">{{ review.overall_rating }}</h5>
                        <h6 class="no-margin-bottom text-white font-size14">
                          Options Rating:
                          {{ review.veggie_options_rating }}
                        </h6>
                      </div>
                    </div>
                    <div class="col">
                      {{ review.comment }}
                      <p v-if="review.recommended_dishes">
                        <i>Recommended Dish(es): {{ review.recommended_dishes }}</i>
                      </p>
                    </div>
                  </div>
                  <lightgallery
                    :settings="{ speed: 500, plugins: plugins }"
                    :onInit="onInit"
                    :onBeforeSlide="onBeforeSlide"
                  >
                    <a data-lg-size="1406-1390" class="gallery-item" :data-src="`${review.image_url}`">
                      <img class="img-responsive review-picture" :src="`${review.image_url}`" />
                    </a>
                  </lightgallery>
                  <p class="font-size12 margin-15px-right text-extra-dark-gray">
                    reviewed {{ reviewDayjs(review.created_at) }} ago
                  </p>
                  <div>
                    <button class="butn" v-if="user_id == review.user.id" v-on:click="toReviewEdit(review)">
                      Edit Your Review
                    </button>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end listing-details section -->
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
.avatar-picture {
  width: 85px;
  height: 100px;
}
.review-picture {
  max-width: 400px;
  max-height: 200px;
}
div {
  background-color: #e8d1ff;
}
</style>
