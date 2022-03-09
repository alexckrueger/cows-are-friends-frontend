<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Cows are Friends.tm",
      message2: "BusinessesIndex",
      businesses: [],
      search: "",
    };
  },
  created: function () {
    axios.get("http://localhost:3000/businesses").then((response) => {
      console.log(response.data), (this.businesses = response.data);
    });
  },
  methods: {
    routeToBusinessShow: function (business) {
      console.log(business.id);
      this.$router.push(`/businesses/${business.id}`);
    },
    searchBusinesses: function () {
      console.log(this.search);
    },
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
    <p>{{ businesses[0] }}</p>
    <div v-for="business in businesses" v-bind:key="business.id">
      <h2>{{ business.name }}</h2>
      <p>Overall Rating: {{ business.overall_rating }} ({{ business.review_count }} reviews)</p>
      <p>Veggie Options Rating: {{ business.veggie_options_rating }}</p>
      <p>Veggie-friendly Menu Rating: {{ business.veggie_friendly_menu_rating }}</p>
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
</style>
