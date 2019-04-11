<template>
  <v-container fluid>
    <template v-if="$store.state.curtUser_uid">
      <v-card max-width="1000px" style="margin: 0 auto; border-radius: 15px; padding: 15px;">
        <p class="deep-orange--text headline font-weight-medium pl-3">
          <v-icon color="deep-orange" class="pr-2">add_shopping_cart</v-icon>
          Order Item
        </p>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex sm12 md4>
            <div class="ma-2" style="border: 1px solid grey">
              <v-img
                :src="targetItem.imgUrl"
                contain
                aspect-ratio="1"
              />
            </div>
          </v-flex>
          <v-flex sm12 md8>
            <v-layout column justify-between fill-height>
              <v-flex>
                <div class="no-wrap mx-2 my-3">
                  <p class="subheading font-weight-bold">{{ targetItem.title }}</p>
                  <span class="subheading pink--text">{{ categoryName(targetItem.category) }}</span>
                  <span class="blue-grey--text pl-5">{{ targetItem.timeStamp }}</span>
                </div>
              </v-flex>
              <v-flex>
                <div class="no-wrap pa-3">
                  <p class="subheading font-weight-light" style="margin: 0">{{ seller.userName }}</p>
                  <p class="subheading font-weight-light" style="margin: 0">{{ seller.email }}</p>
                  <p class="subheading font-weight-light" style="margin: 0">{{ seller.phone }}</p>
                </div>
              </v-flex>
              <v-divider></v-divider>
              <v-flex>
                <div class="pa-3">
                  <span class="deep-orange--text title font-weight-black" style="margin: 0 auto">
                    {{ targetItem.price }}&nbsp;{{ targetItem.currency }}
                  </span>
                  <template v-if="!proceeding">
                    <v-btn color="teal white--text" @click="confirmHandler()">
                      <v-icon left>add_shopping_cart</v-icon>
                      Confirm
                    </v-btn>
                  </template>
                  <template v-else>
                    <v-progress-circular
                      indeterminate
                      color="teal"
                    ></v-progress-circular>
                  </template>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </template>
    <template v-else>
      <p class="subheading pink--text font-weight-medium">
        Please log in before ordering items
      </p>
    </template>
  </v-container>
</template>

<script>
import ItemService from '@/api/ItemService'
import UserService from '@/api/UserService'
import OrderService from '@/api/OrderService'

export default {
  data: function() {
    return {
      items: null,
      targetItem: null,
      users: null,
      seller: null,
      error: '',
      proceeding: false,
      json: {
        sellerId: null,
        buyerId: null,
        item: null
      }
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
    confirmHandler: async function() {
      this.proceeding = true
      this.json.sellerId = this.targetItem.uid
      this.json.buyerId = this.$store.state.curtUser_uid
      this.json.item = this.targetItem
      await OrderService.postOrder(this.json)
      alert('Order successfully.')
      await ItemService.deleteItem(this.json.item._id)
      this.$router.push({ path: '/' })
    }
  },
  async created() {
    try {
      // get item info
      this.items = await ItemService.getItem()
      for (let i = 0; i !== this.items.length; ++i) {
        if (this.items[i]._id === this.$route.params.id) {
          this.targetItem = this.items[i]
          break
        }
      }
      // get seller info
      this.users = await UserService.getUser()
      for (let i = 0; i !== this.users.length; ++i) {
        if (this.users[i]._id === this.targetItem.uid) {
          this.seller = this.users[i]
          break
        }
      }
    } catch(err) {
      this.error = err.message
    }
  }
}
</script>

<style scoped>
.no-wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>