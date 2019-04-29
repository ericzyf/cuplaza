<!-- search page @ /search -->

<template>
  <v-container fluid grid-list-lg>
    <template v-if="results.length > 0">
      <p class="headline blue-grey--text font-weight-medium">
        <span>Search results for </span>
        {{ "'" + decodeKeyword($route.params.b64) + "'" }}
      </p>
      <p class="subheading orange--text font-weight-medium">
        Found {{ results.length }} item(s)
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
        <span>Search results for </span>
        {{ "'" + decodeKeyword($route.params.b64) + "'" }}
      </p>
      <p class="subheading pink--text font-weight-medium">
        No matching items
      </p>
    </template>
  </v-container>
</template>

<script>
import ItemCard from '@/components/ItemCard'
import SearchService from '@/api/SearchService'
import UserService from '@/api/UserService'

const base64url = require('base64url')

export default {
  components: {
    ItemCard
  },
  data: function() {
    return {
      results: [],
      users: [],
      error: '',
      ItemCardProps: []
    }
  },
  methods: {
    /**
     * decode the search keyword which was encoded in base64url
     * @param b64 base64url encoded search keyword
     */
    decodeKeyword: function(b64) {
      return base64url.decode(b64)
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
      this.results = await SearchService.searchItem(this.$route.params.b64)
      this.users = await UserService.getUser()
      this.results.reverse()
      this.ItemCardProps = this.generateItemCardProps(this.results, this.users)
    } catch(err) {
      this.error = err.message
    }
  },
  watch: {
    async $route (to) {
      // update search results
      try {
        this.results = await SearchService.searchItem(to.params.b64)
        this.results.reverse()
        this.ItemCardProps = this.generateItemCardProps(this.results, this.users)
      } catch(err) {
        this.error = err.message
      }
    }
  }
}
</script>
