<script>
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default {
  data: function () {
    return {
      businesses: [],
      search: "",
      location: "",
      center: [41.8781, -87.6298],
      mapDiv: "",
      myIcon: L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/723/723633.png",
        iconSize: [30, 40],
        popupAnchor: [0, -26],
      }),
      markerLayer: [],
      markers: [],
      error: "",
    };
  },
  created: function () {
    axios.get("/businesses").then((response) => {
      console.log(response.data), (this.businesses = response.data);
    });
  },
  methods: {
    searchBusinesses: function () {
      this.businesses = [];
      this.error = "";
      axios
        .get(`/businesses?search=${this.search}&location=${this.location}`)
        .then((response) => {
          console.log(response.data), (this.businesses = response.data);
          // Set map center view to the first business
          this.center = [this.businesses[0].coordinates.latitude, this.businesses[0].coordinates.longitude];
          // Clear previous markers if they exist
          if (this.markerLayer) {
            this.mapDiv.removeLayer(this.markerLayer);
          }
        })
        .catch((error) => {
          console.log(error.data);
          this.error = "Please enter a valid location";
        });
    },
    setupLeafletMap: function () {
      var mapboxKey = process.env.VUE_APP_MAPBOX_API_KEY;
      this.mapDiv = L.map("mapContainer").setView(this.center, 13);
      L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution:
          'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: "mapbox/streets-v11",
        accessToken: mapboxKey,
        maxHeight: 20,
      }).addTo(this.mapDiv);
    },
    addMarkersToMap: function () {
      // Display markers for each business
      this.markers = [];
      this.businesses.forEach((business) => {
        this.markers.push(
          L.marker([business.coordinates.latitude, business.coordinates.longitude], { icon: this.myIcon }).bindPopup(
            business.name
          )
        );
      });
      this.markerLayer = L.layerGroup(this.markers);
      this.markerLayer.addTo(this.mapDiv);
    },
    pluralizeReview: function (business) {
      if (business.review_count > 1) {
        return "reviews";
      } else return "review";
    },
    setView: function () {
      this.mapDiv.setView(this.center, 13);
    },
    // ratingIcon: function (rating) {
    // } Have this return checkmark/question/red x depending on menu label buttons
  },
  mounted: function () {
    this.setupLeafletMap();
  },
  watch: {
    businesses() {
      // adds markers to map whenever the business array updates
      if (this.businesses.length > 0) {
        this.addMarkersToMap();
        this.setView();
      }
    },
  },
};
</script>

<template>
  <div class="home">
    <!-- start map list section -->
    <div class="container-fluid no-padding">
      <div class="row no-gutters">
        <div class="col-lg-6 order-2 order-lg-1">
          <!-- Add search here -->
          <div class="padding-40px-all border-bottom">
            <div class="row">
              <div class="form-group col-md-6 col-lg-12 col-xl-6">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text padding-10px-tb bg-white">Find</div>
                  </div>
                  <input
                    type="text"
                    class="form-control padding-10px-tb"
                    placeholder="What are you looking for?"
                    v-model="search"
                  />
                </div>
              </div>
              <div class="form-group col-md-6 col-lg-12 col-xl-6">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text padding-10px-tb bg-white">Near</div>
                  </div>
                  <input
                    type="text"
                    class="form-control padding-10px-tb"
                    placeholder="Location"
                    required=""
                    v-model="location"
                  />
                </div>
              </div>
              <div
                class="input-group col-md-6 col-lg-12 col-xl-3 md-margin-15px-top sm-no-margin-top xs-margin-15px-top"
              >
                <button v-on:click="searchBusinesses" class="btn btn-block btn-primary">Search</button>
              </div>
              <p v-if="error">{{ error }}</p>
            </div>
          </div>
          <!-- end search here -->
          <div class="padding-40px-all xs-padding-90px-lr mobile-padding-15px-lr">
            <div class="row margin-40px-bottom no-margin-lr">
              <div
                class="border-bottom margin-40px-bottom padding-40px-bottom"
                v-for="business in businesses"
                v-bind:key="business.id"
              >
                <div class="card card-list border-0">
                  <div class="row align-items-center">
                    <div class="col-md-5 col-lg-4 xs-margin-20px-bottom">
                      <div class="card-list-img">
                        <img class="border-radius-5" :src="business.image_url" alt="" />
                      </div>
                    </div>
                    <div class="col-md-7 col-lg-8">
                      <div class="card-body no-padding-tb">
                        <!-- # of stars = rating -->
                        <div class="star">
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star"></i>
                          <i class="fa fa-star-o"></i>
                        </div>
                        <!-- end stars -->
                        <div class="d-flex justify-content-between align-items-center">
                          <h5 class="card-title no-margin-bottom font-size22">
                            <a href="listing-details.html" class="text-extra-dark-gray">{{ business.name }}</a>
                          </h5>
                        </div>
                        <div v-if="business.review_count > 0">
                          <span>
                            {{ business.overall_rating }}/5 Rating ({{ business.review_count }}
                            {{ pluralizeReview(business) }})
                          </span>
                          <p class="sm-margin-10px-top">
                            Vegetarian: {{ business.menu_vegetarian_labels }}, Vegan: {{ business.menu_vegan_labels }},
                            Vegan:
                            {{ business.menu_gluten_free_labels }}
                          </p>
                        </div>
                        <div v-else>
                          <p>Be the first to review this restaurant!</p>
                        </div>
                        <div v-for="category in business.categories" v-bind:key="category">
                          <li>
                            {{ category["title"] }}
                          </li>
                        </div>
                        <router-link class="butn alt-font" :to="`/businesses/${business.id}`">See more</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Map -->
        <div class="col-lg-6 order-1 order-lg-2">
          <div id="mapContainer"></div>
        </div>
        <!-- end Map -->
      </div>
    </div>
    <!-- end map list section -->
    <div>
      <input type="search" v-model="search" placeholder="Pizza, Cookies, Ice cream..." />
      <input type="search" v-model="location" placeholder="City, Zipcode, or Address" />
      <button v-on:click="searchBusinesses">Search</button>
      <p v-if="error">{{ error }}</p>
    </div>
    <div id="mapContainer"></div>
    <div v-for="business in businesses" v-bind:key="business.id">
      <h2>{{ business.name }}</h2>
      <div v-if="business.review_count > 0">
        <p>
          Overall Rating: {{ business.overall_rating }} ({{ business.review_count }} {{ pluralizeReview(business) }})
        </p>
        <p>Veggie Options Rating: {{ business.veggie_options_rating }}</p>
        <p>Menu labels:</p>
        <div>
          Vegetarian: {{ business.menu_vegetarian_labels }}, Vegan: {{ business.menu_vegan_labels }}, Vegan:
          {{ business.menu_gluten_free_labels }}
        </div>
      </div>
      <div v-else>
        <p>Be the first to review this restaurant!</p>
      </div>
      <div v-for="category in business.categories" v-bind:key="category">
        {{ category["title"] }}
      </div>
      <img :src="business.image_url" alt="" />
      <br />
      <button v-on:click="this.$router.push(`/businesses/${business.id}`)">to business show page</button>
    </div>
  </div>
</template>

<style>
#mapContainer {
  height: 60vw;
}
</style>
