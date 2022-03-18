<template>
  <div id="nav">
    <!-- start header section -->
    <header>
      <div class="navbar-default">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-12">
              <div class="menu_area">
                <nav class="navbar navbar-expand-lg navbar-light no-padding">
                  <div class="navbar-header navbar-header-custom">
                    <!-- start logo -->
                    <router-link to="/">Cows Are Friends</router-link>
                    <!-- end logo -->
                  </div>

                  <div class="navbar-toggler"></div>

                  <!-- start menu area -->
                  <ul class="navbar-nav ml-auto" id="nav" style="display: none">
                    <li><router-link to="/">Home</router-link></li>
                    <li><router-link v-if="!isLoggedIn" to="/login">Login</router-link></li>
                    <li><router-link v-if="isLoggedIn" to="/logout">Logout</router-link></li>
                    <li><router-link v-if="!isLoggedIn" to="/signup">Signup</router-link></li>
                    <li><router-link v-if="isLoggedIn" to="/users/me">My Profile</router-link></li>
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

<style></style>

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
