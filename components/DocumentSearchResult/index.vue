<template>
  <div class="form-wrapper" title="Arama Sonuç" id="document-search-result">
    <b-table
      :data="search.data"
      :paginated="ui.tableOpts.isPaginated"
      :per-page="ui.tableOpts.perPage"
      :pagination-simple="ui.tableOpts.isPaginationSimple"
      :default-sort-direction="ui.tableOpts.defaultSortDirection"
      default-sort="id">

      <template slot-scope="props">
          <b-table-column field="id" label="ID" sortable numeric>
              {{ props.row.id }}
          </b-table-column>
          <b-table-column field="name" label="Adı Soyadı" sortable>
              {{ props.row.name }}
          </b-table-column>
          <b-table-column field="organization" label="Organizasyon" sortable>
              {{ props.row.organization.name}}
          </b-table-column>
          <b-table-column field="workLocation" label="Lokasyon" sortable>
              {{ props.row.workLocation.name}}
          </b-table-column>
          <b-table-column field="startWorkDate" label="Başlangıç Tarihi" sortable>
              {{ props.row.startWorkDate !== null ? new Date(props.row.startWorkDate).toLocaleDateString('tr-TR') : '-'}}
          </b-table-column>
          <b-table-column field="entryUser.name" label="İşlemi Yapan Personel" sortable>
              {{ props.row.entryUser.name}}
          </b-table-column>
          <b-table-column label="Aksiyon" sortable>
              <nuxt-link class="button is-primary" :to="'white-collar/edit/' + props.row.id"> Detay</nuxt-link>
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

import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState(['ui', 'search'])
    }
  }
</script>

