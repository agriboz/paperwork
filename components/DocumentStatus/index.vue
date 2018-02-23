<template>
  <div class="form-wrapper" style="margin:40px 0 20px" title="Talep Durumu">
    <div class="columns">
      <div class="column">
        <strong>Talep numarası:</strong> <span class="has-text-warning"> {{item.serviceRequestNo ? item.serviceRequestNo : '-'}}</span>
      </div>
      <div class="column">
        <strong>Durum:</strong> <span v-if="edit" class="has-text-danger"> {{item.ebaStatus.name ? item.ebaStatus.name : '-' }}</span>
      </div>
      <div class="column">
        <b-field label="Hazırlık Talep Numarası">
            <b-input placeholder="Hazırlık Talep Numarası" v-model="item.serviceRequestEmailNo"
                icon="account">
            </b-input>
        </b-field>
      </div>
      <div class="column">
        <a class="button is-info is-outlined" @click="isCardModalActive = true">
          <b-icon icon="email" />
          <span>İletişim Geçmişi</span>
        </a>
      </div>
      <b-modal :active.sync="isCardModalActive" style="width:100%" :width="960">
        <document-history></document-history>
      </b-modal>
    </div>
  </div>
</template>

<script>
import DocumentHistory from '~/components/DocumentHistory'
export default {

  props: ['item', 'edit'],
  data: () => ({
    isCardModalActive: false
  }),
  components: {
    DocumentHistory
  }
}
</script>

<style>

</style>

