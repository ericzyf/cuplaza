<!--
  This is the ItemDelete component on Admin page on /admin.
  It can be used to delete items in the database.
-->

<template>
  <div style="padding: 20px">
    <p class="headline black--text">Item DELETE</p>
    <v-text-field label="_id" v-model="id" outline></v-text-field>
    <v-btn color="error" @click="adminDeleteItem(id)">DELETE</v-btn>
  </div>
</template>

<script>
import ItemService from '@/api/ItemService'

export default {
  data: function() {
    return {
      id: null
    }
  },
  methods: {
    /**
     * delete item
     * @param id id of the item to be deleted
     */
    async adminDeleteItem(id) {
      if (id !== null) {
        await ItemService.deleteItem(id)
        alert(`DELETE ${id}`)
      }
    }
  }
}
</script>