<template>
  <div>

    <b-field label="Sicil Numarası" v-if="identityNumber && edit">
        <b-input v-model="item.enrollment.registery" name="registery" disabled></b-input>
    </b-field>
    <b-field label="Ad" :type="$v.item.enrollment.firstname.$error ? 'is-danger' : ''"
                        :message="$v.item.enrollment.firstname.$error ? 'Zorunlu alan': ''">
        <b-input v-model="item.enrollment.firstname"
                 :disabled="notEditable"
                 @input="$v.item.enrollment.firstname.$touch()" ></b-input>
    </b-field>
    <b-field label="Soyad"
             :type="$v.item.enrollment.lastname.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.lastname.$error ? 'Zorunlu alan': ''">
        <b-input v-model="item.enrollment.lastname"
                 :disabled="notEditable"
                 name="lastName"
                 @input="$v.item.enrollment.lastname.$touch()"></b-input>
    </b-field>

    <b-field label="E-Posta"
             :type="$v.item.enrollment.email.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.email.$error ? 'Zorunlu alan': ''"
             v-if="!search && !hideBuddyPage">
        <b-input type="email"
                :disabled="notEditable"
                 @input="$v.item.enrollment.email.$touch()"
                 v-model="item.enrollment.email"
                 maxlength="50">
        </b-input>
    </b-field>
    <b-field label="Cep Telefonu"
             :type="$v.item.enrollment.gsmTel.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.gsmTel.$error ? 'Zorunlu alan': ''"
             v-if="!search && !hideBuddyPage">
            <b-input :disabled="notEditable"
                     v-model="item.enrollment.gsmTel"
                     maxlength="10"
                     @input="$v.item.enrollment.gsmTel.$touch()">
            </b-input>
    </b-field>
    <!-- v-mask="'(999)-999-99-99'" -->


    <b-field label="Kimlik Numarası"
             v-if="!hideBuddyPage"
             :type="$v.item.enrollment.identityNumber.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.identityNumber.$error ? 'Zorunlu alan': ''">
        <b-input type="text" maxlength="11" minlength="11"
                 name="identity"
                 :disabled="notEditable"
                 v-model="item.enrollment.identityNumber"
                 @input="$v.item.enrollment.identityNumber.$touch()"></b-input>
    </b-field>
    <b-field label="İletişim Yolu"
             :type="$v.item.enrollment.contactType.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.contactType.$error ? 'Zorunlu alan': ''"
             v-if="!search && !hideBuddyPage">
        <b-select placeholder="Seçiniz..."
                  v-model="item.enrollment.contactType"
                  :disabled="notEditable"
                  @input="$v.item.enrollment.contactType.$touch()">
            <option :key="c.id" :value="c" v-for="c in shared.channels">
                {{c.name}}
            </option>
        </b-select>
    </b-field>
    <b-field label="Personele Gönderilecek Hoşgeldin Linki"
             :type="$v.item.enrollment.welcomeUri.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.welcomeUri.$error ? 'Zorunlu alan': ''"
             v-if="!search && !hideBuddyPage">
        <b-input v-model="item.enrollment.welcomeUri"
                 placeholder="URL"
                 :disabled="notEditable"
                 @input="$v.item.enrollment.welcomeUri.$touch()"></b-input>
    </b-field>
    <span>{{isFirstTabInValid}}</span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, minLength, maxLength, numeric, minValue, email, url } from 'vuelidate/lib/validators'

export default {
  props: ['search', 'identityNumber', 'edit', 'item', 'notEditable', 'hideBuddyPage'],

  computed: {
    ...mapState(['shared']),
    isFirstTabInValid () {
      return this.$store.commit('widgetForm/isFirstTabInValid', this.$v.$invalid)
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
          maxLength: maxLength(11),
          numeric
        },
        email: {
          required,
          email
        },
        gsmTel: {
          required,
          maxLength: maxLength(10),
        },
        contactType: {
          required
        },
        welcomeUri: {
          required,
          url
        }
      }
    }

  },

  methods: {
    ...mapActions({
      getChannels: 'shared/getChannels'
    })
  },
  components: {

  },
  beforeMount () {
    this.getChannels()
  }

}
</script>

