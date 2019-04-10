<template>
  <v-container fluid>
    <template v-if="this.targetUser">
      <p>{{ this.targetUser }}</p>
    </template>
    <template v-else>
      <p class="subheading pink--text font-weight-medium">
        User doesn't exist
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
  }
}
</script>

<style scoped>
.center {
  margin: 0 auto;
}
</style>