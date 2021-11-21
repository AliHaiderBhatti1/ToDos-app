<template>
  <v-snackbar
    :color="error ? 'red lighten-5' : 'green lighten-5'"
    light
    top
    right
    :value="snackbar"
  >
    <span :class="error ? 'red--text' : 'green--text'">
      {{ snackbarMessage }}
    </span>
    <template v-slot:action="{ attrs }">
      <v-btn
        color="white"
        text
        v-bind="attrs"
        @click="$emit('close')"
        small
        fab
      >
        <v-icon :color="error ? 'red' : 'green'" small>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  props: ["snackbarMessage", "snackbar", "error"],
};
</script>
