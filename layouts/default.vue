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
  },
  beforeMount () {
    this.$store.dispatch('shared/getEmployee')
  }
}
</script>

<style>
html {
  background: #f5f5f5;
  height: 100vh;
}

.sidebar, .main {
  background-color: #fff;
  margin-top: 1rem;
  box-shadow: 0 2px 3px hsla(0,0%,7%,.1), 0 0 0 1px hsla(0,0%,7%,.1);
}

.main {
  max-width: 100%;
  margin: 15px -15px 0 15px;
}

.columns {
  margin-top: 0;
}

.container {
  min-height: 90vh;
}

</style>
