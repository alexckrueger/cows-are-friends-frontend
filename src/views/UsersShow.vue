<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Cows are Friends.tm",
      message2: "UsersShow",
      user: {},
      updateUserParams: {},
      showEdit: false,
      errors: [],
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
      axios
        .patch("/users/me", this.updateUserParams)
        .then((response) => {
          console.log("User saved successfully", response.data);
          this.$router.go();
        })
        .catch((error) => {
          this.errors = [];
          this.errors = error.response.data.errors;
        });
    },
    deleteUser: function () {
      if (confirm("Are you sure you want to delete your account?")) {
        axios.delete("/users/me").then((response) => console.log(response.data));
        this.$router.push(`/signup`);
      }
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>{{ message2 }}</h2>
    <div v-if="errors.length > 0">{{ errors }}</div>
    <div v-if="!showEdit">
      <h2>{{ user.name }}</h2>
      <router-link to="/favorites">FavoritesIndex</router-link>
      <br />
      <img :src="user.image_url" alt="Image" />
      <br />
      <button v-on:click="showEdit = !showEdit">Edit Profile</button>
    </div>
    <div v-else>
      <div>
        <label>Name:</label>
        <input type="text" v-model="updateUserParams.name" />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" v-model="updateUserParams.image_url" />
      </div>
      <button v-on:click="updateUser()">Save Changes</button>
      <button v-on:click="showEdit = !showEdit">Cancel</button>
      <br />
      <button v-on:click="deleteUser()">Delete Profile</button>
    </div>
  </div>
</template>

<style></style>
