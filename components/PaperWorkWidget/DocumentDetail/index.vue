<template>
  <div>
    <b-table
      :data="documentDetail.data"
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
              <b-select placeholder="Seçiniz..." v-model="props.row.documentStatus">
                <option :key="d.in" :value="d" v-for="d in shared.documentStatus" >
                    {{d.name}}
                </option>
              </b-select>
            </b-field>
          </b-table-column>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
  export default {
    props: ['item'],
    computed: {
      ...mapState(['ui', 'documentDetail', 'shared'])
    },
    mounted () {
      this.$store.dispatch('shared/getDocumentStatus')
    }
  }
</script>

<style scoped>

</style>
