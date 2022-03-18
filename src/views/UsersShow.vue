<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
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
  },
  methods: {},
};
</script>

<template>
  <div class="home">
    <div>
      <h2>{{ user.name }}</h2>
      <router-link to="/favorites">FavoritesIndex</router-link>
      <br />
      <img :src="user.image_url" alt="Image" />
      <br />
      <button v-on:click="this.$router.push(`/users/me/edit`)">Edit Profile</button>
    </div>
  </div>
</template>

<style></style>
