<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <ItemCard
        v-for="v in ItemCardProps"
        :key="v.item._id"
        :item="v.item"
        :seller="v.seller"
      />
    </v-layout>
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
      ItemCardProps: [],
      error: ''
    }
  },
  methods: {
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
      this.items.reverse()
      this.ItemCardProps = this.generateItemCardProps(this.items, this.users)
    } catch(err) {
      this.error = err.message
    }
  }
}
</script>