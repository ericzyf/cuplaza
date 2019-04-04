<template>
  <v-container fluid>
    <v-card class="center" max-width="500px">
      <v-layout column style="padding: 20px 20px 0">
        <v-flex class="text-xs-center">
          <v-avatar color="pink">
            <v-icon large class="white--text">account_circle</v-icon>
          </v-avatar>
          <p class="display-1" style="margin: 5px 0 20px">Sign Up</p>
          <v-divider></v-divider>
          <v-form class="py-5 px-4">
            <v-text-field clearable label="Email *"></v-text-field>
            <v-text-field clearable label="Phone Number *"></v-text-field>
            <v-text-field clearable label="User Name *"></v-text-field>
            <v-text-field
              label="Password *"
              :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
              :type="passwordVisible ? 'text' : 'password'"
              v-model="password"
              @click:append="passwordVisible = !passwordVisible;"
            ></v-text-field>
            <v-text-field
              label="Confirm Password *"
              :rules="[rules.passwdMatch]"
              :append-icon="confirmPasswordVisible ? 'visibility' : 'visibility_off'"
              :type="confirmPasswordVisible ? 'text' : 'password'"
              v-model="confirmPassword"
              @click:append="confirmPasswordVisible = !confirmPasswordVisible"
            ></v-text-field>
            <v-btn color="primary" block class="mt-3">Join CUPlaza</v-btn>
          </v-form>
        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      passwordVisible: false,
      confirmPasswordVisible: false,
      password: '',
      confirmPassword: '',
      rules: {
        passwdMatch: v => (v === this.password) || "Password doesn't match"
      }
    }
  }
}
</script>

<style scoped>
.center {
  margin: 0 auto;
}
</style>