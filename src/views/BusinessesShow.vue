<script>
import axios from "axios";

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
    };
  },
  created: function () {
    axios.get(`/businesses/${this.$route.params.id}`).then((response) => {
      this.business = response.data;
      this.favorited = response.data.favorited;
      this.favorited_id = response.data.favorited_id;
      this.display_photo = response.data.photos[0];
      this.display_address = response.data.location.display_address[0].concat(
        ", ",
        response.data.location.display_address[1]
      );
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
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <router-link to="/">Back to search</router-link>
    <h1>{{ business.name }}</h1>
    <p>overall_rating: {{ business.overall_rating }}</p>
    <p>veggie_friendly_menu_rating: {{ business.veggie_friendly_menu_rating }}</p>
    <p>veggie_options_rating: {{ business.veggie_options_rating }}</p>
    <p>images: {{ business.photos }}</p>
    <img :src="display_photo" alt="" />
    <div v-for="category in business.categories" v-bind:key="category">
      <p>Category: {{ category["title"] }}</p>
    </div>
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

<style></style>
