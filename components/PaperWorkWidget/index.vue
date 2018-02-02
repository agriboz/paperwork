<template>
  <section>
      <b-tabs v-model="activeTab" @change="tabChanged">
        <b-tab-item label="Personel Bilgileri" icon="account-box">
          <employee-information :item="item" :edit="edit" :search="search" :identity-number="true" :position="false" />
        </b-tab-item>
        <b-tab-item label="Personel Detay Bilgileri" icon="account-card-details">
          <employee-information-detail :item="item" :edit="edit" :search="search" />
        </b-tab-item>
        <b-tab-item label="Organizasyon Bilgileri" icon="lan">
          <organization-detail :item="item" :edit="edit" :search="search" />
        </b-tab-item>
        <b-tab-item label="Evrak Listesi" icon="file-document" :disabled="!widgetForm.isCompanyChanged">
          <document-detail :item="item" :edit="edit" :search="search" />
        </b-tab-item>
      </b-tabs>
      <div class="field is-grouped">
        <p class="control">
          <button class="button is-primary" value="isEmployee" name="isEmployee" type="submit">Personel Girişini Başlat</button>
        </p>
        <p class="control">
          <button class="button is-warning" v-if="edit" value="isBP"  name="isBP" type="submit">BP Onayına Gönder</button>
        </p>
        <p class="control">
          <button class="button is-success" v-if="edit" name="isPaperwork" type="submit">Evrak Takibini Başlat</button>
        </p>
        <p class="control">
          <button class="button is-info" :disabled="!isDraft" name="isDraft">Taslak Olarak Kaydet</button>
        </p>
        <p class="control">
          <button class="button" v-if="edit" name="isCancel" type="submit">Süreci İptal Et</button>
        </p>
        <p class="control">
          <button class="button is-danger" v-if="edit" type="submit">Sil</button>
        </p>
      </div>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import EmployeeInformation from './EmployeeInformation'
import EmployeeInformationDetail from './EmployeeInformationDetail'
import OrganizationDetail from './OrganizationDetail'
import DocumentDetail from './DocumentDetail'
export default {
  props: ['edit', 'search', 'item'],
  data() {
    return {
        activeTab: 0
    }
  },
  computed: {
    isDraft () {
      if (this.edit) {
        return !!this.widgetForm.item.enrollment.firstname && !!this.widgetForm.item.enrollment.lastname && !!this.widgetForm.item.enrollment.identityNumber

      }
    },
    ...mapState(['widgetForm', 'documentDetail'])
  },

  methods: {
    tabChanged () {
      return this.activeTab === 3 ? this.$store.dispatch('documentDetail/getDocumentDetails') : null
    }
  },
  components: {
    EmployeeInformation,
    EmployeeInformationDetail,
    OrganizationDetail,
    DocumentDetail
  }
}
</script>
