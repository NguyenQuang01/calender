<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title><v-icon> mdi-account</v-icon>Personal </v-toolbar-title>

      <v-toolbar-title class="all"
        ><v-icon>mdi-account-group-outline</v-icon>All
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <div class="container-full">
        <Nuxt />
      </div>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      title: "Vuetify.js",
    };
  },
};
</script>
<style scoped>
.container-full {
  margin-left: 20px;
}
.all {
  margin: 0 5px;
}
</style>
