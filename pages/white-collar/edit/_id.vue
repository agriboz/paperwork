<template>
  <section>
    <document-status :item="widgetForm.editItem" :edit="true" />
    <paper-work-widget :item="widgetForm.editItem" :position="true" :edit="true" />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import DocumentStatus from '@/components/DocumentStatus'
import PaperWorkWidget from '@/components/PaperWorkWidget'

export default {
  middleware: 'auth',
  components: {
    DocumentStatus,
    PaperWorkWidget
  },
  async fetch({ store, params }) {
    await store.dispatch('widgetForm/getEditItem', params.id)
    await store.dispatch('documentDetail/getMandatoryDocuments', params.id)
  },
  computed: {
    ...mapState(['widgetForm'])
  }
}
</script>
