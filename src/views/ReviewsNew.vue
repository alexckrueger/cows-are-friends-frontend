<script>
import axios from "axios";

export default {
  data: function () {
    return {
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
    combineCategories: function (categories) {
      var categoryArray = [];
      categories.forEach((category) => {
        categoryArray.push(category["title"]);
      });
      return categoryArray.join(", ");
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
                Back to Previous Page
                <span><i class="fas fa-arrow-right"></i></span>
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
          <h3>Post a Review</h3>
        </div>
        <form action="submit" v-on:submit.prevent="createReview()">
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
                  v-model="newReview.overall_rating"
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
                  v-model="newReview.overall_rating"
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
                  v-model="newReview.overall_rating"
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
                  v-model="newReview.overall_rating"
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
                  v-model="newReview.overall_rating"
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
                  v-model="newReview.veggie_options_rating"
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
                  v-model="newReview.veggie_options_rating"
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
                  v-model="newReview.veggie_options_rating"
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
                  v-model="newReview.veggie_options_rating"
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
                  v-model="newReview.veggie_options_rating"
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
                      v-model="newReview.menu_vegetarian_labels"
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
                      v-model="newReview.menu_vegetarian_labels"
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
                      v-model="newReview.menu_vegetarian_labels"
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
                      v-model="newReview.menu_vegan_labels"
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
                      v-model="newReview.menu_vegan_labels"
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
                      v-model="newReview.menu_vegan_labels"
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
                      v-model="newReview.menu_gluten_free_labels"
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
                      v-model="newReview.menu_gluten_free_labels"
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
                      v-model="newReview.menu_gluten_free_labels"
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
                  v-model="newReview.comment"
                ></textarea>
              </div>
              <div class="col-md-12 form-group">
                <input placeholder="Recommended Dish(es) (optional)" v-model="newReview.recommended_dishes" />
              </div>
              <div class="col-md-12 form-group">
                <input placeholder="Image URL (optional)" v-model="newReview.image_url" />
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
      </div>
    </div>
  </div>
</template>

<style></style>
