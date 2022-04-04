<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newSessionParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/sessions", this.newSessionParams)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user_id);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>

<template>
  <div class="login">
    <!-- start login table -->
    <section style="background-color: #e8d1ff">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 center-col">
            <div class="padding-40px-all sm-padding-25px-all shadow border-radius-4">
              <h3 class="text-center margin-40px-bottom">Login</h3>
              <form v-on:submit.prevent="submit()">
                <div class="row">
                  <div class="col-md-12">
                    <ul>
                      <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                    </ul>
                    <div class="form-group">
                      <input
                        class="form-control"
                        type="text"
                        name="email"
                        id="email"
                        required="required"
                        placeholder="Email"
                        maxlength="70"
                        v-model="newSessionParams.email"
                        style="background-color: #f1e3ff"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <input
                        class="form-control"
                        type="password"
                        name="password"
                        id="password"
                        required="required"
                        placeholder="Password"
                        maxlength="70"
                        v-model="newSessionParams.password"
                        style="background-color: #f1e3ff"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-md-12 margin-25px-top">
                  <button type="submit" value="Submit" class="butn btn-block">Login</button>
                </div>

                <div class="col-md-12 text-center margin-25px-top">
                  <span>
                    Don't have an account yet?
                    <router-link to="/signup">Signup</router-link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end login table -->
  </div>
</template>
