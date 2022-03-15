<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Cows are Friends.tm",
      message2: "UsersEdit",
      updateUserParams: {},
      errors: [],
    };
  },
  methods: {
    updateUser: function () {
      this.errors = [];
      axios
        .patch("/users/me", this.updateUserParams)
        .then((response) => {
          console.log("User saved successfully", response.data);
        })
        .catch((error) => {
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
    <router-link to="/users/me">Back to your profile</router-link>
    <div v-if="errors.length > 0">
      <div v-for="error in errors" v-bind:key="error">
        <ul>
          <li>{{ error }}</li>
        </ul>
      </div>
    </div>
    <div>
      <div>
        <label>Name:</label>
        <input type="text" v-model="updateUserParams.name" />
      </div>
      <div>
        <label>Image URL:</label>
        <input type="text" v-model="updateUserParams.image_url" />
      </div>
      <button v-on:click="updateUser()">Save Changes</button>
      <br />
      <button v-on:click="deleteUser()">Delete Profile</button>
    </div>
  </div>
</template>

<style></style>
