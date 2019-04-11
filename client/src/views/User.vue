<template>
  <v-container fluid>
    <template v-if="$route.params.uid === $store.state.curtUser_uid">
      <v-card max-width="1000px" style="margin: 0 auto; border-radius: 15px; padding: 15px">
        <p class="indigo--text headline font-weight-medium pl-3">
          <v-icon color="indigo" class="pr-2">info</v-icon>
          Account Details
        </p>
        <v-divider></v-divider>
        <v-layout column>
          <v-flex>
            <v-layout row nowrap class="pt-2">
              <v-flex xs3>
                <span class="grey--text subheading">User ID</span>
              </v-flex>
              <v-flex xs9>
                <p class="headline breakword font-weight-light">{{ targetUser._id }}</p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-divider></v-divider>
          <v-flex>
            <v-layout row nowrap class="pt-2">
              <v-flex xs3>
                <span class="grey--text subheading">User Name</span>
              </v-flex>
              <v-flex xs9>
                <p class="headline breakword font-weight-light">{{ targetUser.userName }}</p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-divider></v-divider>
          <v-flex>
            <v-layout row nowrap class="pt-2">
              <v-flex xs3>
                <span class="grey--text subheading">Email Address</span>
              </v-flex>
              <v-flex xs9>
                <p class="headline breakword font-weight-light">{{ targetUser.email }}</p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-divider></v-divider>
          <v-flex>
            <v-layout row nowrap class="pt-2">
              <v-flex xs3>
                <span class="grey--text subheading">Phone Number</span>
              </v-flex>
              <v-flex xs9>
                <p class="headline breakword font-weight-light">{{ targetUser.phone }}</p>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-divider></v-divider>
        </v-layout>
      </v-card>
    </template>
    <template v-else>
      <p class="subheading pink--text font-weight-medium">
        Forbidden
      </p>
    </template>
  </v-container>
</template>

<script>
import UserService from '@/api/UserService'

export default {
  data: function() {
    return {
      users: null,
      targetUser: null,
      error: ''
    }
  },
  async created() {
    try {
      this.users = await UserService.getUser()
      for (let i = 0; i !== this.users.length; ++i) {
        if (this.users[i]._id === this.$route.params.uid) {
          this.targetUser = this.users[i]
          break
        }
      }
    } catch(err) {
      this.error = err.message
    }
  },
  computed: {
    loginState: function() {
      return this.$store.state.curtUser_uid !== null
    }
  },
  watch: {
    // return to homepage when user logout
    loginState: function() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped>
.center {
  margin: 0 auto;
}

.breakword {
  word-wrap: break-word;
}
</style>