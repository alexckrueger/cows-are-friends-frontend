<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Cows are Friends.tm",
      message2: "BusinessesShow",
      business: [],
    };
  },
  created: function () {
    axios
      .get(`http://localhost:3000/businesses/${this.$route.params.id}`)
      .then((response) => (this.business = response.data));
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>{{ message2 }}</h2>
    <p>{{ business }}</p>
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
    <p>Has user favorited? {{ business.favorited }}</p>
    <p>Has user reviewed? {{ business.reviewed }}</p>
    <div v-for="review in business.reviews" v-bind:key="review.id">
      <h3>REVIEW</h3>
      <p>reviewer: {{ review.user }}</p>
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
