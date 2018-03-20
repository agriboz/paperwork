<template>
  <div>
    <div>
      <PaperWorkHeader />
      <div class="columns container is-fluid">
        <Sidebar />
        <nuxt class="column main" />
        <b-loading :active.sync="ui.loading" :can-cancel="true"/>
      </div>
    </div>
  </div>
</template>

<script>
import PaperWorkHeader from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { mapState, mapGetters } from 'vuex'

export default {
  middleware: 'auth',
  components: {
    PaperWorkHeader,
    Sidebar
  },
  computed: {
    ...mapState(['ui']),
    ...mapGetters({ test: 'shared/isEmployee' })
  }
}
</script>
