<template>
  <section class="section">
    <h1 class="title is-size-4">Arama Kriterleri</h1>
    <hr>
    <div class="columns">
      <div class="column">
        <div class="form-wrapper" title="Personel Bilgileri">
          <employee-information :item="widgetForm.item" :search="true" :position="true" />
        </div>
      </div>
      <div class="column">

        <div class="form-wrapper" title="Organizasyon Bilgileri">
          <organization-detail :item="widgetForm.item" :search="true" />
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="form-wrapper" title="Personel Detay Bilgileri">
          <employee-information-detail :item="widgetForm.item" :search="true" />
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="form-wrapper" title="Personel Detay Bilgileri">
          <incident-information />
        </div>
      </div>
    </div>
    <div class="buttons has-addons is-right">
      <a @click.prevent="makeSearch" class="button is-info">Arama Yap</a>
    </div>

     <document-search-result v-if="$store.state.search.data.length" />
  </section>

</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import EmployeeInformation from '@/components/PaperWorkWidget/EmployeeInformation'
import EmployeeInformationDetail from '@/components/PaperWorkWidget/EmployeeInformationDetail'
import OrganizationDetail from '@/components/PaperWorkWidget/OrganizationDetail'
import IncidentInformation from '@/components/IncidentInformation'
import DocumentSearchResult from '@/components/DocumentSearchResult'


export default {

  computed: {
    ...mapState(['widgetForm'])
  },
  methods: {
    ...mapMutations({ resetState: 'widgetForm/item'}),
    ...mapActions({ makeSearch: 'search/makeSearch'})
  },
  beforeMount () {
    const state = JSON.parse(localStorage.getItem('state'))
    this.resetState(state.widgetForm.item)
  },
  components: {
    EmployeeInformation,
    EmployeeInformationDetail,
    OrganizationDetail,
    IncidentInformation,
    DocumentSearchResult
  }
}
</script>

