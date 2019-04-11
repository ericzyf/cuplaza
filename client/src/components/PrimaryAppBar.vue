<template>
  <div>
    <!-- desktop version -->
    <v-toolbar app class="hidden-sm-and-down">
      <v-toolbar-side-icon @click="navDrawerOpen = !navDrawerOpen"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase primary-logo">
        <router-link to="/">
          <span class="deep-purple--text font-weight-bold">C</span>
          <span class="amber--text font-weight-bold">U</span>
          <span class="font-weight-light black--text">Plaza</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- search bar -->
      <template v-if="searchOpen">
        <v-text-field
          placeholder="Search"
          clearable
          v-model="searchKeyword"
        ></v-text-field>
        <v-btn icon @click="searchHandler()">
          <v-icon color="primary">search</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn icon @click="searchOpen = !searchOpen">
          <v-icon>search</v-icon>
        </v-btn>
      </template>

      <!-- user state -->
      <template v-if="!loginState">
        <v-btn outline color="success" to="/login">Login</v-btn>
        <v-btn outline color="primary" to="/signup">Sign Up</v-btn>
      </template>
      <template v-else>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn fab small color="indigo" v-on="on">
              <span class="white--text headline">
                {{ $store.state.curtUser_userName.toUpperCase()[0] }}
              </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile>
              <span>User:&nbsp;</span>
              <span class="font-weight-black">{{ $store.state.curtUser_userName }}</span>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile :to="`/user/${$store.state.curtUser_uid}`" color="indigo" active-class="no-deco">
              <v-icon color="indigo" class="pr-2">info</v-icon>
              Account Details
            </v-list-tile>
            <v-list-tile :to="`/postitem/${$store.state.curtUser_uid}`" color="green" active-class="no-deco">
              <v-icon color="green" class="pr-2">call_made</v-icon>
              Post Item
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile color="red" active-class="no-deco" @click="logout()">
              <v-icon color="red" class="pr-2">power_settings_new</v-icon>
              Log Out
            </v-list-tile>
          </v-list>
        </v-menu>
      </template>
    </v-toolbar>

    <!-- ################################ -->

    <!-- mobile version -->
    <v-toolbar app class="hidden-md-and-up">

      <!-- render when search bar is close -->
      <template v-if="!searchOpen">
        <v-toolbar-side-icon @click="navDrawerOpen = !navDrawerOpen"></v-toolbar-side-icon>
        <v-toolbar-title class="headline text-uppercase primary-logo">
          <router-link to="/">
            <span class="deep-purple--text font-weight-bold">C</span>
            <span class="amber--text font-weight-bold">U</span>
            <span class="font-weight-light black--text">Plaza</span>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="searchHandler()">
          <v-icon>search</v-icon>
        </v-btn>

        <!-- user state -->
        <template v-if="!loginState">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon>account_circle</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile>
                <v-btn outline color="success" to="/login">Login</v-btn>
              </v-list-tile>
              <v-list-tile>
                <v-btn outline color="primary" to="/signup">Sign Up</v-btn>
              </v-list-tile>
            </v-list>
          </v-menu>
        </template>
        <template v-else>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn fab small color="indigo" v-on="on">
                <span class="white--text headline">
                  {{ $store.state.curtUser_userName.toUpperCase()[0] }}
                </span>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile>
                <span>User:&nbsp;</span>
                <span class="font-weight-black">{{ $store.state.curtUser_userName }}</span>
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile :to="`/user/${$store.state.curtUser_uid}`" color="indigo" active-class="no-deco">
                <v-icon color="indigo" class="pr-2">info</v-icon>
                Account Details
              </v-list-tile>
              <v-list-tile :to="`/postitem/${$store.state.curtUser_uid}`" color="green" active-class="no-deco">
                <v-icon color="green" class="pr-2">call_made</v-icon>
                Post Item
              </v-list-tile>
              <v-divider></v-divider>
              <v-list-tile color="red" active-class="no-deco" @click="logout()">
                <v-icon color="red" class="pr-2">power_settings_new</v-icon>
                Log Out
              </v-list-tile>
            </v-list>
          </v-menu>
        </template>
      </template>

      <!-- render when search bar is open -->
      <template v-else>
        <v-btn icon @click="searchOpen = false">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
        <v-text-field
          placeholder="Search"
          single-line
          clearable
          v-model="searchKeyword"
        ></v-text-field>
        <v-btn icon @click="searchHandler()">
          <v-icon color="primary">search</v-icon>
        </v-btn>
      </template>

    </v-toolbar>

    <!-- ################################ -->

    <v-navigation-drawer v-model="navDrawerOpen" app temporary>
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title blue-grey--text">
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
const base64url = require('base64url')

export default {
  data: function() {
    return {
      navDrawerOpen: false,
      navLinks: [
        { icon: 'face', title: 'Beauty & Personal Care', route: '/category/0'},
        { icon: 'library_books', title: 'Books', route: '/category/1'},
        { icon: 'devices', title: 'Electronics', route: '/category/2'},
        { icon: 'local_mall', title: 'Fashion', route: '/category/3'},
        { icon: 'build', title: 'Services', route: '/category/4'},
        { icon: 'more_horiz', title: 'Others', route: '/category/5'}
      ],
      searchOpen: false,
      searchKeyword: ''
    }
  },
  computed: {
    b64Keyword: function() {
      return base64url(this.searchKeyword)
    },
    loginState: function() {
      // return true when user has logged in
      return this.$store.state.curtUser_uid !== null
    }
  },
  methods: {
    searchHandler: function() {
      if (!this.searchOpen) {
        this.searchOpen = true
      } else if (this.searchKeyword !== null && this.searchKeyword.length > 0) {
        this.$router.push({ path: `/search/${this.b64Keyword}` })
        this.searchKeyword = ''
        this.searchOpen = false
      } else {
        this.searchOpen = false
      }
    },
    logout: function() {
      this.$store.commit('logout')
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

.no-deco a {
  text-decoration: none;
}
</style>