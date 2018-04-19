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
            <b-table-column field="id" label="ID" sortable numeric>
              {{ props.row.documentMasterId }}
            </b-table-column>

            <b-table-column field="firstname" label="İşe Alınan Çalışan Ad Soyad" sortable>
              {{ props.row.firstname }} {{ props.row.lastname }}
            </b-table-column>
            <b-table-column field="requestDate" label="Talep Tarihi" sortable>
              {{ props.row.requestDate !== null ? new Date(props.row.requestDate).toLocaleDateString('tr-TR') : '-' }}
            </b-table-column>
            <b-table-column field="startDate" label="Başlangıç Tarihi" sortable>
              {{ props.row.startDate !== null ? new Date(props.row.startDate).toLocaleDateString('tr-TR') : '-' }}
            </b-table-column>

            <b-table-column field="startedPerson" label="İşe Alım Operasyon Yetkilisi" sortable>
              {{ props.row.startedPerson }}
            </b-table-column>

            <b-table-column field="statusDescription" label="Durum" sortable>
              {{ props.row.flowObject === 'pozAmir' ? 'Amir tarafından Buddy seçimi bekliyor' : props.row.flowObject === 'pozGrupIseAlim' ? 'İşe alım operasyon ekibinde bekliyor' : props.row.flowObject === 'pozGrupDokumantasyon' ? 'Dokümantasyon ekibinde bekliyor' : '-' }}
            </b-table-column>
            <b-table-column label="Aksiyon">
              <nuxt-link v-if="props.row.flowObject === 'pozAmir'" :to="'tasks/manager/' + props.row.id" class="button is-primary">Detay</nuxt-link>
              <nuxt-link v-if="props.row.flowObject === 'pozGrupIseAlim'" :to="'white-collar/edit/' + props.row.documentMasterId" class="button is-primary" @click.native="setRequestId(props.row.requestId)">Detay</nuxt-link>
              <a v-if="props.row.flowObject === 'pozGrupDokumantasyon'" :href="'http://10.10.27.36:2216/documents/edit/' + props.row.documentMasterId" class="button is-primary">Detay</a>
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
    setRequestId(requestId) {
      console.log(requestId)
      this.$store.commit('tasks/setRequestId', requestId)
    },
    ...mapActions({
      getTasks: 'tasks/getTasks'
    })
  }
}
</script>
