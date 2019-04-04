<template>
  <v-app>
    <PrimaryAppBar />
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import PrimaryAppBar from '@/components/PrimaryAppBar'
import Footer from '@/components/Footer'

export default {
  components: {
    PrimaryAppBar,
    Footer
  }
}
</script>

<style scoped>
#primary-footer span {
  font-weight: 500;
}
</style>