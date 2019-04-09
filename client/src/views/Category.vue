<template>
  <v-container fluid grid-list-lg>
    <p class="headline blue-grey--text font-weight-medium">
      {{ categoryName($route.params.id) }}
    </p>
    <v-layout row wrap>
      <ItemCard
        v-for="item in filteredItems"
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
      filteredItems: [],
      error: ''
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
    }
  },
  async created() {
    try {
      this.items = await ItemService.getItem()
      // filter items
      this.items.forEach((item) => {
        if (item.category === parseInt(this.$route.params.id)) {
          this.filteredItems.unshift(item)
        }
      })
    } catch(err) {
      this.error = err.message
    }
  },
  watch: {
    $route (to) {
      // update filtered items
      this.filteredItems = []
      this.items.forEach((item) => {
        if (item.category === parseInt(to.params.id)) {
          this.filteredItems.unshift(item)
        }
      })
    }
  }
}
</script>