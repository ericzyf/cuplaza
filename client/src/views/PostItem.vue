<template>
  <v-container fluid>
    <template v-if="$route.params.uid === $store.state.curtUser_uid">
      <p>{{ $route.params.uid }}</p>
      <p>{{ $store.state.curtUser_userName }}</p>
    </template>
    <template v-else>
      <p class="subheading pink--text font-weight-medium">
        Forbidden
      </p>
    </template>
  </v-container>
</template>

<script>
export default {

}
</script>