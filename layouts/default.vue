<template>
  <div>
    <PaperWorkHeader />
    <div class="columns container is-fluid">
      <Sidebar />

      <nuxt class="column main" />
      <!-- <b-loading :active.sync="loading" :canCancel="true"></b-loading> -->
    </div>
  </div>
</template>

<script>
import PaperWorkHeader from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default {
  components: {
    PaperWorkHeader,
    Sidebar
  }
}
</script>

<style lang="scss">


</style>

