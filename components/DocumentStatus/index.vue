<template>
  <div class="form-wrapper" style="margin:40px 0 20px" title="Talep Durumu">
    <div class="columns">
      <div class="column">
        <strong>Talep numarası:</strong> <span class="has-text-warning"> {{ item.serviceRequestNo ? item.serviceRequestNo : '-' }}</span>
      </div>
      <div class="column" @click="isCardModalActive = true">
        <strong>Durum:</strong> <span v-if="edit" class="has-text-danger"> {{ item.ebaStatus.name ? item.ebaStatus.name : '-' }}</span>
      </div>
      <div class="column">
        <b-field label="Hazırlık Talep Numarası">
          <b-input v-model="item.serviceRequestEmailNo" placeholder="Hazırlık Talep Numarası"
                   icon="account"/>
        </b-field>
      </div>
      <div class="column">
        <a class="button is-info is-outlined">
          <b-icon icon="email" />
          <span>İletişim Geçmişi</span>
        </a>
      </div>
      <b-modal :active.sync="isCardModalActive">
        <Document-history />
      </b-modal>
    </div>
  </div>
</template>

<script>
import DocumentHistory from '~/components/DocumentHistory'
export default {
  components: {
    DocumentHistory
  },
  props: ['item', 'edit'],
  data: () => ({
    isCardModalActive: false
  })
}
</script>
