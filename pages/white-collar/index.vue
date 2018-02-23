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
import resetState from '../../store'

  export default {
    computed: {
      ...mapState(['widgetForm'])
    },
    methods: {
      ...mapMutations({resetState: 'widgetForm/item'})
    },
    components: {
      DocumentStatus,
      PaperWorkWidget
    },

    beforeMount () {
      const state = JSON.parse(localStorage.getItem('state'))
      this.resetState(state.widgetForm.item)
    }
  }
</script>

<style scoped>

</style>
