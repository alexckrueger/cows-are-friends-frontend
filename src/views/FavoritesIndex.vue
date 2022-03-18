<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      favorites: [],
    };
  },
  created: function () {
    axios
      .get("/users/me")
      .then((response) => {
        this.user = response.data;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.$router.push("/login");
        }
      });
    axios.get(`http://localhost:3000/favorites`).then((response) => {
      this.favorites = response.data;
    });
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ user.name }} Favorites</h1>
    <div v-for="favorite in favorites" v-bind:key="favorite.id">
      <h3>{{ favorite.business.name }}</h3>
      <p>{{ favorite.business.categories.join(", ") }}</p>
      <img :src="favorite.business.image_url" alt="" />
      <br />
      <router-link :to="`/businesses/${favorite.business.id}`">To Restaurant Page</router-link>
    </div>
  </div>
</template>

<style></style>
