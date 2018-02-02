<template>
  <div class="columns">
    <div class="column">
      <b-field label="Durum">
          <b-select placeholder="Seçiniz..." v-model="item.ebaStatus" @blur="setItem">
              <option>
                  Sms
              </option>
          </b-select>
      </b-field>
      <b-field label="Talep Numarası">
        <b-input v-model="item.requestIncidentNo" placeholder="Talep Numarası" @blur="setItem"></b-input>
      </b-field>
      <b-field label="Hazırlık E-Postası Talep Numarası">
        <b-input v-model="item.requestEmailIncidentNo" placeholder="Hazırlık E-Postası Talep Numarası" @blur="setItem"></b-input>
      </b-field>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      item: {}
    }
  },

  validations: {
    item: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  methods: {
    setItem () {
      console.log(this.item)
      this.$store.commit('whiteCollar/item', this.item)
    }
  }

}
</script>

