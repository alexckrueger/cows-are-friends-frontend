<template>
  <div id="nav">
    <!-- start header section -->
    <header>
      <div class="navbar-default opaque">
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

<style>
.caficon {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.opaque {
  background-color: white;
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
