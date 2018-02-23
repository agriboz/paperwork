<template>
  <section>
    <h1 class="title is-size-5">Arama Kriterleri</h1>
    <hr>
    <div class="field is-grouped is-pulled-right is-clearfix">
      <div class="control">
        <download-excel
          v-if="$store.state.search.data.length"
          class   = "button is-success"
          :data   = "$store.state.search.data"
          :fields = "this.fields"
          name    = "evraktakip.xls">
          Excel'e Aktar
        </download-excel>
      </div>
      <div class="control">
        <a @click.prevent="makeSearch" class="button is-info">Arama Yap</a>
      </div>
    </div>
    <div class="is-clearfix"></div>
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
        <div class="form-wrapper" title="Personel Detay Bilgileri">
          <incident-information :item="widgetForm.item" />
        </div>
      </div>
    </div>
    <div class="field is-grouped is-pulled-right is-clearfix">
      <div class="control">
        <download-excel
          v-if="$store.state.search.data.length"
          class   = "button is-success"
          :data   = "$store.state.search.data"
          :fields = "this.fields"
          name    = "evraktakip.xls">
          Excel'e Aktar
        </download-excel>
      </div>
      <div class="control">
        <a @click.prevent="makeSearch" class="button is-info">Arama Yap</a>
      </div>
    </div>
    <div class="is-clearfix"></div>
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
  data: function () {
    return {
      fields: {
        'ID': 'id',
        'Adı Soyadı': 'name',
        'Organizasyon': 'organization.name',
        'Lokasyon': 'workLocation.name',
        'Başlangıç Tarihi': 'startWorkDate'
      }
    }
  },

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
  mounted () {
    this.makeSearch().then(() => {
      const searchWrapper = document.getElementById('document-search-result')
      searchWrapper.scrollIntoView({
        behavior: 'smooth'
      })

    })
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

