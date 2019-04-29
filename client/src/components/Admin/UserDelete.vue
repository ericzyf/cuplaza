<!--
  This is the UserDelete component on Admin page on /admin.
  It can be used to delete a user in the database.
-->

<template>
  <div style="padding: 20px">
    <p class="headline black--text">User DELETE</p>
    <v-text-field label="_id" v-model="id" outline></v-text-field>
    <v-btn color="error" @click="adminDeleteUser(id)">DELETE</v-btn>
  </div>
</template>

<script>
import UserService from '@/api/UserService'

export default {
  data: function() {
    return {
      id: null
    }
  },
  methods: {
    /**
     * delete user
     * @param id id of the user to be deleted
     */
    async adminDeleteUser(id) {
      if (id !== null) {
        await UserService.deleteUser(id)
        alert(`DELETE ${id}`)
      }
    }
  }
}
</script>