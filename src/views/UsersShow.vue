<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Cows are Friends.tm",
      message2: "UsersShow",
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
    <h1>{{ message }}</h1>
    <h2>{{ message2 }}</h2>
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
