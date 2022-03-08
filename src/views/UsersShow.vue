<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Cows are Friends.tm",
      message2: "UsersShow",
    };
  },
  created: function () {
    axios.get("http://localhost:3000/users/me").then((response) => console.log(response.data));
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
