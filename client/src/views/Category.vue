<template>
  <v-container fluid grid-list-lg>
    <template v-if="filteredItems.length > 0">
      <p class="headline blue-grey--text font-weight-medium">
        {{ categoryName($route.params.id) }}
      </p>
      <v-layout row wrap>
        <ItemCard
          v-for="v in ItemCardProps"
          :key="v.item._id"
          :item="v.item"
          :seller="v.seller"
        />
      </v-layout>
    </template>
    <template v-else>
      <p class="headline blue-grey--text font-weight-medium">
        {{ categoryName($route.params.id) }}
      </p>
      <v-layout row wrap>
        <p class="subheading pink--text font-weight-medium">
          No items in this category
        </p>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import ItemCard from '@/components/ItemCard'
import ItemService from '@/api/ItemService'
import UserService from '@/api/UserService'

export default {
  components: {
    ItemCard
  },
  data: function() {
    return {
      items: [],
      users: [],
      filteredItems: [],
      ItemCardProps: [],
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
    },
    generateItemCardProps(items, users) {
      let props = []
      for (let i = 0; i !== items.length; ++i) {
        let sellerInfo = null
        for (let j = 0; j !== users.length; ++j) {
          if (users[j]._id === items[i].uid) {
            sellerInfo = users[j]
            break
          }
        }
        props.push({
          item: items[i],
          seller: sellerInfo
        })
      }
      return props
    }
  },
  async created() {
    try {
      this.items = await ItemService.getItem()
      this.users = await UserService.getUser()
      // filter items
      for (let i = 0; i < this.items.length; ++i) {
        if (this.items[i].category === parseInt(this.$route.params.id)) {
          this.filteredItems.unshift(this.items[i])
        }
      }
      this.ItemCardProps = this.generateItemCardProps(this.filteredItems, this.users)
    } catch(err) {
      this.error = err.message
    }
  },
  watch: {
    $route (to) {
      // update filtered items
      this.filteredItems = []
      for (let i = 0; i < this.items.length; ++i) {
        if (this.items[i].category === parseInt(to.params.id)) {
          this.filteredItems.unshift(this.items[i])
        }
      }
      this.ItemCardProps = this.generateItemCardProps(this.filteredItems, this.users)
    }
  }
}
</script>