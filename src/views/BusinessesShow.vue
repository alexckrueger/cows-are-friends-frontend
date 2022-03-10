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
    };
  },
  created: function () {
    axios.get(`/businesses/${this.$route.params.id}`).then((response) => {
      this.business = response.data;
      this.favorited = response.data.favorited;
      this.favorited_id = response.data.favorited_id;
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
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>{{ message2 }}</h2>
    <p>{{ business }}</p>
    <router-link to="/">Back to search</router-link>
    <p>name: {{ business.name }}</p>
    <p>overall_rating: {{ business.overall_rating }}</p>
    <p>veggie_friendly_menu_rating: {{ business.veggie_friendly_menu_rating }}</p>
    <p>veggie_options_rating: {{ business.veggie_options_rating }}</p>
    <p>images: {{ business.photos }}</p>
    <img :src="business.photos[0]" alt="" />
    <div v-for="category in business.categories" v-bind:key="category">
      <p>Category: {{ category["title"] }}</p>
    </div>
    <p>phone number: {{ business.display_phone }}</p>
    <p>yelp rating: {{ business.rating }}</p>
    <div v-if="isLoggedIn">
      <p>Has user favorited? {{ favorited }}</p>
      <p>Has user reviewed? {{ business.reviewed }}</p>
      <button v-if="!favorited" v-on:click="createFavorite()">Favorite this restaurant</button>
      <button v-else v-on:click="deleteFavorite()">Unfavorite this restaurant</button>
      <button v-if="!business.reviewed" v-on:click="this.$router.push(`/reviews/new`)">Review this restaurant</button>
    </div>
    <div v-for="review in business.reviews" v-bind:key="review.id">
      <h3>REVIEW</h3>
      <p>reviewer: {{ review.user.name }}</p>
      <p>overall_rating: {{ review.overall_rating }}</p>
      <p>veggie_friendly_menu_rating: {{ review.veggie_friendly_menu_rating }}</p>
      <p>veggie_options_rating: {{ review.veggie_options_rating }}</p>
      <p>recommended_dishes: {{ review.recommended_dishes }}</p>
      <p>comment: {{ review.comment }}</p>
      <p>image: {{ review.image_url }}</p>
    </div>
  </div>
</template>

<style></style>
