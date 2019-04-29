<!--
  This is the UserGet component on Admin page on /admin.
  It can be used to get all the users in the database.
-->

<template>
  <div style="padding: 20px">
    <p class="headline black--text">User GET</p>
    <template v-if="users">
      <p v-for="user in users" :key="user._id" class="subheading">{{ user }}</p>
    </template>
    <v-btn color="error" @click="adminGetUser()">GET</v-btn>
    <v-btn color="indigo" class="white--text" @click="users = null">CLEAR</v-btn>
  </div>
</template>

<script>
import UserService from '@/api/UserService'

export default {
  data: function() {
    return {
      users: null,
      error: null
    }
  },
  methods: {
    async adminGetUser() {
      try {
        this.users = await UserService.getUser()
      } catch(err) {
        this.error = err.message
      }
    }
  }
}
</script>