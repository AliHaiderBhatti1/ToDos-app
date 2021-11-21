<!-- This component is used to update 'to do' -->
<template>
  <div>
    <v-dialog
      v-model="modal"
      content-class="bg-white"
      overlay-color="white"
      width="500"
    >
      <v-card tile class="white" height="420" width="500">
        <v-card-title class="text-indigo-800">Update To Do</v-card-title>
        <hr />
        <div v-if="toDoObject" class="ma-4">
          <label class="text-indigo-800">Title:</label>
          <div style="width: 300px">
            <v-text-field
              color="purple darken-2"
              autofocus
              outlined
              autocomplete="off"
              v-model="toDoObject.title"
              hide-details
            ></v-text-field>
          </div>
          <label class="text-indigo-800">Description:</label>
          <div style="width: 300px">
            <v-textarea
              color="purple darken-2"
              outlined
              v-model="toDoObject.description"
            ></v-textarea>
          </div>
          <v-btn class="bg-green-400 text-white" @click="updateToDo"
            >Save</v-btn
          >
          <v-btn class="bg-indigo-300 text-white mx-6" @click="modal = false"
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
import { mapGetters } from "vuex";
import Snackbar from "@/components/Snackbar.vue";

export default {
  props: ["updateDialog", "toDoObject"],
  components: {
    Snackbar,
  },
  data() {
    return {
      modal: this.updateDialog, // Flag to maintain the state of dialog
      snackbarMessage: "",
      snackbar: false,
      error: false,
    };
  },
  computed: {
    ...mapGetters(["getToken"]),
  },
  methods: {
    // Action dispatches in store to hit update API
    updateToDo() {
      const todo = this.toDoObject;
      // Takes 2 arguments (title, description)
      let body = {
        title: this.toDoObject.title,
        description: this.toDoObject.description,
      };
      this.$store
        .dispatch("updateToDo", {
          body,
          todo,
        })
        .then(() => {
          this.modal = false; // Closes the modal
          this.error = false;
          this.snackbarMessage = "Todo updated successfully";
        })
        // Used to display error message
        .catch((status) => {
          this.error = true;
          this.snackbarMessage = "An unexpected error occured";
          // Checks the authenticity and logout the user
          if (status == 401)
            this.$store.dispatch("logout", { token: this.getToken });
        })
        .finally(() => {
          this.snackbar = true;
        });
    },
  },
  watch: {
    // Watches the updates the (parent, child) state of dialog
    updateDialog(value) {
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
