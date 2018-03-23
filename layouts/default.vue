<template>
  <div>

    <div>
      <PaperWorkHeader />

      <div class="columns container is-fluid">
        <Sidebar v-if="isAuthenticated" />
        <nuxt class="column main" />
        <b-loading :active.sync="ui.loading" :can-cancel="true"/>
      </div>
    </div>


  </div>
</template>

<script>
import PaperWorkHeader from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { mapState } from 'vuex'

export default {
  components: {
    PaperWorkHeader,
    Sidebar
  },
  props: ['error'],
  computed: {
    ...mapState(['ui', 'isAuthenticated'])
  }
}
</script>
