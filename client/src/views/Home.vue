<template>
  <v-container fluid grid-list-sm>
    <v-layout row wrap>
      <ItemCard
        v-for="item in items"
        :key="item._id"
        :item="item"
      />
    </v-layout>
  </v-container>
</template>

<script>
import ItemCard from '@/components/ItemCard'
import ItemService from '@/api/ItemService'

export default {
  components: {
    ItemCard
  },
  data: function() {
    return {
      items: null,
      error: ''
    }
  },
  async created() {
    try {
      this.items = await ItemService.getItem()
    } catch(err) {
      this.error = err.message
    }
  }
}
</script>