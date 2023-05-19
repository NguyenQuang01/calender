<template>
  <v-app>
    <v-app-bar v-if="$auth.loggedIn" app class="toolbar">
      <v-toolbar-title class="toolbar-title">
        <nuxt-link to="/" class="toolbar-link">
          <v-icon> mdi-account</v-icon>
          <span>Personal</span>
        </nuxt-link>
      </v-toolbar-title>

      <!-- <v-toolbar-title class="toolbar-title">
        <nuxt-link to="all" class="toolbar-link">
          <v-icon>mdi-account-group-outline</v-icon>
          <span>All</span>
        </nuxt-link>
      </v-toolbar-title> -->
      <v-spacer />
      <v-toolbar-title class="toolbar-title">
        <nuxt-link to="work" class="toolbar-link">
          <v-icon>mdi-account-group-outline</v-icon>
          <span>Work List</span>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <button @click="logout">logout</button>
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
  methods: {
    async logout() {
      try {
        await this.$auth.logout();
        localStorage.removeItem('token');
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container-full {
  height: 100%;
  width: 100%;
}
.all {
  margin: 0 5px;
}
.toolbar {
  display: flex;
  align-items: center;
}
.toolbar-title {
  margin-right: 12px;
  .toolbar-link {
    text-decoration: none;
    display: flex;
    gap: 4px;
  }
}
</style>
