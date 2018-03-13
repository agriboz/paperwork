<template>
  <section>
    <h1 class="title is-size-5">Görevlerim</h1>
    <hr>
    <b-tabs>
      <b-tab-item label="İşe Giriş" icon="account-box">
        <b-table
          :data="tasks.data"
          :paginated="ui.tableOpts.isPaginated"
          :per-page="ui.tableOpts.perPage"
          :pagination-simple="ui.tableOpts.isPaginationSimple"
          :default-sort-direction="ui.tableOpts.defaultSortDirection"
          :loading="ui.tableOpts.isLoading"
          default-sort="id">

          <template slot-scope="props">
            <b-table-column field="id" label="Akış" sortable numeric>
              {{ props.row.id }}
            </b-table-column>
            <b-table-column field="startedPerson" label="Kişi" sortable>
              {{ props.row.startedPerson }}
            </b-table-column>

            <b-table-column field="requestStatusId" label="Durum" sortable>
              {{ props.row.requestStatusId }}
            </b-table-column>
            <b-table-column field="requestDate" label="Talep Tarihi" sortable>
              {{ props.row.requestDate !== null ? new Date(props.row.requestDate).toLocaleDateString('tr-TR') : '-' }}
            </b-table-column>
            <b-table-column field="startDate" label="Başlangıç Tarihi" sortable>
              {{ props.row.startDate !== null ? new Date(props.row.startDate).toLocaleDateString('tr-TR') : '-' }}
            </b-table-column>
            <b-table-column field="statusDescription" label="Açıklama" sortable>
              {{ props.row.statusDescription }}
            </b-table-column>
            <b-table-column label="Aksiyon">
              <!-- <nuxt-link class="button is-primary" :to="'tasks/' + props.row.id">Detay</nuxt-link> -->
              <nuxt-link :to="'tasks/manager/' + props.row.id" class="button is-primary">Detay</nuxt-link>
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
      </b-tab-item>
    </b-tabs>


  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('tasks/getTasks')
  },
  computed: {
    ...mapState(['ui', 'tasks'])
  },
  methods: {
    ...mapActions({
      getTasks: 'tasks/getTasks'
    })
  }
}
</script>
