<template>
  <section>
    <b-tabs v-model="activeTab" @change="tabChanged">
      <b-tab-item label="Personel Bilgileri" icon="account-box">
        <employee-information
          :item="item"
          :edit="edit"
          :search="search"
          :identity-number="true"/>
      </b-tab-item>
      <b-tab-item label="Personel Detay Bilgileri" icon="account-card-details">
        <employee-information-detail :item="item" :edit="edit" :search="search" />
      </b-tab-item>
      <b-tab-item label="Organizasyon Bilgileri" icon="lan">
        <organization-detail :item="item" :edit="edit" :search="search" />
      </b-tab-item>

      <b-tab-item :disabled="!disableDocumentList" label="Evrak Listesi" icon="file-document">
        <document-detail :item="item" :edit="edit" :search="search" />
      </b-tab-item>
    </b-tabs>
    <div class="field is-grouped">

      <p v-if="!widgetForm.editItem.flowId" class="control">
        <button :disabled="canStartEmployment"
                class="button is-primary"
                @click="startEmployment(item)">Personel Girişini Başlat</button>
      </p>
      <p v-if="edit && widgetForm.editItem.flowId && !documentDetail.mandatoryDocuments" class="control">
        <button class="button is-warning"
                @click="startBPProcess">BP Bilgilendirme Gönder</button>
      </p>
      <p v-if="widgetForm.editItem.flowId" class="control">
        <button class="button is-success"
                @click="sendToDocumentationTeam(item)">Dökümantasyon Ekibine Gönder</button>
      </p>
      <p v-if="!widgetForm.editItem.flowId" class="control">
        <button :disabled="!isDraft"
                class="button is-info"
                @click="saveAsDraft">Taslak Olarak Kaydet</button>
      </p>

      <p v-if="edit && canCancel" class="control">
        <button class="button" @click="cancelDocument">Süreci İptal Et</button>
      </p>

      <p v-if="edit && canDelete" class="control" >
        <button class="button is-danger"
                @click="deleteDocument">Sil</button>
      </p>
    </div>
    <b-modal :active.sync="isDocumentationModal.open">
      <documentation-team :item="isDocumentationModal.data"/>
    </b-modal>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import EmployeeInformation from './EmployeeInformation'
import EmployeeInformationDetail from './EmployeeInformationDetail'
import OrganizationDetail from './OrganizationDetail'
import DocumentDetail from './DocumentDetail'
import DocumentationTeam from '../DocumentationTeam'

export default {
  components: {
    EmployeeInformation,
    EmployeeInformationDetail,
    OrganizationDetail,
    DocumentDetail,
    DocumentationTeam
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: null
    }
  },
  // props: ['edit', 'search', 'item'],
  data() {
    return {
      activeTab: 0,
      isDocumentationModal: {
        open: false,
        data: this.item
      }
    }
  },

  computed: {
    ...mapState(['widgetForm', 'documentDetail']),

    disableDocumentList() {
      if (this.edit) {
        return true
      } else {
        return !!this.widgetForm.item.enrollment.organization
      }
    },

    canCancel() {
      return this.widgetForm.editItem.flowId
    },

    canDelete() {
      return this.widgetForm.editItem.flowId === 0
    },

    canStartEmployment() {
      return (
        this.widgetForm.isFirstTabInValid ||
        this.widgetForm.isSecondTabInValid ||
        this.widgetForm.isThirdTabInValid
      )
    },

    isDraft() {
      if (this.edit) {
        const isDraftEdit =
          !!this.widgetForm.editItem.enrollment.firstname &&
          !!this.widgetForm.editItem.enrollment.lastname &&
          !!this.widgetForm.editItem.enrollment.identityNumber

        return isDraftEdit
      }
      const isDraftNew =
        !!this.widgetForm.item.enrollment.firstname &&
        !!this.widgetForm.item.enrollment.lastname &&
        !!this.widgetForm.item.enrollment.identityNumber

      return isDraftNew
    }
  },

  methods: {
    ...mapActions({
      startEmployment: 'widgetForm/startEmployment',
      startBPProcess: 'widgetForm/startBPProcess',
      deleteDocument: 'widgetForm/deleteDocument',
      cancelDocument: 'widgetForm/cancelDocument'
    }),

    sendToDocumentationTeam() {
      this.documentDetail.mandatoryDocuments
        ? this.$store.dispatch('widgetForm/sendToDocumentationTeam', this.item)
        : (this.isDocumentationModal.open = true)
    },

    deleteDocument() {
      this.$store.dispatch('widgetForm/deleteDocument')
    },

    saveAsDraft() {
      return this.edit
        ? this.$store.dispatch('widgetForm/updateAsDraft')
        : this.$store.dispatch('widgetForm/saveAsDraft')
    },

    tabChanged() {
      const { id } = this.edit ? this.widgetForm.editItem : this.widgetForm.item
      const {
        organization,
        category,
        isExistsPersonalPrivateHealthInsurance,
        isHealthInsuranceIncludeFamily,
        isDisabled,
        isRetired,
        isFormerWorker,
        isOutsourceTransfer
      } = this.edit
        ? this.widgetForm.editItem.enrollment
        : this.widgetForm.item.enrollment
      return this.activeTab === 3
        ? this.$store.dispatch('widgetForm/getDocumentDetails', {
            organization,
            category,
            isExistsPersonalPrivateHealthInsurance,
            isHealthInsuranceIncludeFamily,
            isDisabled,
            isRetired,
            documentMasterId: id,
            isFormerWorker,
            isOutsourceTransfer
          })
        : null
    }
  }
}
</script>
