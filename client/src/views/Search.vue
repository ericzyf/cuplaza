<template>
  <div>
    <template v-if="results.length > 0">
      <v-container fluid grid-list-sm>
        <p class="headline blue-grey--text font-weight-medium">
          <span>Search results for </span>
          {{ "'" + decodeKeyword($route.params.b64) + "'" }}
        </p>
        <p class="subheading orange--text font-weight-medium">
          Found {{ this.results.length }} item(s)
        </p>
        <v-layout row wrap>
          <ItemCard
            v-for="item in results"
            :key="item._id"
            :item="item"
          />
        </v-layout>
      </v-container>
    </template>
    <template v-else>
      <v-container fluid>
        <p class="headline blue-grey--text font-weight-medium">
          <span>Search results for </span>
          {{ "'" + decodeKeyword($route.params.b64) + "'" }}
        </p>
        <p class="subheading pink--text font-weight-medium">
          No matching items
        </p>
      </v-container>
    </template>
  </div>
</template>

<script>
import ItemCard from '@/components/ItemCard'
import SearchService from '@/api/SearchService'

const base64url = require('base64url')

export default {
  components: {
    ItemCard
  },
  data: function() {
    return {
      results: null,
      error: null
    }
  },
  methods: {
    decodeKeyword: function(b64) {
      return base64url.decode(b64)
    }
  },
  async created() {
    try {
      this.results = await SearchService.searchItem(this.$route.params.b64)
      this.results.reverse()
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
      } catch(err) {
        this.error = err.message
      }
    }
  }
}
</script>