<template>
  <section>
    <h1 class="title is-size-5">Beyaz Yaka İşe Giriş</h1>
    <hr>
    <document-status :item="widgetForm.item" :edit="false" />
    <paper-work-widget :item="widgetForm.item" :edit="false" :search="false" />
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import DocumentStatus from '@/components/DocumentStatus'
import PaperWorkWidget from '@/components/PaperWorkWidget'

export default {
  middleware: 'auth',
  components: {
    DocumentStatus,
    PaperWorkWidget
  },
  computed: {
    ...mapState(['widgetForm'])
  },
  beforeMount() {
    const state = JSON.parse(localStorage.getItem('state'))
    this.resetStateItem(state.widgetForm.item)
    this.resetStateEditItem(state.widgetForm.editItem)
    console.log(state.widgetForm.editItem)
  },
  methods: {
    ...mapMutations({
      resetStateItem: 'widgetForm/item',
      resetStateEditItem: 'widgetForm/editItem'
    })
  }
}
</script>
