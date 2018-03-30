<template>
  <div>
    <div v-if="!notEditable && !widgetForm.editItem.flowId" class="buttons has-addons is-right">
      <a class="button is-info" @click.prevent="addDocument">Evrak Ekle</a>
    </div>
    <div v-if="showDocument" class="form-wrapper" title="Evrak Ekle" style="margin-bottom:30px">
      <b-field label="Evrak Ara">
        <b-autocomplete
          v-model="searchStr"
          :data="documentDetail.documentsList"
          :keep-first="true"
          placeholder="Evrak Ara"
          icon="magnify"
          field="document.name"
          @input="getDocumentsList"
          @select="option => selectDocument(option)">
          <template slot="empty">Arama kriterine uygun sonuç bulunamadı.</template>
        </b-autocomplete>
      </b-field>
    </div>
    <!-- edit ? widgetForm.editItem.documentDetails : widgetForm.item.documentDetails" -->
    <b-table
      :data="edit && !widgetForm.editItem.documentDetails.length ? widgetForm.item.documentDetails : widgetForm.item.documentDetails"
      :paginated="ui.tableOpts.isPaginated"
      :per-page="ui.tableOpts.perPage"
      :pagination-simple="ui.tableOpts.isPaginationSimple"
      :default-sort-direction="ui.tableOpts.defaultSortDirection">

      <template slot-scope="props">
        <b-table-column field="document.id" label="Evrak Adı" sortable numeric>
          {{ props.row.document.name }}
        </b-table-column>
        <b-table-column field="documentType.id" label="Evrak Tipi" sortable>
          {{ props.row.documentType.name }}
        </b-table-column>
        <b-table-column field="sendRemindingEmail" label="Hatırlatma E-Postası Gönderilsin mi?" sortable>
          {{ props.row.sendRemindingEmail ? 'Evet' : 'Hayır' }}
        </b-table-column>
        <b-table-column field="documentStatus" label="Evrak Teslim Alındı mı?">
          <b-switch v-model="props.row.documentStatusBool">
            {{ props.row.documentStatusBool ? 'Evet' : 'Hayır' }}
          </b-switch>

          <!-- <b-field>
            <b-select v-model="props.row.documentStatus"
                      :selected="props.row.documentStatus = shared.documentStatus[0]"
                      placeholder="Seçiniz...">

              <option v-for="d in shared.documentStatus" :key="d.id" :value="d">
                {{ d.name }}
              </option>
            </b-select>
            :disabled="notEditable || !edit"
            @change.native="changeDocumentStatus(props.row.document.id, props.row.documentStatus)
          </b-field> -->
        </b-table-column>
        <b-table-column v-if="!widgetForm.editItem.flowId" label="Aksiyon">
          <button class="button is-danger" @click="removeDocument(props.row, edit)">Evrak Sil</button>
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="information-outline"
                size="is-large"/>
            </p>
            <p>Herhangi bir sonuç bulunamadı.</p>
          </div>
        </section>
      </template>
    </b-table>
    <!-- <b-message v-if="!widgetForm.isFirstTabInValid || widgetForm.isSecondTabInValid || widgetForm.isThirdTabInValid" type="is-warning">
      Personel giriş işlemini başlatmak için lütfen zorunlu alanları doldurunuz.
    </b-message> -->

    <div class="field is-grouped">
      <p v-if="!widgetForm.editItem.flowId" class="control">
        <button type="submit"
                class="button is-primary"
                @click="startEmployment(item)">Personel Girişini Başlat</button>
      </p>
      <p v-if="!widgetForm.editItem.flowId" class="control">
        <button :disabled="!isDraft"
                class="button is-info"
                @click="saveAsDraft">Taslak Olarak Kaydet</button>
      </p>
    </div>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapState } from 'vuex'
export default {
  props: ['item', 'edit', 'notEditable'],
  data: () => ({
    searchStr: '',
    selectedDocument: null,
    showDocument: false
  }),
  computed: {
    ...mapState(['ui', 'documentDetail', 'widgetForm', 'shared']),
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
  beforeMount() {
    this.$store.dispatch('shared/getDocumentStatus')
  },
  methods: {
    startEmployment(payload) {
      if (
        !this.widgetForm.isFirstTabInValid &&
        !this.widgetForm.isSecondTabInValid &&
        !this.widgetForm.isThirdTabInValid
      ) {
        this.$store.dispatch('widgetForm/startEmployment', payload)
      }
    },
    saveAsDraft() {
      let payload
      if (this.widgetForm.editItem.documentDetails.length) {
        payload = this.widgetForm.editItem.documentDetails
      }
      if (this.widgetForm.item.documentDetails.length) {
        payload = this.widgetForm.item.documentDetails
      }
      return this.edit
        ? this.$store.dispatch('widgetForm/updateAsDraft', payload)
        : this.$store.dispatch(
            'widgetForm/saveAsDraft',
            this.widgetForm.item.documentDetails
          )
    },
    selectDocument: debounce(function(option) {
      const editedCollection = this.widgetForm.editItem.documentDetails
      const newCollection = this.widgetForm.item.documentDetails
      if (option) {
        const isDocumentAlreadyAdded = collection =>
          collection.some(
            x => (x.document.id === option.document.id ? true : false)
          )

        if (this.edit) {
          return isDocumentAlreadyAdded(editedCollection) === false
            ? this.$store.dispatch('widgetForm/addDocumentList', option)
            : this.$toast.open({
                type: 'is-warning',
                message: `${
                  option.document.name
                } adlı evrak evrak listesinde tanımlı`
              })
        } else {
          return !isDocumentAlreadyAdded(newCollection)
            ? this.$store.dispatch('widgetForm/addNewDocumentList', option)
            : this.$toast.open({
                type: 'is-warning',
                message: `${
                  option.document.name
                } adlı evrak evrak listesinde tanımlı`
              })
        }
      }
    }, 500),

    getDocumentsList: debounce(function() {
      const data = {
        documentMasterId: this.edit ? this.widgetForm.editItem.id : 0,
        searchStr: this.searchStr
      }
      return data.searchStr.length >= 3
        ? this.$store.dispatch('documentDetail/getDocumentsList', data)
        : null
    }, 1000),

    addDocument() {
      this.showDocument = !this.showDocument
    },

    removeDocument(item, edit) {
      const payload = { item, edit }
      this.$store.commit('widgetForm/setNewDocumentList', payload)
    },

    async changeDocumentStatus(id, documentStatus) {
      const data = { id, documentStatus }
      await this.$store.dispatch('documentDetail/changeDocumentStatus', data)
      await this.$store.dispatch('documentDetail/getMandatoryDocuments', id)
    }
  }
}
</script>
<style>
.has-text-right,
.b-table .table th .th-wrap.is-numeric {
  text-align: left !important;
  flex-direction: unset;
}
</style>
