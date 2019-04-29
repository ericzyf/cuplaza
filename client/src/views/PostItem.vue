<!-- postitem page @ /postitem -->

<template>
  <v-container fluid>
    <template v-if="$route.params.uid === $store.state.curtUser_uid">
      <v-card max-width="900px" style="margin: 0 auto; border-radius: 15px; padding: 15px;">
        <p class="green--text headline font-weight-medium pl-3">
          <v-icon color="green" class="pr-2">call_made</v-icon>
          Post Item
        </p>
        <v-divider></v-divider>
        <v-layout row nowrap justify-space-around>
          <v-flex xs5>
            <v-text-field
              label="Item Name"
              v-model="json.title"
            ></v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-select
              :items="catList"
              label="Category"
              v-model="catSelection"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row nowrap justify-space-around>
          <v-flex xs5>
            <v-text-field
              label="Price"
              v-model="json.price"
            ></v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-text-field
              label="Currency (e.g., HKD)"
              v-model="json.currency"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-flex xs11>
            <v-text-field
              label="imgUrl"
              v-model="json.imgUrl"
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row justify-center>
          <v-flex xs11>
            <v-textarea
              outline
              auto-grow
              label="Item Description"
              v-model="json.description"
            ></v-textarea>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row nowrap justify-space-around>
          <v-flex shrink>
            <v-btn color="green" class="white--text" @click="postHandler()">Post</v-btn>
          </v-flex>
          <v-flex shrink>
            <v-btn color="error" @click="clearHandler()">Clear</v-btn>
          </v-flex>
        </v-layout>
      </v-card>
    </template>
    <template v-else>
      <p class="subheading pink--text font-weight-medium">
        Forbidden
      </p>
    </template>
  </v-container>
</template>

<script>
import ItemService from '@/api/ItemService'

export default {
  data: function() {
    return {
      catSelection: null,
      catList: [
        'Beauty & Personal Care',
        'Books',
        'Electronics',
        'Fashion',
        'Services',
        'Others'
      ],
      json: {
        uid: this.$route.params.uid,
        category: null,
        title: null,
        price: null,
        currency: null,
        imgUrl: null,
        description: null
      }
    }
  },
  methods: {
    // check if the string is empty or not
    stringNotEmpty: function(str) {
      return str !== null && str.length > 0
    },
    // handle item post
    postHandler: async function() {
      // if all the information of the item has been filled up
      if (this.json.category !== null &&
          this.stringNotEmpty(this.json.title) &&
          this.stringNotEmpty(this.json.price) &&
          this.stringNotEmpty(this.json.currency) &&
          this.stringNotEmpty(this.json.imgUrl) &&
          this.stringNotEmpty(this.json.description)) {
        await ItemService.postItem(this.json)
        alert('Post successfully.')
        // jump to homepage
        this.$router.push({ path: '/' })
      } else {
        alert('Please check the form again before submitting.')
      }
    },
    clearHandler: function() {
      this.json.category = null
      this.json.title = null
      this.json.price = null
      this.json.currency = null
      this.json.imgUrl = null
      this.json.description = null
    }
  },
  computed: {
    // check login state stored in vuex
    loginState: function() {
      return this.$store.state.curtUser_uid !== null
    }
  },
  watch: {
    catSelection: function() {
      if (this.catSelection !== null) {
        for (let i = 0; i !== this.catList.length; ++i) {
          if (this.catList[i] === this.catSelection) {
            this.json.category = i
            break
          }
        }
      }
    },
    // return to homepage when user logout
    loginState: function() {
      this.$router.push({ path: '/' })
    }
  }
}
</script>
