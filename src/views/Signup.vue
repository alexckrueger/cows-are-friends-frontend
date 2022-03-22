<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newUserParams: {},
      errors: [],
    };
  },
  methods: {
    submit: function () {
      axios
        .post("/users", this.newUserParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/login");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>

<template>
  <div class="signup">
    <!-- start register form -->
    <section style="background-color: #e8d1ff">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 center-col">
            <div class="padding-40px-all sm-padding-25px-all shadow border-radius-4">
              <h3 class="text-center margin-40px-bottom">Signup</h3>
              <form v-on:submit.prevent="submit()">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <ul>
                        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
                      </ul>
                      <input
                        class="form-control"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="User Name"
                        maxlength="70"
                        v-model="newUserParams.name"
                        style="background-color: #f1e3ff"
                      />
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="form-group">
                      <input
                        class="form-control"
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Email"
                        maxlength="70"
                        v-model="newUserParams.email"
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
                        id="password1"
                        placeholder="Password"
                        maxlength="70"
                        v-model="newUserParams.password"
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
                        id="password2"
                        placeholder="Confirm Password"
                        maxlength="70"
                        v-model="newUserParams.password_confirmation"
                        style="background-color: #f1e3ff"
                      />
                    </div>
                  </div>

                  <div class="col-md-12 margin-25px-top">
                    <button type="submit" value="Submit" class="butn btn-block">Register</button>
                  </div>

                  <div class="col-md-12 text-center margin-25px-top">
                    <span>
                      Already have an account?
                      <router-link to="/login">Login</router-link>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- end register form -->
  </div>
</template>
