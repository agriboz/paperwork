<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Durum Geçmişi</p>
    </header>
    <section class="modal-card-body">
      <b-table
        :data="documentHistory.sendingInfo"
        :paginated="ui.tableOpts.isPaginated"
        :per-page="ui.tableOpts.perPage"
        :pagination-simple="ui.tableOpts.isPaginationSimple"
        :default-sort-direction="ui.tableOpts.defaultSortDirection"
        :loading="ui.tableOpts.isLoading"
        default-sort="id">

        <template slot-scope="props">
          <b-table-column field="id" label="ID" sortable numeric>
            {{ props.row.id }}
          </b-table-column>
          <b-table-column field="person" label="Kişi" sortable>
            {{ props.row.person }}
          </b-table-column>

          <b-table-column field="requestDate" label="Talep Tarihi" sortable>
            {{ props.row.requestDate !== null ? new Date(props.row.requestDate).toLocaleDateString('tr-TR') : '-' }}
          </b-table-column>
          <b-table-column field="responseDate" label="responseDate" sortable>
            {{ props.row.responseDate !== null ? new Date(props.row.responseDate).toLocaleDateString('tr-TR') : '-' }}
          </b-table-column>
          <b-table-column field="statusDescription" label="Açıklama" sortable>
            {{ props.row.statusDescription }}
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
    <footer class="modal-card-foot align-end">
      <button class="button" type="button" @click="$parent.close()">Kapat</button>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['ui', 'documentHistory'])
  },
  beforeMount() {
    this.getSendingInfo(this.$router.history.current.params.id)
  },
  methods: {
    ...mapActions({
      getSendingInfo: 'documentHistory/getSendingInfo'
    })
  }
}
</script>
