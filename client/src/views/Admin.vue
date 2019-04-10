<template>
  <v-container fluid style="border-left: 10px solid #00ff00;">
    <v-toolbar dense color="indigo" class="white--text">
      <v-icon large class="white--text logo">settings</v-icon>
      <v-toolbar-title>ADMIN PANEL</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <div style="background-color: #eee">
      <ItemSearch />
      <v-divider></v-divider>
      <ItemGet />
      <v-divider></v-divider>
      <ItemPost />
      <v-divider></v-divider>
      <ItemDelete />
      <v-divider></v-divider>
      <UserGet />
      <v-divider></v-divider>
      <UserPost />
      <v-divider></v-divider>
      <UserDelete />
      <v-divider></v-divider>
    </div>
  </v-container>
</template>

<script>
import ItemSearch from '@/components/Admin/ItemSearch'
import ItemGet from '@/components/Admin/ItemGet'
import ItemPost from '@/components/Admin/ItemPost'
import ItemDelete from '@/components/Admin/ItemDelete'
import UserGet from '@/components/Admin/UserGet'
import UserPost from '@/components/Admin/UserPost'
import UserDelete from '@/components/Admin/UserDelete'

export default {
  components: {
    ItemSearch,
    ItemGet,
    ItemPost,
    ItemDelete,
    UserGet,
    UserPost,
    UserDelete
  }
}
</script>

<style scoped>
.logo {
  animation: logo-spin infinite 3s linear;
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
}
</style>