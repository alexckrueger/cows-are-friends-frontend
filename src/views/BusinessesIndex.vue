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
      center: [41.8863, -87.6326],
      mapDiv: "",
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
      this.mapDiv = L.map("mapContainer").setView(this.center, 14);
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
          L.marker([business.coordinates.latitude, business.coordinates.longitude], {
            icon: this.setIcon(business),
          }).bindPopup(business.name)
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
    pluralizeStar: function (business) {
      if (business.overall_rating > 1) {
        return "stars";
      } else return "star";
    },
    setView: function () {
      this.mapDiv.setView(this.center, 14);
    },
    ratingIcon: function (rating) {
      var icon = require("/src/assets/Question Mark.png");
      if (rating > 0.49) {
        icon = require("/src/assets/checkmark.png");
      } else if (rating < -0.49) {
        icon = require("/src/assets/Red X.png");
      }
      return icon;
    },
    setIcon: function (business) {
      var icon = require("/src/assets/vegan_icon.png");
      if (business.overall_rating) {
        if (business.overall_rating > 3) {
          icon = require("/src/assets/green cow.png");
        } else {
          icon = require("/src/assets/red cow.png");
        }
      } else {
        icon = require("/src/assets/yellow cow.png");
      }
      var myIcon = L.icon({
        iconUrl: icon,
        iconSize: [32, 32],
        popupAnchor: [0, -26],
      });
      return myIcon;
    },
    combineCategories: function (categories) {
      var categoryArray = [];
      categories.forEach((category) => {
        categoryArray.push(category["title"]);
      });
      return categoryArray.join(", ");
    },
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
  <div class="businessesindex">
    <!-- start map list section -->
    <div class="container-fluid no-padding">
      <div class="row no-gutters">
        <div class="col-lg-6 order-2 order-lg-1" style="background-color: #e8d1ff">
          <!-- Add search here -->
          <div class="padding-40px-all border-bottom">
            <div class="row">
              <div class="form-group col-lg-12">
                <h1>Cows Are Friends</h1>
                <h6>Restaurant reviews made for Vegetarians and Vegans</h6>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text padding-10px-tb" style="background-color: #f1e3ff">Find</div>
                  </div>
                  <input
                    type="text"
                    class="form-control padding-10px-tb"
                    placeholder="Pizza, Ice Cream, Walnuts..."
                    v-model="search"
                    style="background-color: #f1e3ff"
                  />
                </div>
              </div>
              <div class="form-group col-lg-12">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <div class="input-group-text padding-10px-tb" style="background-color: #f1e3ff">Near</div>
                  </div>
                  <input
                    type="text"
                    class="form-control padding-10px-tb"
                    placeholder="ZIP code, City, etc..."
                    required=""
                    v-model="location"
                    style="background-color: #f1e3ff"
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
                        <!-- stars -->
                        <div v-if="business.review_count > 0">
                          <span class="star" v-for="star in Math.round(business.overall_rating)" :key="star">
                            <i class="fa fa-star"></i>
                          </span>
                        </div>
                        <!-- end stars -->
                        <div class="d-flex justify-content-between align-items-center">
                          <h5 class="card-title no-margin-bottom font-size22">
                            {{ business.name }}
                          </h5>
                        </div>
                        <!-- Everything Reviews -->
                        <div v-if="business.review_count > 0">
                          <span>
                            {{ business.overall_rating }} {{ pluralizeStar(business) }} ({{ business.review_count }}
                            {{ pluralizeReview(business) }})
                          </span>
                          <div>{{ combineCategories(business.categories) }}</div>
                          <div class="sm-margin-10px-top">
                            <div>
                              Vegetarian Labels
                              <img :src="ratingIcon(business.menu_vegetarian_labels)" alt="" />
                            </div>
                            <div>
                              Vegan Labels
                              <img :src="ratingIcon(business.menu_vegan_labels)" alt="" />
                            </div>
                            <div>
                              Gluten-Free Labels
                              <img :src="ratingIcon(business.menu_gluten_free_labels)" alt="" />
                            </div>
                          </div>
                        </div>
                        <!-- End everything Reviews -->
                        <div v-else>
                          <div>{{ combineCategories(business.categories) }}</div>
                          <p>Be the first to review this restaurant!</p>
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
          <div class="map-listing" id="mapContainer"></div>
        </div>
        <!-- end Map -->
      </div>
    </div>
    <!-- end map list section -->
  </div>
</template>

<style>
#mapContainer {
  height: 100%;
}
#mapContainer div {
  background-color: white;
  font-family: Georgia, "Times New Roman", Times, serif;
  font-weight: bolder;
}
#mapContainer div .leaflet-popup-tip-container {
  background-color: transparent;
}
</style>
