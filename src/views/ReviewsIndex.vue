<script>
import axios from "axios";

export default {
  data: function () {
    return {
      user: {},
      reviews: [],
    };
  },
  created: function () {
    axios
      .get("/users/me")
      .then((response) => {
        this.user = response.data;
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status == 401) {
          this.$router.push("/login");
        }
      });
    axios.get(`/reviews`).then((response) => {
      this.reviews = response.data;
      console.log(this.reviews);
    });
  },
  methods: {
    toReviewEdit: function (review) {
      this.$router.push(`/reviews/edit/${review.id}`);
    },
  },
};
</script>

<template>
  <div class="home">
    <!-- start page title section -->
    <div class="page-title-section bg-img cover-background padding-20px-top" style="background-color: #e8d1ff">
      <div class="container">
        <h1 style="color: #1a1a1a">My Reviews</h1>
      </div>
    </div>
    <!-- end page title section -->

    <!-- start reviews section -->
    <div style="background-color: #e8d1ff">
      <div class="container">
        <router-link class="butn margin-15px-bottom" :to="`/users/me`">
          <span><i class="fas fa-arrow-left"></i></span>
          Back to My Profile
        </router-link>
        <div class="row" v-if="reviews.length > 0">
          <!-- start reviews -->
          <div class="col-lg-4 col-md-6 col-sm-12 margin-30px-bottom" v-for="review in reviews" v-bind:key="review.id">
            <div class="card border-0 shadow h-100">
              <a href="#">
                <img class="card-img-top rounded card-img" :src="review.business.image_url" alt="" />
              </a>
              <div class="card-body padding-30px-all">
                <h5 class="card-title font-size22 font-weight-500 magin-20px-bottom">
                  <a href="blog-details.html" class="text-extra-dark-gray">{{ review.business.name }}</a>
                </h5>
                <div class="margin-10px-bottom">
                  <span class="font-size12 margin-15px-right text-extra-dark-gray">
                    Overall Rating: {{ review.overall_rating }}
                  </span>
                  <span class="font-size12 margin-15px-right text-extra-dark-gray">
                    Options Rating: {{ review.veggie_options_rating }}
                  </span>
                </div>
                <p class="no-margin-bottom font-size14">
                  {{ review.comment }}
                </p>
                <p class="no-margin-bottom">
                  <button class="butn margin-5px-top" v-on:click="toReviewEdit(review)">Edit My Review</button>
                </p>
                <p class="no-margin-bottom margin-5px-top">
                  <router-link :to="`/businesses/${review.business.id}`" class="butn">
                    To Restaurant Page
                    <i class="fas fa-arrow-right"></i>
                  </router-link>
                </p>
              </div>
            </div>
          </div>
          <!-- end reviews -->
        </div>
        <div
          class="page-title-section bg-img cover-background padding-20px-top"
          style="background-color: #e8d1ff"
          v-else
        >
          <h3>You have no Reviews :(</h3>
        </div>
      </div>
    </div>
    <!-- end reviews section -->
  </div>
</template>

<style>
.card-img {
  max-height: 458px;
}
</style>
