<!-- This component is used to register user -->
<template>
  <div class="d-flex justify-center mt-10">
    <v-card elevation="1" width="800">
      <v-card-text>
        <!--card Heading -->
        <v-card-title class="mx-4">
          <p id="signup-card-heading" class="font-weight-bold card-heading">
            Sign Up
          </p>
          <!-- <p>to get started with Task Timer</p> -->
        </v-card-title>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          class="mb-16 form mx-8
          "
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
          ></v-text-field>

          <!-- Confirm Password Field -->
          <v-text-field
            color="purple darken-2"
            id="login-password-input"
            outlined
            v-model="confirmPassword"
            :rules="required"
            label="Confirm Password *"
            :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
            :type="visible ? 'text' : 'password'"
            @click:append="visible = !visible"
            @keydown.enter="signup()"
          ></v-text-field>
          <!-- Sign up button -->
          <v-btn
            id="login-btn"
            width="60%"
            class="title btn-success mx-auto my-1 text-capitalize mt-5 white--text align-center d-flex"
            @click="signup"
          >
            Sign Up
          </v-btn>

          <!--Login Page Redirect Text -->
          <p class="mt-1 subtitle ml-1 justify-center align-center d-flex">
            Already have an account?
            <router-link
              id="signup-link"
              to="login"
              class="text-decoration-none success-text ml-2"
            >
              Login</router-link
            >
          </p>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import { emailRules, required } from "../validations/validations.js";
export default {
  data() {
    return {
      email: null, // Store the email
      password: null, // Store the password
      confirmPassword: null, // Store the confirm password
      visible: false, // Visibility to show or hide the password
      valid: true, // Binds the signup form
      emailRules: emailRules, // Check the email validations
      required: required, // Check the password validations
    };
  },
  methods: {
    // Action dispatchesa in store to register user
    signup() {
      // Taks 3 arguments (email, password, confirm password)
      if (this.email && this.password && this.confirmPassword) {
        if (this.password == this.confirmPassword) {
          this.$store
            .dispatch("signup", {
              email: this.email,
              password: this.password,
              password_confirmation: this.confirmPassword,
            })
            .then(() => {
              // Routes to login screen
              this.$router.push({ name: "login" });
            });
        }
      }
    },
  },
};
</script>
<style scoped>
.btn-success {
  background-color: #1cc283 !important;
}
</style>
