<script>
import axios from "axios";

export default {
  data: function () {
    return {
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
          this.$router.push(`/users/me`);
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
    <!-- start contact form -->
    <section class="bg-light-gray contact-form">
      <div class="container margin-30px-top">
        <div class="row">
          <div class="col-md-9 form-list center-col">
            <div class="row">
              <div class="col-md-12 margin-15px-bottom">
                <router-link class="butn" :to="`/users/me`">Back to My Profile</router-link>
              </div>
              <div class="form-group col-md-12">
                <input
                  type="text"
                  class="form-control no-margin-bottom padding-10px-tb"
                  name="exampleInputName"
                  id="exampleInputName"
                  placeholder="Name"
                />
              </div>
              <div class="form-group col-md-12">
                <input
                  type="text"
                  class="form-control no-margin-bottom padding-10px-tb"
                  name="exampleInputTitle"
                  id="exampleInputTitle"
                  placeholder="Image URL"
                />
              </div>
              <div v-if="errors.length > 0" class="form-group col-md-12">
                <div v-for="error in errors" v-bind:key="error">
                  <ul>
                    <li>{{ error }}</li>
                  </ul>
                </div>
              </div>

              <div class="col-md-12">
                <button v-on:click="updateUser()" class="butn"><span>Save Changes</span></button>
              </div>
              <div class="col-md-12 margin-15px-top">
                <button v-on:click="deleteUser()" class="butn"><span>Delete Profile</span></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end contact form -->
  </div>
</template>

<style></style>
