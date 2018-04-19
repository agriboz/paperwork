<template>
  <section>

    <b-tabs v-model="activeTab" @change="tabChanged" @input="checkIfDocumentAlreadyAdded">
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

      <b-tab-item label="Evrak Listesi" icon="file-document">
        <document-detail :item="item" :edit="edit" :search="search" />
      </b-tab-item>
    </b-tabs>
    <div class="field is-grouped">
      <p v-if="edit && widgetForm.editItem.flowId && !documentDetail.mandatoryDocuments && !item.documentationFlowStartDate" class="control">
        <button class="button is-warning"
                @click="startBPProcess">BP Bilgilendirme Gönder</button>
      </p>
      <p v-if="widgetForm.editItem.flowId && !item.documentationFlowStartDate" class="control">
        <button class="button is-success"
                @click="sendToDocumentationTeam(item)">Dökümantasyon Ekibine Gönder</button>
      </p>
      <p v-if="edit && canCancel && item.ebaStatus.id <= 3" class="control">
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

    <b-modal :active.sync="isComponentModalActive" has-modal-card>
      <document-already-defined />
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
import DocumentAlreadyDefined from '../DocumentAlreadyDefined'

export default {
  components: {
    EmployeeInformation,
    EmployeeInformationDetail,
    OrganizationDetail,
    DocumentDetail,
    DocumentationTeam,
    DocumentAlreadyDefined
  },
  props: ['edit', 'search', 'item'],
  data() {
    return {
      activeTab: 0,
      isComponentModalActive: false,
      isDocumentationModal: {
        open: false,
        data: this.item
      }
    }
  },

  computed: {
    ...mapState(['widgetForm', 'documentDetail']),

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
    }
  },
  methods: {
    ...mapActions({
      startBPProcess: 'widgetForm/startBPProcess',
      deleteDocument: 'widgetForm/deleteDocument',
      cancelDocument: 'widgetForm/cancelDocument'
    }),

    /* updateEmployment(payload) {
      this.$store.dispatch('widgetForm/updateEmployment', payload)
    }, */

    sendToDocumentationTeam() {
      this.documentDetail.mandatoryDocuments
        ? this.$store.dispatch('widgetForm/sendToDocumentationTeam', this.item)
        : (this.isDocumentationModal.open = true)
    },

    deleteDocument() {
      this.$store.dispatch('widgetForm/deleteDocument')
    },

    /* saveAsDraft() {
      return this.edit
        ? this.$store.dispatch('widgetForm/updateAsDraft')
        : this.$store.dispatch('widgetForm/saveAsDraft')
    }, */

    checkIfDocumentAlreadyAdded() {
      const documentDetails = this.widgetForm.item.documentDetails
      const documentDetailsEdit = this.widgetForm.editItem.documentDetails
      const selectedDocument = this.documentDetail.documentsList[0]
      if (selectedDocument) {
        var checkIfDocumentExist = documentDetails.find(
          item => item.document.name === selectedDocument.document.name
        )
      }

      if (selectedDocument) {
        var checkIfDocumentExistEdit = documentDetailsEdit.find(
          item => item.document.name === selectedDocument.document.name
        )
      }

      if (this.activeTab === 2 && checkIfDocumentExist) {
        this.isComponentModalActive = true
      }

      if (this.activeTab === 2 && checkIfDocumentExistEdit) {
        this.isComponentModalActive = true
      }
    },

    tabChanged() {
      const { id } = this.edit ? this.widgetForm.editItem : this.widgetForm.item
      const {
        organization,
        organizationDocumentCategory,
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
            category:
              this.edit && organizationDocumentCategory.id === null
                ? null
                : organizationDocumentCategory,
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
