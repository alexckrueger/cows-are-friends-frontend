<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Cows are Friends.tm",
      message2: "UsersShow",
      user: {},
      updateUserParams: {},
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
  methods: {
    updateUser: function () {
      console.log(this.updateUserParams);
      axios.patch("/users/me", this.updateUserParams).then((response) => {
        console.log(response.data);
      });
    },
    deleteUser: function () {
      if (confirm("Are you sure you want to delete your account?")) {
        axios.delete("/users/me").then((response) => console.log(response.data));
      }
      this.$router.push(`/signup`);
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>{{ message2 }}</h2>
    <p>{{ user }}</p>
    <h2>{{ user.name }}</h2>
    <router-link to="/favorites">FavoritesIndex</router-link>
    <br />
    <img :src="user.image_url" alt="Image" />
    <h2>Edit Profile</h2>
    <form v-on:submit.prevent="updateRecipe()">
      <div>
        <label>Image URL:</label>
        <input type="text" v-model="updateUserParams.image_url" />
      </div>
      <button v-on:click="updateUser()">Save Changes</button>
    </form>
    <br />
    <button v-on:click="deleteUser()">Delete Profile</button>
  </div>
</template>

<style></style>
