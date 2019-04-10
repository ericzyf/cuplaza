<template>
  <v-flex xs12 sm6 md4 lg3>
    <v-card class="pa-3">
      <div class="no-link-decoration">
        <router-link :to="routeString">
          <p class="headline item-title font-weight-medium black--text">{{ item.title }}</p>
          <v-img
            class="black--text"
            height="200px"
            contain
            :src="item.imgUrl"
          ></v-img>
        </router-link>
      </div>
      <v-card-title class="pt-5">
        <v-layout row align-center>
          <v-flex xs2>
            <v-avatar color="indigo" size="36">
              <span class="white--text headline">
                {{ seller.userName.toUpperCase()[0] }}
              </span>
            </v-avatar>
          </v-flex>
          <v-flex xs10>
            <v-layout column>
              <v-flex>
                <span>
                  Seller:&nbsp;
                  <span class="font-weight-medium">{{ seller.userName }}</span>
                </span>
              </v-flex>
              <v-flex>
                <span>
                  Posted on:&nbsp;
                  <span class="font-weight-medium">{{ item.timeStamp }}</span>
                </span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-card-actions>
        <p class="orange--text title">{{ item.price }} {{ item.currency }}</p>
        <v-spacer></v-spacer>
        <v-btn color="deep-orange white--text">
          <v-icon left>shopping_cart</v-icon>
          Order
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
import UserService from '@/api/UserService'

export default {
  props: ['item'],
  data: function() {
    return {
      users: null,
      error: '',
      seller: null
    }
  },
  computed: {
    routeString: function() {
      return `/item/${this.item._id}`
    }
  },
  async created() {
    try {
      this.users = await UserService.getUser()
      for (let i = 0; i !== this.users.length; ++i) {
        if (this.users[i]._id === this.item.uid) {
          this.seller = this.users[i]
        }
      }
    } catch(err) {
      this.error = err.message
    }
  }
}
</script>

<style scoped>
.no-link-decoration a {
  text-decoration: none;
}

.item-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>