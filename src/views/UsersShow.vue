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
    <!-- start page title section -->
    <section class="page-title-section bg-img cover-background" style="background-color: #e8d1ff">
      <div class="container">
        <h1 style="color: #1a1a1a">My Profile</h1>
      </div>
    </section>
    <!-- end page title section -->

    <!-- start profile section -->
    <section style="background-color: #e8d1ff">
      <div class="container">
        <div class="row align-items-center margin-80px-bottom xs-margin-40px-bottom">
          <div class="col-md-5 xs-margin-20px-bottom">
            <div>
              <img class="border-radius-4" :src="user.image_url" alt="Profile Image" />
            </div>
          </div>
          <div class="col-md-7">
            <div class="padding-40px-left sm-no-padding-left">
              <h4
                class="font-size38 sm-font-size34 xs-font-size32 sm-margin-15px-bottom margin-20px-top sm-margin-5px-top"
              >
                {{ user.name }}
              </h4>
              <p class="margin-30px-bottom sm-margin-20px-bottom">
                <b>Welcome to Cows Are Friends, {{ user.name }}!</b>
                We hope you find this resource valuable when looking for restaurants that meet your accommodations!
              </p>
              <div>
                <router-link to="/favorites" class="butn margin-10px-bottom">
                  My Favorites
                  <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
              <div>
                <router-link to="/reviews" class="butn margin-10px-bottom">
                  My Reviews
                  <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
              <div>
                <router-link to="/users/me/edit" class="butn margin-10px-bottom">
                  Edit Profile
                  <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end profile section -->
  </div>
</template>

<style></style>
