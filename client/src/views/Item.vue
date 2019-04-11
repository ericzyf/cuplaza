<template>
  <v-container fluid>
    <template v-if="targetItem">
      <v-card class="pa-2">
        <p class="indigo--text headline font-weight-medium pl-3">
          <v-icon color="indigo" class="pr-2">info</v-icon>
          Item Details
        </p>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-carousel style="max-width: 90%; margin: 0 auto;">
              <v-carousel-item
                contain
                :src="targetItem.imgUrl"
              ></v-carousel-item>
            </v-carousel>
          </v-flex>
          <v-flex xs12 md6>
            <div style="max-width: 90%; height: 100%; margin: 0 auto;">
              <v-layout column justify-space-between fill-height>
                <v-flex shrink class="no-deco">
                  <p class="headline" style="word-wrap: break-word">{{ targetItem.title }}</p>
                  <p class="blue-grey--text subheading">{{ targetItem.timeStamp }}</p>
                  <router-link :to="`/category/${targetItem.category}`">
                    <span class="font-italic pink--text">
                      {{ categoryName(targetItem.category) }}
                    </span>
                  </router-link>
                </v-flex>
                <v-flex shrink>
                  <v-layout column>
                    <v-flex>
                      <v-layout row nowrap class="pt-2">
                        <v-flex xs3>
                          <span class="grey--text subheading">Seller Name</span>
                        </v-flex>
                        <v-flex xs9>
                          <p class="headline breakword font-weight-light">{{ seller.userName }}</p>
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
                          <p class="headline breakword font-weight-light">{{ seller.email }}</p>
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
                          <p class="headline breakword font-weight-light">{{ seller.phone }}</p>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <!-- align bottom -->
                <v-flex shrink>
                  <v-layout row nowrap justify-space-around align-center>
                    <v-flex shrink>
                      <span class="orange--text headline">
                        {{ targetItem.price }}&nbsp;{{ targetItem.currency }}
                      </span>
                    </v-flex>
                    <v-flex shrink>
                      <v-btn color="deep-orange white--text" large @click="orderHandler()">
                        <v-icon left>shopping_cart</v-icon>
                        Order
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <div class="pt-3" style="width: 90%; margin: 0 auto">
          <div class="headline font-weight-bold">Item Description</div>
          <div class="pa-4 font-weight-light" style="font-size: 1.2rem">
            {{ targetItem.description }}
          </div>
        </div>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import ItemService from '@/api/ItemService'
import UserService from '@/api/UserService'

export default {
  data: function() {
    return {
      items: [],
      targetItem: {},
      error: '',
      users: [],
      seller: {}
    }
  },
  methods: {
    categoryName: function(id) {
      const catList = [
        'Beauty & Personal Care',
        'Books',
        'Electronics',
        'Fashion',
        'Services',
        'Others'
      ]
      return catList[id]
    },
    orderHandler: function() {
      this.$router.push({ path: `/order/${this.targetItem._id}` })
    }
  },
  async created() {
    try {
      // get item info
      this.items = await ItemService.getItem()
      for (let i = 0; i !== this.items.length; ++i) {
        if (this.items[i]._id === this.$route.params.id) {
          this.targetItem = this.items[i]
          break
        }
      }
      // get seller info
      this.users = await UserService.getUser()
      for (let i = 0; i !== this.users.length; ++i) {
        if (this.users[i]._id === this.targetItem.uid) {
          this.seller = this.users[i]
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
.no-deco a {
  text-decoration: none;
}
</style>