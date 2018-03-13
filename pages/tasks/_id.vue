<template>
  <section>
    <h1 class="title is-size-4">Görevlerim</h1>
    <h2 class="subtitle">Beyaz Yaka İşe Giriş</h2>
    <hr>
    <b-tabs expanded>
      <b-tab-item label="Personel Bilgileri" icon="account-box">
        <employee-information
          :item="tasks.item"
          :not-editable="true" />
      </b-tab-item>
      <b-tab-item label="Personel Detay Bilgileri" icon="account-card-details">
        <employee-information-detail :item="tasks.item" :not-editable="true" />
      </b-tab-item>
      <b-tab-item label="Organizasyon Bilgileri" icon="lan">
        <organization-detail :item="tasks.item" :not-editable="true" />
      </b-tab-item>

      <b-tab-item label="Evrak Listesi" icon="file-document">
        <document-detail :item="tasks.item" :not-editable="true" />
      </b-tab-item>
    </b-tabs>

    <div class="field is-grouped is-pulled-right is-clearfix">
      <div class="control">
        <a class="button is-success" @click="isTaskApproved('approve')">Onayla</a>
      </div>
      <div class="control">
        <a class="button is-danger" @click="isTaskApproved('reject')">Reddet</a>
      </div>
    </div>


  </section>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import EmployeeInformation from '@/components/PaperWorkWidget/EmployeeInformation'
import EmployeeInformationDetail from '@/components/PaperWorkWidget/EmployeeInformationDetail'
import OrganizationDetail from '@/components/PaperWorkWidget/OrganizationDetail'
import DocumentDetail from '../../components/PaperWorkWidget/DocumentDetail'

export default {
  components: {
    EmployeeInformation,
    EmployeeInformationDetail,
    OrganizationDetail,
    DocumentDetail
  },
  async fetch({ store, params }) {
    await store.dispatch('tasks/getTaskById', params.id)
  },
  computed: {
    ...mapState(['tasks'])
  },
  methods: {
    ...mapActions({
      isTaskApproved: 'tasks/isTaskApproved'
    })
  }
}
</script>
