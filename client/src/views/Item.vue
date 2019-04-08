<template>
  <div style="margin: 40px 0 0">
    <template v-if="targetItem">
      <v-layout row wrap>
        <v-flex xs12 md6>
          <v-carousel style="max-width: 90%; margin: 0 auto;">
            <v-carousel-item
              contain
              :src="targetItem.imgUrl"
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
        <v-flex xs12 md6>
          <div style="max-width: 90%; height: 100%; margin: 0 auto;">
            <v-layout column justify-space-between fill-height>
              <v-flex>
                <p class="display-1" style="word-wrap: break-word">{{ targetItem.title }}</p>
                <p class="blue-grey--text subheading">{{ targetItem.timeStamp }}</p>
                <p class="blue-grey--text subheading">{{ categoryName(targetItem.category) }}</p>
              </v-flex>

              <!-- align bottom -->
              <v-flex shrink>
                <p class="orange--text headline">{{ targetItem.price }} {{ targetItem.currency }}</p>
                <v-btn color="deep-orange white--text" large>
                  <v-icon left>shopping_cart</v-icon>
                  Order
                </v-btn>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>
    </template>
  </div>
</template>

<script>
import ItemService from '@/api/ItemService'

export default {
  data: function() {
    return {
      items: null,
      targetItem: null,
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
      for (let i = 0; i !== this.items.length; ++i) {
        if (this.items[i]._id === this.$route.params.id) {
          this.targetItem = this.items[i]
          break
        }
      }
    } catch(err) {
      this.error = err.message
    }
  }
}
</script>