<template>
  <div class="form-wrapper" style="margin-bottom:20px" title="Beyaz Yaka İşe Giriş">
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
        <a class="button is-info is-outlined">
          <b-icon icon="email" />
          <span>İletişim Geçmişi</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'edit']
}
</script>

