<script>
import axios from "axios";

export default {
  data: function () {
    return {
      business: [],
      review: {},
      errors: [],
      display_address: "",
      display_photo: "",
    };
  },
  created: function () {
    axios.get(`/reviews/${this.$route.params.id}`).then((response) => {
      console.log(response.data);
      this.review = response.data;
      this.business = response.data.business;
      this.display_photo = response.data.business.photos[0];
      this.display_address = response.data.business.location.display_address[0].concat(
        ", ",
        response.data.business.location.display_address[1]
      );
    });
  },
  methods: {
    updateReview: function () {
      axios
        .patch(`/reviews/${this.$route.params.id}`, this.review)
        .then((response) => {
          console.log(response.data);
          this.$router.push(`/businesses/${this.business.id}`);
        })
        .catch((errors) => {
          this.errors = errors.response.data.errors;
        });
    },
    combineCategories: function (categories) {
      var categoryArray = [];
      categories.forEach((category) => {
        categoryArray.push(category["title"]);
      });
      return categoryArray.join(", ");
    },
    deleteReview: function (review) {
      if (confirm("Are you sure you to delete this?")) {
        axios.delete(`/reviews/${review.id}`).then((response) => console.log("Success!", response.data));
        this.$router.push(`/reviews`);
      }
    },
  },
};
</script>

<template>
  <div class="home">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-7 order-2 order-md-1 order-lg-1">
          <div class="padding-40px-right sm-no-padding-right">
            <h4
              class="font-size38 sm-font-size34 xs-font-size32 sm-margin-15px-bottom margin-20px-top sm-margin-5px-top"
            >
              {{ business.name }}
            </h4>
            <p class="margin-10px-bottom">
              {{ display_address }}
            </p>
            <p class="margin-10px-bottom">
              {{ combineCategories(business.categories) }}
            </p>
            <div>
              <button class="butn" @click="$router.go(-1)">
                <span><i class="fas fa-arrow-left"></i></span>
                Back to Previous Page
              </button>
            </div>
          </div>
        </div>
        <div class="col-md-5 order-1 order-md-2 order-lg-2">
          <div>
            <div class="text-right xs-text-center">
              <img class="border-radius-4" :src="display_photo" alt="Image" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-form">
      <div class="container">
        <div class="title-g margin-30px-bottom">
          <h3>Edit Your Review</h3>
        </div>
        <form action="submit" v-on:submit.prevent="updateReview()">
          <div class="controls">
            <!-- Overall Rating -->
            <div>
              <h6>Overall Rating:</h6>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptionsOverall"
                  id="inlineRadio1Overall"
                  v-model="review.overall_rating"
                  value="1"
                />
                <label class="form-check-label" for="inlineRadio1">1</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptionsOverall"
                  id="inlineRadio2Overall"
                  v-model="review.overall_rating"
                  value="2"
                />
                <label class="form-check-label" for="inlineRadio2">2</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptionsOverall"
                  id="inlineRadio3Overall"
                  v-model="review.overall_rating"
                  value="3"
                />
                <label class="form-check-label" for="inlineRadio3">3</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptionsOverall"
                  id="inlineRadio4Overall"
                  v-model="review.overall_rating"
                  value="4"
                />
                <label class="form-check-label" for="inlineRadio4">4</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptionsOverall"
                  id="inlineRadio5Overall"
                  v-model="review.overall_rating"
                  value="5"
                />
                <label class="form-check-label" for="inlineRadio5">5</label>
              </div>
            </div>
            <!-- End Overall Rating -->

            <!-- Options Rating -->
            <div class="margin-20px-top">
              <h6>Veggie Options Rating:</h6>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio1"
                  v-model="review.veggie_options_rating"
                  value="1"
                />
                <label class="form-check-label" for="inlineRadio1">1</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio2"
                  v-model="review.veggie_options_rating"
                  value="2"
                />
                <label class="form-check-label" for="inlineRadio2">2</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio3"
                  v-model="review.veggie_options_rating"
                  value="3"
                />
                <label class="form-check-label" for="inlineRadio3">3</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio4"
                  v-model="review.veggie_options_rating"
                  value="4"
                />
                <label class="form-check-label" for="inlineRadio4">4</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="inlineRadio5"
                  v-model="review.veggie_options_rating"
                  value="5"
                />
                <label class="form-check-label" for="inlineRadio5">5</label>
              </div>
            </div>
            <!-- End Options Rating -->

            <!-- Menu Labels -->
            <div class="margin-20px-top">
              <h6>Menu Labels:</h6>
              <div class="row">
                <div class="col-xs-6 col-md-3 col-lg-2">
                  <p>Vegetarian:</p>
                </div>
                <div class="col-8">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptionsveg"
                      id="inlineRadio1veg"
                      v-model="review.menu_vegetarian_labels"
                      value="1"
                    />
                    <label class="form-check-label" for="inlineRadio1">Yes</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptionsveg"
                      id="inlineRadio2veg"
                      v-model="review.menu_vegetarian_labels"
                      value="0"
                    />
                    <label class="form-check-label" for="inlineRadio2">Don't Know</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptionsveg"
                      id="inlineRadio3veg"
                      v-model="review.menu_vegetarian_labels"
                      value="-1"
                    />
                    <label class="form-check-label" for="inlineRadio3">No</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6 col-md-3 col-lg-2">
                  <p>Vegan:</p>
                </div>
                <div class="col-8">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptionsVegan"
                      id="inlineRadio1Vegan"
                      v-model="review.menu_vegan_labels"
                      value="1"
                    />
                    <label class="form-check-label" for="inlineRadio1">Yes</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptionsVegan"
                      id="inlineRadio2Vegan"
                      v-model="review.menu_vegan_labels"
                      value="0"
                    />
                    <label class="form-check-label" for="inlineRadio2">Don't Know</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptionsVegan"
                      id="inlineRadio3Vegan"
                      v-model="review.menu_vegan_labels"
                      value="-1"
                    />
                    <label class="form-check-label" for="inlineRadio3">No</label>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-6 col-md-3 col-lg-2">
                  <p>Gluten-Free:</p>
                </div>
                <div class="col-8">
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptionsGF"
                      id="inlineRadio1GF"
                      v-model="review.menu_gluten_free_labels"
                      value="1"
                    />
                    <label class="form-check-label" for="inlineRadio1">Yes</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptionsGF"
                      id="inlineRadio2GF"
                      v-model="review.menu_gluten_free_labels"
                      value="0"
                    />
                    <label class="form-check-label" for="inlineRadio2">Don't Know</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="inlineRadioOptionsGF"
                      id="inlineRadio3GF"
                      v-model="review.menu_gluten_free_labels"
                      value="-1"
                    />
                    <label class="form-check-label" for="inlineRadio3">No</label>
                  </div>
                </div>
              </div>
            </div>
            <!-- Menu Labels -->

            <div class="row">
              <div class="col-md-12 form-group">
                <textarea
                  id="form_message"
                  name="message"
                  placeholder="Review"
                  rows="4"
                  required="required"
                  v-model="review.comment"
                ></textarea>
              </div>
              <div class="col-md-12 form-group">
                <input placeholder="Recommended Dish(es) (optional)" v-model="review.recommended_dishes" />
              </div>
              <div class="col-md-12 form-group">
                <input placeholder="Image URL (optional)" v-model="review.image_url" />
              </div>
              <div v-if="errors">
                <ul v-for="error in errors" v-bind:key="error">
                  <li>{{ error }}</li>
                </ul>
              </div>
              <div class="col-md-12">
                <button type="submit" class="butn margin-20px-bottom"><span>Submit Review</span></button>
              </div>
            </div>
          </div>
        </form>
        <button class="butn margin-20px-bottom" v-on:click="deleteReview(review)">Delete Your Review</button>
      </div>
    </div>
  </div>
</template>

<style></style>
