<template>
  <div id="nav">
    <!-- start header section -->
    <header>
      <div class="navbar-default" style="background-color: #e8d1ff">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-12">
              <div class="menu_area">
                <nav class="navbar navbar-expand-lg navbar-light no-padding">
                  <div class="navbar-header navbar-header-custom">
                    <!-- start logo -->
                    <h6 class="caftitle">
                      <img class="caficon" :src="require(`/src/assets/cowsarefriends.png`)" alt="" />
                      <router-link to="/">Cows Are Friends</router-link>
                    </h6>
                    <!-- end logo -->
                  </div>

                  <div class="navbar-toggler"></div>

                  <!-- start menu area -->
                  <ul class="navbar-nav ml-auto" id="nav" style="display: none">
                    <li><router-link to="/" class="navbar-hover">Home</router-link></li>
                    <li><router-link v-if="!isLoggedIn" to="/login" class="navbar-hover">Login</router-link></li>
                    <li><router-link v-if="isLoggedIn" to="/logout" class="navbar-hover">Logout</router-link></li>
                    <li><router-link v-if="!isLoggedIn" to="/signup" class="navbar-hover">Signup</router-link></li>
                    <li v-if="isLoggedIn" class="navbar-hover">
                      <router-link to="/users/me" class="navbar-hover">My Profile</router-link>
                      <ul style="background-color: #e8d1ff">
                        <li class="navbar-hover"><router-link to="/favorites">My Favorites</router-link></li>
                        <li class="navbar-hover"><router-link to="/reviews">My Reviews</router-link></li>
                      </ul>
                    </li>
                  </ul>
                  <!-- end menu area -->
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- end header section -->
  </div>
  <router-view />
</template>

<style>
.caficon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.navbar-hover:hover {
  background-color: #dbb8ff;
}
</style>

<script>
export default {
  data: function () {
    return {
      isLoggedIn: false,
    };
  },
  watch: {
    $route: function () {
      this.isLoggedIn = !!localStorage.jwt;
    },
  },
};
</script>
