<template>
  <v-flex xs12 sm6 md4 lg3>
    <v-card class="pa-3" style="border-radius: 25px; padding: 25px;">
      <div class="no-link-decoration">
        <router-link :to="routeString">
          <p class="title item-title black--text ma-1">{{ item.title }}</p>
        </router-link>
        <router-link :to="`/category/${item.category}`">
          <span class="font-italic pink--text">{{ categoryName }}</span>
        </router-link>
        <router-link :to="routeString">
          <v-img
            class="black--text"
            height="120px"
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
        <!-- users can only order the items posted by others -->
        <template v-if="seller._id !== $store.state.curtUser_uid">
          <v-btn color="deep-orange white--text" @click="orderHandler()">
            <v-icon left>shopping_cart</v-icon>
            Order
          </v-btn>
        </template>
        <template v-else>
          <v-btn disabled>
            <v-icon left>shopping_cart</v-icon>
            Order
          </v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['item', 'seller'],
  methods: {
    orderHandler: function() {
      this.$router.push({ path: `/order/${this.item._id}` })
    }
  },
  computed: {
    routeString: function() {
      return `/item/${this.item._id}`
    },
    categoryName: function() {
      const catList = [
        'Beauty & Personal Care',
        'Books',
        'Electronics',
        'Fashion',
        'Services',
        'Others'
      ]
      return catList[this.item.category]
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