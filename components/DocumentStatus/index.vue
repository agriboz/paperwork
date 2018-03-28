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
      <div v-if="edit" class="column">
        <a class="button is-info is-outlined" @click="isCardModalActive = true">
          <b-icon icon="email" />
          <span>İletişim Geçmişi</span>
        </a>
        <br>
        <br>
        <a v-if="item.flowId" class="button is-success is-outlined" @click="isSendingInfoModalActive = true">
          <b-icon icon="clipboard-outline" />
          <span>Durum Geçmişi</span>
        </a>
      </div>

      <b-modal :active.sync="isCardModalActive">
        <Document-history />
      </b-modal>
      <b-modal :active.sync="isSendingInfoModalActive">
        <Sending-info />
      </b-modal>
    </div>
  </div>
</template>

<script>
import DocumentHistory from '~/components/DocumentHistory'
import SendingInfo from '~/components/SendingInfo'

export default {
  components: {
    DocumentHistory,
    SendingInfo
  },
  props: ['item', 'edit'],
  data: () => ({
    isCardModalActive: false,
    isSendingInfoModalActive: false
  })
}
</script>
