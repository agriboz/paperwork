<template>
  <div class="columns">
    <div class="column">
      <b-field label="Durum">
        {{shared.ebaStatus[0]}}
          <b-select placeholder="Seçiniz..." v-model="item.ebaStatus">
              <option :key="e.id" :value="e" v-for="e in shared.ebaStatus">
                  {{e.name}}
              </option>
          </b-select>
      </b-field>
      <b-field label="Talep Numarası">
        <b-input v-model="item.requestIncidentNo" placeholder="Talep Numarası"></b-input>
      </b-field>
      <b-field label="Hazırlık E-Postası Talep Numarası">
        <b-input v-model="item.requestEmailIncidentNo" placeholder="Hazırlık E-Postası Talep Numarası"></b-input>
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
  methods: {
    ...mapActions({
      getEbaStatus : 'shared/getEbaStatus'
    })
  },
  beforeMount () {
    this.getEbaStatus()
  },

  created () {
    this.item.ebaStatus = this.shared.ebaStatus[0]
  }

}
</script>

