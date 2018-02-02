<template>
  <div>
    <b-field label="Sicil Numarası" v-if="identityNumber && edit">
        <b-input v-model="item.enrollment.registery" name="registery" disabled></b-input>
    </b-field>
    <b-field label="Ad" :type="$v.item.enrollment.firstname.$error ? 'is-danger' : ''"
                        :message="$v.item.enrollment.firstname.$error ? 'Zorunlu alan': ''">
        <b-input v-model="item.enrollment.firstname" name="firstName" @input="$v.item.enrollment.firstname.$touch()" @blur="setItem"></b-input>
    </b-field>
    <b-field label="Soyad">
        <b-input v-model="item.enrollment.lastname" name="lastName" @input="$v.item.enrollment.lastname.$touch()" @blur="setItem"></b-input>
    </b-field>
    <b-field label="Pozisyon" v-if="position">
        <b-input v-model="item.enrollment.position" @blur="setItem"></b-input>
    </b-field>
    <b-field label="E-Posta" v-if="!search">
        <b-input type="email"
                 @blur="setItem"
                 v-model="item.enrollment.email"
                 value="john@"
                 maxlength="30">
        </b-input>
    </b-field>
    <b-field label="Cep Telefonu" v-if="!search">
      <b-input v-model="item.enrollment.gsmTel" @blur="setItem"></b-input>
    </b-field>

    <b-field label="Kimlik Numarası">
        <b-input type="text" maxlength="11" name="identity" v-model="item.enrollment.identityNumber" @input="$v.item.enrollment.identityNumber.$touch()" @blur="setItem"></b-input>
    </b-field>
    <b-field label="İletişim Yolu" v-if="!search">
        <b-select placeholder="Seçiniz..." v-model="item.enrollment.contactType" @input="setItem">
            <option :key="c.id" :value="c" v-for="c in shared.channels">
                {{c.name}}
            </option>
        </b-select>
    </b-field>
    <b-field label="Personele Gönderilecek Hoşgeldin Linki" v-if="!search">
        <b-input v-model="item.enrollment.welcomeUri" placeholder="URL" type="url" @blur="setItem"></b-input>
    </b-field>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
  props: ['search', 'position', 'identityNumber', 'edit', 'item'],
  computed: {
    ...mapState(['shared']),
  },
  validations: {
    item: {
      enrollment: {
        firstname: {
          required,
          minLength: minLength(3)
        },
        lastname: {
          required,
          minLength: minLength(3)
        },
        identityNumber: {
          required,
          maxLength: maxLength(11)
        }
      }
    }
  },
  methods: {
    ...mapActions({
      getChannels: 'shared/getChannels'
    }),
    setItem () {
      this.$store.commit('widgetForm/isFormDraft', this.$v.item.$invalid)
      this.$store.commit('widgetForm/item', this.item)
    }
  },
  mounted () {
    this.getChannels()
  }

}
</script>

