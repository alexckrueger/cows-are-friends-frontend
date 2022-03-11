<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Cows are Friends.tm",
      message2: "ReviewsNew",
      business: [],
      newReview: { business_id: this.$route.query.id },
      errors: [],
      display_address: "",
      display_photo: "",
    };
  },
  created: function () {
    axios.get(`/businesses/${this.$route.query.id}`).then((response) => {
      this.business = response.data;
      this.display_photo = response.data.photos[0];
      this.display_address = response.data.location.display_address[0].concat(
        ", ",
        response.data.location.display_address[1]
      );
    });
  },
  methods: {
    createReview: function () {
      axios
        .post(`/reviews`, this.newReview)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/businesses/${this.$route.query.id}`);
        })
        .catch((errors) => {
          this.errors = errors.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <button @click="$router.go(-1)">Back to Restaurant</button>
    <h2>{{ business.name }}</h2>
    <p>{{ display_address }}</p>
    <img :src="display_photo" alt="" />

    <form action="submit" v-on:submit.prevent="createReview()">
      <div v-if="errors">
        <ul v-for="error in errors" v-bind:key="error">
          <li>{{ error }}</li>
        </ul>
      </div>
      <div>
        <label for="overall_rating">
          Overall Rating:
          <input type="text" v-model="newReview.overall_rating" placeholder="1-5" />
        </label>
      </div>
      <div>
        <label for="veggie_options_rating">
          Veggie Options Rating:
          <input type="text" v-model="newReview.veggie_options_rating" placeholder="1-5" />
        </label>
      </div>
      <div>
        <label for="veggie_friendly_menu_rating">
          Veggie Friendly Menu Rating:
          <input type="text" v-model="newReview.veggie_friendly_menu_rating" placeholder="1-5" />
        </label>
      </div>
      <div>
        <label for="comment">
          Comment:
          <input type="text" v-model="newReview.comment" />
        </label>
      </div>
      <div>
        <label for="recommended_dishes">
          Recommended Dishes:
          <input type="text" v-model="newReview.recommended_dishes" placeholder="optional" />
        </label>
      </div>
      <div>
        <label for="image_url">
          Image URL:
          <input type="text" v-model="newReview.image_url" placeholder="optional" />
        </label>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  </div>
</template>

<style></style>
