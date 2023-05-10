<template>
  <v-app>
    <v-app-bar fixed app>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <div class="container-full">
        <Nuxt />
      </div>
    </v-main>

    <v-footer :absolute="!fixed" app>
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
</style>
