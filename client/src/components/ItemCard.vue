<template>
  <v-flex xs12 sm6 md4 lg3>
    <v-card style="padding: 10px">
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
      <v-card-title>
        <div>
          <p>{{ item.timeStamp }}</p>
        </div>
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
export default {
  props: ['item'],
  computed: {
    routeString: function() {
      return `/item/${this.item._id}`
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