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
    <!-- start page title section -->
    <div class="page-title-section bg-img cover-background padding-20px-top" style="background-color: #e8d1ff">
      <div class="container">
        <h1 style="color: #1a1a1a">My Favorites</h1>
      </div>
    </div>
    <!-- end page title section -->

    <!-- start favorites section -->
    <div style="background-color: #e8d1ff">
      <div class="container">
        <router-link class="butn margin-15px-bottom" :to="`/users/me`">
          <span><i class="fas fa-arrow-left"></i></span>
          Back to My Profile
        </router-link>
        <div class="row">
          <!-- start favorites -->
          <div
            class="col-lg-4 col-md-6 col-sm-12 margin-30px-bottom"
            v-for="favorite in favorites"
            v-bind:key="favorite.id"
          >
            <div class="card border-0 shadow h-100">
              <a href="#">
                <img class="card-img-top rounded card-img" :src="favorite.business.image_url" alt="" />
              </a>
              <div class="card-body padding-30px-all">
                <h5 class="card-title font-size22 font-weight-500 magin-20px-bottom">
                  <a href="blog-details.html" class="text-extra-dark-gray">{{ favorite.business.name }}</a>
                </h5>
                <div class="margin-10px-bottom">
                  <span class="font-size12 margin-15px-right text-extra-dark-gray">
                    {{ favorite.business.categories.join(", ") }}
                  </span>
                </div>
                <p class="no-margin-bottom">
                  <router-link :to="`/businesses/${favorite.business.id}`">To Restaurant Page</router-link>
                  <i class="fas fa-arrow-right"></i>
                </p>
              </div>
            </div>
          </div>
          <!-- end favorites -->
        </div>
      </div>
    </div>
    <!-- end favorites section -->
  </div>
</template>

<style>
.card-img {
  max-height: 458px;
}
</style>
