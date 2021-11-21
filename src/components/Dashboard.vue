<!-- This component is used to display list of 'to dos' -->
<template>
  <div>
    <h1 class="d-flex justify-center header-text-color">To Do List</h1>
    <div class="d-flex justify-end mx-3">
      <!-- Button to open modal for to do -->
      <v-btn class="mx-3 btn-success white--text" @click="createDialog = true"
        >+ Create To Do</v-btn
      >
      <v-tooltip color="#302277">
        <template v-slot:activator="{ on }">
          <!-- Buton used to logout -->
          <v-icon size="30" v-on="on" @click="logout()" color="#302277"
            >mdi-logout</v-icon
          >
        </template>
        <span>Logout</span>
      </v-tooltip>
    </div>
    <!-- DataTable renders the lsi of to dos -->
    <div class="px-3 my-4">
      <!-- Headers -->
      <v-row class="bg-theme-light mb-2">
        <v-col cols="1">ID</v-col>
        <v-col cols="3">TITLE</v-col>
        <v-col cols="6">DESCRIPTION</v-col>
        <v-col cols="2">ACTIONS</v-col>
      </v-row>
      <v-progress-linear v-if="loader" indeterminate></v-progress-linear>
      <!-- Items -->
      <div
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="shouldFetch"
        infinite-scroll-distance="5"
        style="overflow: scroll; height: 550px !important"
      >
        <v-row v-for="(item, index) in getToDos" :key="index" class="my-2">
          <v-col cols="1">{{ item.id }}</v-col>

          <v-col cols="3">
            <v-tooltip bottom color="#302277">
              <template v-slot:activator="{ on }">
                <div
                  v-on="on"
                  style="max-width: 500px"
                  class="d-inline-block text-truncate"
                >
                  {{ item.title }}
                </div>
              </template>
              <span> {{ item.title }}</span>
            </v-tooltip>
          </v-col>

          <v-col cols="6">
            <v-tooltip bottom color="#302277">
              <template v-slot:activator="{ on }">
                <div
                  v-on="on"
                  style="max-width: 500px"
                  class="d-inline-block text-truncate"
                >
                  {{ item.description }}
                </div>
              </template>
              <span> {{ item.description }}</span>
            </v-tooltip>
          </v-col>

          <v-col cols="2">
            <v-icon
              @click="editToDo(item)"
              class="mx-1 header-text-color"
              small
            >
              mdi-pencil
            </v-icon>
            <v-icon
              @click="deleteToDo(item)"
              class="mx-1 header-text-color"
              small
              >mdi-trash-can-outline</v-icon
            >
          </v-col>
        </v-row>
      </div>
    </div>

    <!-- Component to create to do -->
    <CreateToDo
      @close="createDialog = false"
      :createDialog.sync="createDialog"
    />
    <!-- Component to update to do -->
    <UpdateToDo
      @close="updateDialog = false"
      :updateDialog.sync="updateDialog"
      :toDoObject="toDoObject"
    />

    <Snackbar
      :snackbar="snackbar"
      :snackbarMessage="snackbarMessage"
      :error="error"
      @close="snackbar = false"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import CreateToDo from "@/components/CreateToDo.vue";
import UpdateToDo from "@/components/UpdateToDo.vue";
import Snackbar from "@/components/Snackbar.vue";

export default {
  components: {
    CreateToDo,
    UpdateToDo,
    Snackbar,
  },
  data() {
    return {
      loader: false,
      busy: false,
      searchedTitle: null, // State used to bind the 'title'
      toDoObject: null, // Used to copy the specific to do
      createDialog: false, // State to maintain create to do dialog
      updateDialog: false, // State used to maintain update to do dialog
      snackbarMessage: "",
      snackbar: false,
      error: false,
    };
  },
  computed: {
    ...mapGetters([
      "getToken", // Getter used to get stored token
      "getToDos", // Getter used to mainatain the array of to dos
      "getPagination",
    ]),
    shouldFetch() {
      return (
        this.busy ||
        this.getPagination.currentPage == this.getPagination.lastPage
      );
    },
  },
  mounted() {
    this.loadMore();
  },
  methods: {
    ...mapActions(["fetchToDos"]),
    loadMore() {
      this.busy = true;
      const { currentPage } = this.getPagination;
      this.loader = true;
      this.fetchToDos(currentPage + 1).then(() => {
        this.loader = false;
        this.busy = false;
      });
    },
    // Action dispatches in store to hit API
    logout() {
      this.$store.dispatch("logout", {
        token: this.getToken,
      });
    },
    // Action dispatches in store to hit APi to delete certain to  do
    deleteToDo(item) {
      this.$store
        .dispatch("deleteToDo", item)
        .then(() => {
          this.error = false;
          this.snackbarMessage = "Todo deleted successfully";
        })
        .catch(() => {
          this.error = true;
          this.snackbarMessage = "An unexpected error occured";
        })
        .finally(() => {
          this.snackbar = true;
        });
    },
    // Used to open the modal for updationand pass the refernce to the child component
    editToDo(item) {
      this.toDoObject = { ...item };
      this.updateDialog = true;
    },
  },
};
</script>
<style scoped>
.header-text-color {
  color: #2a206a !important;
}
.light-purple-bg {
  background-color: #968ccc !important;
}
.bg-white {
  background-color: white !important;
}
.btn-success {
  background-color: #1cc283 !important;
}
.sub-header {
  position: relative;
  margin: 0 auto;
}
.inputContainer i {
  position: absolute;
}
.header-search-input-field {
  border: 1px #dad6f5 solid;
  border-radius: 2px;
  height: 22px;
  font-weight: lighter;
  padding-left: 20px;
}
.header-search-input-field::placeholder {
  color: grey !important;
  font-size: 13px;
}
.inp-width {
  width: 110px !important;
}
</style>
