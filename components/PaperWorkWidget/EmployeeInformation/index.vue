<template>
  <div>
    <b-field label="Sicil Numarası" v-if="identityNumber && edit">
        <b-input v-model="item.enrollment.registery" name="registery" disabled></b-input>
    </b-field>
    <b-field label="Ad" :type="$v.item.enrollment.firstname.$error ? 'is-danger' : ''"
                        :message="$v.item.enrollment.firstname.$error ? 'Zorunlu alan': ''">
        <b-input v-model="item.enrollment.firstname" name="firstName" @input="$v.item.enrollment.firstname.$touch()" @blur="setItem"></b-input>
    </b-field>
    <b-field label="Soyad"
             :type="$v.item.enrollment.lastname.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.lastname.$error ? 'Zorunlu alan': ''">
        <b-input v-model="item.enrollment.lastname"
                 name="lastName" @input="$v.item.enrollment.lastname.$touch()" @blur="setItem"></b-input>
    </b-field>
    <b-field label="Pozisyon"
             :type="$v.item.enrollment.position.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.position.$error ? 'Zorunlu alan': ''"
             v-if="position">
        <b-input v-model="item.enrollment.position" @input="setItem(); $v.item.enrollment.position.$touch()"></b-input>
    </b-field>
    <b-field label="E-Posta"
             :type="$v.item.enrollment.email.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.email.$error ? 'Zorunlu alan': ''"
             v-if="!search">
        <b-input type="email"
                 @input="setItem(); $v.item.enrollment.email.$touch()"
                 v-model="item.enrollment.email"
                 value="john@"
                 maxlength="30">
        </b-input>
    </b-field>
    <b-field label="Cep Telefonu"
             :type="$v.item.enrollment.gsmTel.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.gsmTel.$error ? 'Zorunlu alan': ''"
             v-if="!search">
      <b-input v-model="item.enrollment.gsmTel" @input="setItem(); $v.item.enrollment.gsmTel.$touch()"></b-input>
    </b-field>

    <b-field label="Kimlik Numarası"
             :type="$v.item.enrollment.identityNumber.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.identityNumber.$error ? 'Zorunlu alan': ''">
        <b-input type="text" maxlength="11" name="identity" v-model="item.enrollment.identityNumber" @input="$v.item.enrollment.identityNumber.$touch()" @blur="setItem"></b-input>
    </b-field>
    <b-field label="İletişim Yolu"
             :type="$v.item.enrollment.contactType.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.contactType.$error ? 'Zorunlu alan': ''"
             v-if="!search">
        <b-select placeholder="Seçiniz..." v-model="item.enrollment.contactType" @input="setItem(); $v.item.enrollment.contactType.$touch()">
            <option :key="c.id" :value="c" v-for="c in shared.channels">
                {{c.name}}
            </option>
        </b-select>
    </b-field>
    <b-field label="Personele Gönderilecek Hoşgeldin Linki"
             :type="$v.item.enrollment.welcomeUri.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.welcomeUri.$error ? 'Zorunlu alan': ''"
             v-if="!search">
        <b-input v-model="item.enrollment.welcomeUri" placeholder="URL" @input="setItem(); $v.item.enrollment.welcomeUri.$touch()"></b-input>
    </b-field>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'

export default {
  props: ['search', 'position', 'identityNumber', 'edit', 'item'],
  computed: {
    ...mapState(['shared']),
    isValid () {
      return this.$v.$invalid
    }
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
        },
        position: {
          required
        },
        email: {
          required,
          email
        },
        gsmTel: {
          required
        },
        contactType: {
          required
        },
        welcomeUri: {
          required
        }
      }
    },
    validationGroup: ['item.enrollment']

  },
  methods: {
    ...mapActions({
      getChannels: 'shared/getChannels'
    }),
    setItem () {
      if (this.edit) {
        this.$store.commit('widgetForm/editItem', this.item)
        this.$store.commit('widgetForm/canStartEmployment', this.$v.$invalid)
      } else {
        this.$store.commit('widgetForm/item', this.item)
      }
        this.$store.commit('widgetForm/isFormDraft', this.$v.item.$invalid)

    }
  },
  mounted () {
    this.getChannels()
    this.$store.commit('widgetForm/canStartEmployment', this.$v.$invalid)
  }

}
</script>

