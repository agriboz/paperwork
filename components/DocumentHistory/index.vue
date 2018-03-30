<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">İletişim Geçmişi</p>
    </header>
    <section class="modal-card-body">
      <b-table
        :data="documentHistory.data"
        :paginated="ui.tableOpts.isPaginated"
        :per-page="ui.tableOpts.perPage"
        :pagination-simple="ui.tableOpts.isPaginationSimple"
        :default-sort-direction="ui.tableOpts.defaultSortDirection"
        :loading="ui.tableOpts.isLoading">

        <template slot-scope="props">
          <b-table-column field="id" label="ID" sortable numeric>
            {{ props.row.id }}
          </b-table-column>
          <b-table-column field="subject" label="Başlık" sortable>
            {{ props.row.subject }}
          </b-table-column>
          <b-table-column field="email" label="E-posta" sortable>
            {{ props.row.email }}
          </b-table-column>
          <b-table-column field="gsmTel" label="Cep Telefonu" sortable>
            {{ props.row.gsmTel }}
          </b-table-column>
          <b-table-column field="insertDate" label="Talep Tarihi" sortable>
            {{ props.row.insertDate !== null ? new Date(props.row.insertDate).toLocaleDateString('tr-TR') : '-' }}
          </b-table-column>
          <b-table-column field="contactType" label="İletişim Tipi" sortable>
            {{ props.row.contactType.name }}
          </b-table-column>
          <b-table-column field="sendingDocumentTemplate" label="Açıklama" sortable>
            {{ props.row.sendingDocumentTemplate.name }}
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
    </section>
    <!--<footer class="modal-card-foot align-end">
      <button class="button" type="button" @click="$parent.close()">Kapat</button>
    </footer>-->
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['ui', 'documentHistory'])
  },
  mounted() {
    this.getDocumentHistory()
  },
  methods: {
    ...mapActions({
      getDocumentHistory: 'documentHistory/getDocumentHistory'
    })
  }
}
</script>
