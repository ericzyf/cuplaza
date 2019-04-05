<template>
  <div style="padding: 20px">
    <p class="headline black--text">Item POST</p>
    <v-text-field label="uid" v-model="json.uid" outline></v-text-field>
    <v-text-field label="category" v-model="json.category" outline></v-text-field>
    <v-text-field label="title" v-model="json.title" outline></v-text-field>
    <v-text-field label="price" v-model="json.price" outline></v-text-field>
    <v-text-field label="currency" v-model="json.currency" outline></v-text-field>
    <v-text-field label="imgUrl" v-model="json.imgUrl" outline></v-text-field>
    <v-btn color="error" @click="adminPostItem(json)">POST</v-btn>
  </div>
</template>

<script>
import ItemService from '@/api/ItemService'

export default {
  data: function() {
    return {
      json: {
        uid: null,
        category: null,
        title: null,
        price: null,
        currency: null,
        imgUrl: null
      }
    }
  },
  methods: {
    async adminPostItem(item) {
      if (item.uid !== null &&
          item.category !== null &&
          item.title !== null &&
          item.price !== null &&
          item.currency !== null &&
          item.imgUrl !== null) {
        const json = {
          ...item,
          uid: parseInt(item.uid),
          category: parseInt(item.category),
          price: parseInt(item.price)
        }
        await ItemService.postItem(json)
        alert('POST\n' + JSON.stringify(json))
      }
    }
  }
}
</script>
