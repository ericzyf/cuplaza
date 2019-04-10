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
            <v-text-field
              clearable label="Email *"
              :rules="[rules.requiredField]"
              v-model="json.email"
            ></v-text-field>
            <v-text-field
              clearable label="Phone Number *"
              :rules="[rules.requiredField]"
              v-model="json.phone"
            ></v-text-field>
            <v-text-field
              clearable label="User Name *"
              :rules="[rules.requiredField]"
              v-model="json.userName"
            ></v-text-field>
            <v-text-field
              label="Password *"
              :rules="[rules.requiredField]"
              :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
              :type="passwordVisible ? 'text' : 'password'"
              v-model="json.password"
              @click:append="passwordVisible = !passwordVisible;"
            ></v-text-field>
            <v-text-field
              label="Confirm Password *"
              :rules="[rules.requiredField, rules.passwdMatch]"
              :append-icon="confirmPasswordVisible ? 'visibility' : 'visibility_off'"
              :type="confirmPasswordVisible ? 'text' : 'password'"
              v-model="confirmPassword"
              @click:append="confirmPasswordVisible = !confirmPasswordVisible"
            ></v-text-field>
            <v-btn color="primary" block class="mt-3" @click="signupHandler()">Join CUPlaza</v-btn>
          </v-form>

        </v-flex>
      </v-layout>
    </v-card>
  </v-container>
</template>

<script>
import UserService from '@/api/UserService'

export default {
  data: function() {
    return {
      passwordVisible: false,
      confirmPasswordVisible: false,
      confirmPassword: null,
      rules: {
        passwdMatch: v => (v === this.json.password) || "Password doesn't match",
        requiredField: v => (v !== null && v.length > 0) || "Required",
      },
      json: {
        email: null,
        phone: null,
        userName: null,
        password: null
      }
    }
  },
  methods: {
    stringNotEmpty: function(str) {
      return str !== null && str.length > 0
    },
    signupHandler: async function() {
      // proceed only if all the required fields have been filled up
      // and the two passwords match
      if (this.stringNotEmpty(this.json.email) &&
          this.stringNotEmpty(this.json.phone) &&
          this.stringNotEmpty(this.json.userName) &&
          this.stringNotEmpty(this.json.password) &&
          this.json.password === this.confirmPassword) {
        await UserService.postUser(this.json)
        alert('Your account has been created.')
      } else {
        alert('Sorry, please check your form again.')
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