<!-- This component is used to login user -->
<template>
  <div class="d-flex justify-center mt-10">
    <!-- Login Card -->
    <v-card elevation="1" width="800">
      <v-card-text>
        <!--card Heading -->
        <v-card-title class="mx-4">
          <p id="login-card-heading" class="font-weight-bold card-heading">
            Login
          </p>
          <!-- <p>to get started with Task Timer</p> -->
        </v-card-title>
        <v-form
          id="login-form"
          ref="form"
          v-model="valid"
          lazy-validation
          class="mb-16 form mx-8"
          autocomplete="off"
        >
          <!-- email Input Field -->

          <v-text-field
            color="purple darken-2"
            id="login-email-input"
            outlined
            v-model="email"
            :rules="emailRules"
            label="Email Address *"
          ></v-text-field>
          <!-- Password Input Field -->

          <v-text-field
            color="purple darken-2"
            id="login-password-input"
            outlined
            v-model="password"
            :rules="required"
            label="Password *"
            :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            @click:append="visible = !visible"
            @keydown.enter="login()"
            class="mb-n7"
          ></v-text-field>
          <!-- Login button -->
          <v-btn
            id="login-btn"
            width="60%"
            class="
              title
              bg-green-400
              mx-auto
              my-1
              text-capitalize
              mt-5
              text-white
              align-center
              d-flex
            "
            @click="login"
          >
            Login
          </v-btn>

          <!--SignUp Page Redirect Text -->
          <p class="mt-1 subtitle ml-1 justify-center align-center d-flex">
            Don't have an account?
            <router-link
              id="signup-link"
              to="signup"
              class="text-decoration-none success-text ml-2"
              >Sign Up</router-link
            >
          </p>
        </v-form>
      </v-card-text>
    </v-card>
    <Snackbar
      :snackbar="snackbar"
      :snackbarMessage="snackbarMessage"
      :error="error"
      @close="snackbar = false"
    />
  </div>
</template>
<script>
import { emailRules, required } from "../validations/validations.js";
import Snackbar from "@/components/Snackbar.vue";
export default {
  components: {
    Snackbar,
  },
  data() {
    return {
      email: null, // Store the email
      password: null, // Store the password
      visible: false, // Visibility to show or hide the password
      valid: true, // Binds the login form
      emailRules: emailRules, // Check the email validations
      required: required, // Check the password validations
      snackbarMessage: "",
      snackbar: false,
      error: false,
    };
  },
  methods: {
    // Action dsipatches in store to hit Login API
    login() {
      const timer = 1000;
      if (this.email && this.password) {
        // Takes to arguments (email, password)
        this.$store
          .dispatch("login", {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.error = false;
            this.snackbarMessage = "Login Successfully!";
            // changes to route to fetchingList screen
            setTimeout(() => {
              this.$router.push({
                name: "to-do-list",
              });
            }, timer);
          })
          // Used to display error message
          .catch((err) => {
            this.error = true;
            this.snackbarMessage = err.response.data.message;
          })
          .finally(() => {
            this.snackbar = true;
          });
      }
    },
  },
};
</script>
