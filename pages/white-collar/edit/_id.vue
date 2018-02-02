<template>
  <section class="section">
    <document-status :item="widgetForm.editItem" :edit="true" />
    <paper-work-widget :item="widgetForm.editItem" :edit="true" />
    {{widgetForm.editItem}}
  </section>
</template>

<script>
import { mapState } from 'vuex'
import DocumentStatus from '@/components/DocumentStatus'
import PaperWorkWidget from '@/components/PaperWorkWidget'

  export default {
    async asyncData ({ store, params }) {
      await store.dispatch('widgetForm/getEditItem', params.id)
    },
    computed: {
      ...mapState(['widgetForm'])
    },
    components: {
      DocumentStatus,
      PaperWorkWidget
    }
  }
</script>

<style scoped>

</style>
