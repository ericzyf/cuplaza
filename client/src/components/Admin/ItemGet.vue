<!--
  This is the ItemGet component on Admin page on /admin.
  It can be used to get all the items in the database.
-->

<template>
  <div style="padding: 20px">
    <p class="headline black--text">Item GET</p>
    <template v-if="items">
      <p v-for="item in items" :key="item._id" class="subheading">{{ item }}</p>
    </template>
    <v-btn color="error" @click="adminGetItem()">GET</v-btn>
    <v-btn color="indigo" class="white--text" @click="items = null">CLEAR</v-btn>
  </div>
</template>

<script>
import ItemService from '@/api/ItemService'

export default {
  data: function() {
    return {
      items: null,
      error: null
    }
  },
  methods: {
    async adminGetItem() {
      try {
        this.items = await ItemService.getItem()
      } catch(err) {
        this.error = err.message
      }
    }
  }
}
</script>
