<template>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ title }}</p>
    </header>
    <!-- <section class="modal-card-body">
      <b-table
        :data="documentDetail.maximoHistory"
        :paginated="ui.tableOpts.isPaginated"
        :per-page="ui.tableOpts.perPage"
        :pagination-simple="ui.tableOpts.isPaginationSimple"
        :default-sort-direction="ui.tableOpts.defaultSortDirection"
        :loading="ui.tableOpts.isLoading"
        default-sort="id">

        <template slot-scope="props">
          <b-table-column field="recordKey" label="Kayıt Numarası" sortable numeric>
            {{ props.row.recordKey }}
          </b-table-column>
          <b-table-column field="createDate" label="Oluşturulma Tarihi" sortable>
            {{ props.row.createDate }}
          </b-table-column>
          <b-table-column field="longDescription" label="Açıklama" sortable>
            {{ props.row.longDescription }}
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
    </section> -->
    <footer class="modal-card-foot align-end">
      <button class="button" type="button" @click="$parent.close()">Kapat</button>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  props: ['title'],
  computed: {
    ...mapState(['ui', 'documentDetail'])
  },
  beforeMount() {
    this.getMaximo(this.$router.history.current.params.id)
  },
  methods: {
    ...mapActions({
      getMaximo: 'documentDetail/getMaximo'
    })
  }
}
</script>
