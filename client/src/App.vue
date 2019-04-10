<template>
  <v-app style="background-color: #eee">
    <PrimaryAppBar />
    <v-content>
      <router-view style="max-width: 90%"></router-view>
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