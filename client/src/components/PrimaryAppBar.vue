<template>
  <div>
    <!-- desktop version -->
    <v-toolbar app class="hidden-sm-and-down">
      <v-toolbar-side-icon @click="navDrawerOpen = !navDrawerOpen"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase primary-logo">
        <router-link to="/">
          <span class="black--text">CU</span>
          <span class="font-weight-light black--text">Plaza</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- search bar -->
      <template v-if="searchOpen">
        <v-text-field
          placeholder="Search"
          clearable
        ></v-text-field>
        <v-btn icon @click="searchOpen = !searchOpen">
          <v-icon color="primary">search</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn icon @click="searchOpen = !searchOpen">
          <v-icon>search</v-icon>
        </v-btn>
      </template>
      <v-btn icon>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn color="success" to="/login">Login</v-btn>
      <v-btn color="primary" to="/signup">Sign Up</v-btn>
    </v-toolbar>


    <!-- mobile version -->
    <v-toolbar app class="hidden-md-and-up">

      <!-- render when search bar is close -->
      <template v-if="!searchOpen">
        <v-toolbar-side-icon @click="navDrawerOpen = !navDrawerOpen"></v-toolbar-side-icon>
        <v-toolbar-title class="headline text-uppercase primary-logo">
          <router-link to="/">
            <span class="black--text">CU</span>
            <span class="font-weight-light black--text">Plaza</span>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="searchOpen = !searchOpen">
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>more_vert</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile>
              <v-btn color="success" to="/login">Login</v-btn>
            </v-list-tile>
            <v-list-tile>
              <v-btn color="primary" to="/signup">Sign Up</v-btn>
            </v-list-tile>
          </v-list>
        </v-menu>
      </template>

      <!-- render when search bar is open -->
      <template v-else>
        <v-btn icon @click="searchOpen = !searchOpen">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-text-field
          placeholder="Search"
          single-line
          clearable
        ></v-text-field>
        <v-btn icon>
          <v-icon color="primary">search</v-icon>
        </v-btn>
      </template>

    </v-toolbar>


    <v-navigation-drawer v-model="navDrawerOpen" app temporary>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Categories
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list>
        <v-list-tile
          v-for="nav in navLinks"
          :key="nav.title"
          :to="nav.route"
        >
          <v-list-tile-action>
            <v-icon class="black--text">{{ nav.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-regular subheading black--text">{{ nav.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      navDrawerOpen: false,
      navLinks: [
        { icon: 'face', title: 'Beauty & Personal Care', route: '/'},
        { icon: 'library_books', title: 'Books', route: '/'},
        { icon: 'devices', title: 'Electronics', route: '/'},
        { icon: 'local_mall', title: 'Fashion', route: '/'},
        { icon: 'build', title: 'Services', route: '/'},
        { icon: 'more_horiz', title: 'Others', route: '/'}
      ],
      searchOpen: false
    }
  }
}
</script>

<style scoped>
.primary-logo {
  margin: 0;
}

.primary-logo a {
  text-decoration: none;
}
</style>