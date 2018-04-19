<template>
  <section>
    <h1 class="title is-size-5">Arama Kriterleri</h1>
    <hr>
    <div class="field is-grouped is-pulled-right is-clearfix">
      <div class="control">
        <download-excel
          v-if="$store.state.search.data.length"
          :data="$store.state.search.data"
          :fields="fields"
          class = "button is-success"
          name = "evraktakip.xls">
          Excel'e Aktar
        </download-excel>
      </div>

      <div class="control">
        <a class="button is-info" @click.prevent="makeSearch(widgetForm.item)">Arama Yap</a>
      </div>
    </div>
    <div class="is-clearfix"/>
    <div class="columns">
      <div class="column">
        <div class="form-wrapper" title="Personel Bilgileri">
          <employee-information :item="widgetForm.item" :search="true"/>
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
        <div class="form-wrapper" title="Talep Detay Bilgileri">
          <incident-information :item="widgetForm.item" />
        </div>
      </div>
    </div>
    <div class="field is-grouped is-pulled-right is-clearfix">
      <div class="control">
        <download-excel
          v-if="$store.state.search.data.length"
          :data="$store.state.search.data"
          :fields="fields"
          class="button is-success"
          name = "evraktakip.xls">
          Excel'e Aktar
        </download-excel>
      </div>
      <div class="control">
        <a class="button is-info" @click="makeSearch(widgetForm.item)" >Arama Yap</a>
      </div>
    </div>
    <div class="is-clearfix"/>
    <document-search-result v-if="$store.state.search.data.length" />
    <b-message v-if="!$store.state.search.data.length" type="is-info" has-icon>
      Arama kriterine uygun sonuç bulunamadı.
    </b-message>

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
  middleware: 'auth',
  components: {
    EmployeeInformation,
    EmployeeInformationDetail,
    OrganizationDetail,
    IncidentInformation,
    DocumentSearchResult
  },
  data: () => ({
    fields: {
      ID: 'id',
      'Adı Soyadı': 'name',
      Organizasyon: 'organization.name',
      Lokasyon: 'workLocation.name',
      'Başlangıç Tarihi': 'startWorkDate'
    }
  }),

  computed: {
    ...mapState(['widgetForm'])
  },

  beforeMount() {
    const state = JSON.parse(localStorage.getItem('state'))
    this.resetState(state.widgetForm.item)

    this.makeSearch(this.widgetForm.item).then(() => {
      const searchWrapper = document.getElementById('document-search-result')
      searchWrapper.scrollIntoView({
        behavior: 'smooth'
      })
    })
  },
  methods: {
    ...mapMutations({ resetState: 'widgetForm/item' }),
    ...mapActions({ makeSearch: 'search/makeSearch' })
  }
}
</script>
