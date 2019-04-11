<template>
  <v-container fluid>
    <template v-if="$route.params.uid === $store.state.curtUser_uid">
      <v-card max-width="1000px" style="margin: 0 auto; border-radius: 15px; padding: 15px;">
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

      <v-card max-width="1000px" style="margin: 20px auto; border-radius: 15px; padding: 15px;">
        <p class="green--text headline font-weight-medium pl-3">
          <v-icon color="green" class="pr-2">store</v-icon>
          Current Selling Items
        </p>
        <v-divider></v-divider>
        <v-layout column>
          <v-flex v-for="item in bought" :key="item._id" class="blue lighten-4">
            <span class="blue-grey--text">{{ item.timeStamp }}</span>
            <p class="deep-orange--text ma-0 font-weight-bold">{{ item.itemInfo.title }}</p>
            <span class="indigo--text pa-1">{{ item.sellerInfo.userName }}</span>
            <span class="indigo--text pa-1">{{ item.sellerInfo.email }}</span>
            <span class="indigo--text pa-1">{{ item.sellerInfo.phone }}</span>
            <v-divider></v-divider>
          </v-flex>
        </v-layout>
      </v-card>

      <v-card max-width="1000px" style="margin: 20px auto; border-radius: 15px; padding: 15px;">
        <p class="teal--text headline font-weight-medium pl-3">
          <v-icon color="teal" class="pr-2">description</v-icon>
          Order History
        </p>
        <v-divider></v-divider>
        <v-layout column>
          <v-flex>
            <p class="red--text subheading font-weight-medium pl-3 ma-1">
              <v-icon color="red" class="pr-2">call_received</v-icon>
              Bought Items
            </p>
            <v-divider></v-divider>
            <v-layout column>
              <v-flex v-for="item in bought" :key="item._id" class="red lighten-4">
                <span class="blue-grey--text">{{ item.timeStamp }}</span>
                <p class="deep-orange--text ma-0 font-weight-bold">{{ item.itemInfo.title }}</p>
                <span class="indigo--text pa-1">{{ item.sellerInfo.userName }}</span>
                <span class="indigo--text pa-1">{{ item.sellerInfo.email }}</span>
                <span class="indigo--text pa-1">{{ item.sellerInfo.phone }}</span>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <p class="green--text subheading font-weight-medium pl-3 ma-1">
              <v-icon color="green" class="pr-2">call_made</v-icon>
              Sold Items
            </p>
            <v-divider></v-divider>
            <v-layout column>
              <v-flex v-for="item in sold" :key="item._id" class="green lighten-4">
                <span class="blue-grey--text">{{ item.timeStamp }}</span>
                <p class="deep-orange--text ma-0 font-weight-bold">{{ item.itemInfo.title }}</p>
                <span class="indigo--text pa-1">{{ item.buyerInfo.userName }}</span>
                <span class="indigo--text pa-1">{{ item.buyerInfo.email }}</span>
                <span class="indigo--text pa-1">{{ item.buyerInfo.phone }}</span>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row nowrap>
              <v-flex xs3>
              </v-flex>
              <v-flex xs9>
              </v-flex>
            </v-layout>
          </v-flex>
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
import OrderService from '@/api/OrderService'

export default {
  data: function() {
    return {
      users: [],
      targetUser: {},
      error: '',
      orders: [],
      sold: [],
      bought: []
    }
  },
  methods: {
    getUser: function(uid) {
      let ret = null
      for (let i = 0; i !== this.users.length; ++i) {
        if (this.users[i]._id === uid) {
          ret = this.users[i]
          break
        }
      }
      return ret
    }
  },
  async created() {
    try {
      // get user info
      this.users = await UserService.getUser()
      for (let i = 0; i !== this.users.length; ++i) {
        if (this.users[i]._id === this.$route.params.uid) {
          this.targetUser = this.users[i]
          break
        }
      }
      // get order info
      this.orders = await OrderService.getOrder()
      for (let i = 0; i !== this.orders.length; ++i) {
        if (this.orders[i].sellerId === this.$route.params.uid) {
          this.sold.push({
            itemInfo: this.orders[i].item,
            buyerInfo: this.getUser(this.orders[i].buyerId),
            timeStamp: this.orders[i].timeStamp
          })
        } else if (this.orders[i].buyerId === this.$route.params.uid) {
          this.bought.push({
            itemInfo: this.orders[i].item,
            sellerInfo: this.getUser(this.orders[i].sellerId),
            timeStamp: this.orders[i].timeStamp
          })
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