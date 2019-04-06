<template>
  <div style="padding: 20px">
    <p class="headline black--text">User POST</p>
    <v-text-field label="userName" v-model="json.userName" outline></v-text-field>
    <v-text-field label="password" v-model="json.password" outline></v-text-field>
    <v-text-field label="email" v-model="json.email" outline></v-text-field>
    <v-text-field label="phone" v-model="json.phone" outline></v-text-field>
    <v-btn color="error" @click="adminPostUser(json)">POST</v-btn>
  </div>
</template>

<script>
import UserService from '@/api/UserService'

export default {
  data: function() {
    return {
      json: {
        userName: null,
        password: null,
        email: null,
        phone: null
      }
    }
  },
  methods: {
    async adminPostUser(user) {
      await UserService.postUser(user)
      alert('POST\n' + JSON.stringify(user))
    }
  }
}
</script>