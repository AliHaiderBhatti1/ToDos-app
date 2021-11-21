<!-- This component is used to create 'to do' -->
<template>
  <div>
    <v-dialog
      content-class="bg-white"
      overlay-color="white"
      v-model="modal"
      width="500"
    >
      <v-card tile class="white" height="420" width="500">
        <v-card-title class="header-text-color">Create To Do</v-card-title>
        <hr />
        <div class="ma-4">
          <label class="header-text-color">Title:</label>
          <!-- Text field for title -->
          <div style="width: 300px">
            <v-text-field
              color="purple darken-2"
              autofocus
              outlined
              autocomplete="off"
              v-model="title"
              hide-details
            ></v-text-field>
          </div>
          <label class="header-text-color">Description:</label>
          <div style="width: 300px">
            <!-- text area for description -->
            <v-textarea
              color="purple darken-2"
              outlined
              v-model="description"
            ></v-textarea>
          </div>
          <v-btn class="btn-success white--text" @click="createTodo()"
            >Save</v-btn
          >
          <v-btn class="btn-cancel white--text mx-6" @click="modal = false"
            >Cancel</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
    <Snackbar
      :snackbar="snackbar"
      :snackbarMessage="snackbarMessage"
      :error="error"
      @close="snackbar = false"
    />
  </div>
</template>
<script>
import Snackbar from "@/components/Snackbar.vue";
import { mapGetters } from "vuex";
export default {
  props: ["createDialog"],
  components: {
    Snackbar,
  },
  data() {
    return {
      modal: this.createDialog, // Flag to maintain the state of dialog
      title: null, // Used to store 'title' of to do
      description: null, // Used to store 'description' of to do
      snackbarMessage: "",
      snackbar: false,
      error: false,
    };
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  methods: {
    resetState() {
      this.modal = false; // Closes the modal
      this.title = null; // Reset the 'title' state
      this.description = null; // Reset the 'description state'
    },
    // Method to create 'to do' by dispatching the API call
    createTodo() {
      const timer = 1000;
      this.$store // Action dispatches in store to hit the API
        .dispatch("createTodo", {
          // Takes 3 arguments (title, description, token)
          title: this.title,
          description: this.description,
        })
        .then(() => {
          this.resetState();
          this.error = false;
          this.snackbarMessage = "To do created successfully!";
        })
        .catch((err) => {
          this.error = true;
          if (err && err.status == 401) this.$store.dispatch("logout");
          else if (
            err &&
            err.data &&
            err.data.errors &&
            err.data.errors.description
          )
            this.snackbarMessage = err.data.errors.description[0];
          else this.snackbarMessage = err.data.errors.title[0];
          setTimeout(() => {
            this.resetState();
            this.snackbar = false;
          }, timer);
        })
        .finally(() => {
          this.snackbar = true;
        });
    },
  },
  watch: {
    // Watches the updates the (parent, child) state of dialog
    createDialog(value) {
      this.modal = value;
    },
    // Tells the parent component updated state of modal
    modal(value) {
      if (!value) {
        this.$emit("close");
      }
    },
  },
};
</script>
<style scoped>
.btn-success {
  background-color: #1cc283 !important;
}
.btn-cancel {
  background-color: rgb(48, 129, 204) !important;
}
.header-text-color {
  color: #2a206a !important;
}
</style>
