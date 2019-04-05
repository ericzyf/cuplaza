<template>
  <v-flex xs12 sm6 md4 lg3>
    <v-card style="padding: 10px">
      <p class="headline item-title font-weight-medium">{{ item.title }}</p>
      <v-img
        class="black--text"
        height="200px"
        contain
        :src="item.imgUrl"
      >
      </v-img>
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
  props: ['item']
}
</script>

<style scoped>
.item-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>