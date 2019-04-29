<!--
  This is the ItemSearch component on Admin page on /admin.
  It can be used to search items in the database.
-->

<template>
  <div style="padding: 20px">
    <p class="headline black--text">Item Search</p>
    <template v-if="keyword">
      <p class="title pink--text">
        <span class="black--text">base64url: </span>
        {{ b64Keyword }}
      </p>
    </template>
    <v-text-field label="searchKeyword" v-model="keyword" outline clearable></v-text-field>
    <v-btn icon @click="adminSearchItem()">
      <v-icon color="primary">search</v-icon>
    </v-btn>
    <v-btn color="indigo" class="white--text" @click="clear()">CLEAR</v-btn>
    <template v-if="items">
      <p v-for="item in items" :key="item._id" class="subheading">{{ item }}</p>
    </template>
  </div>
</template>

<script>
import SearchService from '@/api/SearchService'

const base64url = require('base64url')

export default {
  data: function() {
    return {
      keyword: '',
      items: null,
      error: null
    }
  },
  methods: {
    async adminSearchItem() {
      try {
        this.items = await SearchService.searchItem(this.b64Keyword)
      } catch(err) {
        this.error = err.message
      }
    },
    clear: function() {
      this.keyword = ''
      this.items = null
      this.error = null
    }
  },
  computed: {
    b64Keyword: function() {
      return base64url(this.keyword)
    }
  }
}
</script>