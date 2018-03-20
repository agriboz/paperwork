<template>
  <div class="columns">
    <div class="column">
      <b-field label="Durum">
        <b-select v-model="item.ebaStatus" placeholder="Seçiniz...">
          <option v-for="e in shared.ebaStatus" :key="e.id" :value="e">
            {{ e.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Talep Numarası">
        <b-input v-model="item.requestIncidentNo" placeholder="Talep Numarası"/>
      </b-field>
      <b-field label="Hazırlık E-Postası Talep Numarası">
        <b-input v-model="item.requestEmailIncidentNo" placeholder="Hazırlık E-Postası Talep Numarası"/>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  props: ['item'],
  computed: {
    ...mapState(['shared', 'widgetForm'])
  },
  beforeMount() {
    this.getEbaStatus().then(() => {
      this.item.ebaStatus = this.shared.ebaStatus[0]
    })
  },
  methods: {
    ...mapActions({
      getEbaStatus: 'shared/getEbaStatus'
    })
  }
}
</script>
