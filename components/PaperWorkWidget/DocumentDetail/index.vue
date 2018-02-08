<template>
  <div>
    <div class="buttons has-addons is-right">
      <a @click.prevent="addDocument" class="button is-info">Evrak Ekle</a>
    </div>
    <div v-if="showDocument" class="form-wrapper" title="Evrak Ekle" style="margin-bottom:30px">
      <b-field label="Evrak Ara">
        <b-autocomplete
            :data="documentDetail.documentsList"
            v-model="searchStr"
            placeholder="Evrak Ara"
            icon="magnify"
            field="document.name"
            :keep-first="true"
            @input="getDocumentsList"
            @select="option => selectDocument(option)">
            <template slot="empty">Arama kriterine uygun sonuç bulunamadı.</template>
        </b-autocomplete>
      </b-field>
    </div>
    <b-table
      :data="edit ? widgetForm.editItem.documentDetails : widgetForm.item.documentDetails"
      :paginated="ui.tableOpts.isPaginated"
      :per-page="ui.tableOpts.perPage"
      :pagination-simple="ui.tableOpts.isPaginationSimple"
      :default-sort-direction="ui.tableOpts.defaultSortDirection"
      default-sort="document.id">

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
          <b-table-column field="sendRemindingEmail" label="Durum" sortable>
            <b-field>
              <b-select placeholder="Seçiniz..."
                        @change.native="changeDocumentStatus(props.row.document.id, props.row.documentStatus)"
                        v-model="props.row.documentStatus">
                <option :key="d.in" :value="d"  v-for="d in shared.documentStatus" >
                    {{d.name}}
                </option>
              </b-select>
            </b-field>
          </b-table-column>
      </template>
      <template slot="empty">
        <section class="section">
          <div class="content has-text-grey has-text-centered">
            <p>
              <b-icon
                icon="information-outline"
                size="is-large">
              </b-icon>
            </p>
            <p>Herhangi bir sonuç bulunamadı.</p>
          </div>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapState, mapActions } from 'vuex'
  export default {
    props: ['item', 'edit'],
    data: () => ({
      searchStr: '',
      selectedDocument: null,
      showDocument: false
    }),
    computed: {
      ...mapState(['ui', 'documentDetail', 'widgetForm', 'shared'])
    },

    methods: {
      selectDocument: debounce(function(option) {
        const editedCollection = this.widgetForm.editItem.documentDetails
        const newCollection = this.widgetForm.item.documentDetails
        if (option) {
          const isDocumentAlreadyAdded = collection =>
             collection.some(x => x.document.id === option.document.id ? true : false)

          if (this.edit) {
            return isDocumentAlreadyAdded(editedCollection) === false
                    ? this.$store.dispatch('widgetForm/addDocumentList', option)
                      : this.$toast.open({type: 'is-warning', message: `${option.document.name} adlı evrak evrak listesinde tanımlı`})

          } else {
            console.log('object')
            return !isDocumentAlreadyAdded(newCollection)
                    ? this.$store.dispatch('widgetForm/addNewDocumentList', option)
                      : this.$toast.open({type: 'is-warning', message:`${option.document.name} adlı evrak evrak listesinde tanımlı`})
          }
        }
      }, 500),


      getDocumentsList: debounce(function() {
        const data = {
          documentMasterId: this.edit ? this.widgetForm.editItem.id : 0,
          searchStr: this.searchStr
        }
        return data.searchStr.length >= 3
          ? this.$store.dispatch('documentDetail/getDocumentsList', data) : null
      }, 1000),

      addDocument () {
        this.showDocument = !this.showDocument
      },

      async changeDocumentStatus (id, documentStatus) {
        const data = {id, documentStatus}
        await this.$store.dispatch('documentDetail/changeDocumentStatus', data)
        await this.$store.dispatch('documentDetail/getMandatoryDocuments', id)
      }
    },
    mounted () {
      this.$store.dispatch('shared/getDocumentStatus')
    }
  }
</script>

<style scoped>

</style>
