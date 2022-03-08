<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Cows are Friends.tm",
      message2: "FavoritesIndex",
    };
  },
  created: function () {
    axios.get(`http://localhost:3000/favorites`).then((response) => console.log(response.data));
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>{{ message2 }}</h2>
  </div>
</template>

<style></style>
