<template>
  <div>

    <b-field v-if="identityNumber && edit" label="Sicil Numarası">
      <b-input v-model="item.enrollment.registery" name="registery" disabled/>
    </b-field>
    <b-field :type="$v.item.enrollment.firstname.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.firstname.$error ? 'Zorunlu alan': ''"
             label="Ad" >
      <b-input v-model="item.enrollment.firstname"
               :disabled="notEditable"
               @input="$v.item.enrollment.firstname.$touch()" />
    </b-field>
    <b-field :type="$v.item.enrollment.lastname.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.lastname.$error ? 'Zorunlu alan': ''"
             label="Soyad">
      <b-input v-model="item.enrollment.lastname"
               :disabled="notEditable"
               name="lastName"
               @input="$v.item.enrollment.lastname.$touch()"/>
    </b-field>

    <b-field v-if="!search && !hideBuddyPage"
             :type="$v.item.enrollment.email.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.email.$error ? 'Zorunlu alan': ''"
             label="E-Posta">
      <b-input v-model="item.enrollment.email"
               :disabled="notEditable"
               type="email"
               maxlength="50"
               @input="$v.item.enrollment.email.$touch()" />
    </b-field>
    <!-- v-if="!search && !hideBuddyPage" -->
    <b-field :type="$v.item.enrollment.gsmTel.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.gsmTel.$error ? 'Zorunlu alan': ''"
             label="Cep Telefonu" />
    <the-mask v-model="item.enrollment.gsmTel"
              :disabled="notEditable"
              :masked="false"
              placeholder="(500) 000 00 00"
              mask="(5##) ### ## ##" class="input" type="text" @input="$v.item.enrollment.gsmTel.$touch()" />

    <b-field v-if="!hideBuddyPage"
             :type="$v.item.enrollment.identityNumber.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.identityNumber.$error ? 'Zorunlu alan': ''"
             label="Kimlik Numarası">
      <b-input v-model="item.enrollment.identityNumber"
               :disabled="notEditable"
               name="identity"
               type="text"
               maxlength="11"
               minlength="11"
               @input="$v.item.enrollment.identityNumber.$touch()"/>
    </b-field>
    <b-field v-if="!search && !hideBuddyPage"
             :type="$v.item.enrollment.contactType.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.contactType.$error ? 'Zorunlu alan': ''"
             label="İletişim Yolu">
      <b-select v-model="item.enrollment.contactType"
                :disabled="notEditable"
                placeholder="Seçiniz..."
                @input="$v.item.enrollment.contactType.$touch()">
        <option v-for="c in shared.channels" :key="c.id" :value="c" >
          {{ c.name }}
        </option>
      </b-select>
    </b-field>
    <b-field v-if="!search && !hideBuddyPage"
             :type="$v.item.enrollment.welcomeUri.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.welcomeUri.$error ? 'Zorunlu alan': ''"
             label="Personele Gönderilecek Hoşgeldin Linki">
      <b-input v-model="item.enrollment.welcomeUri"
               :disabled="notEditable"
               placeholder="http://"
               @input="$v.item.enrollment.welcomeUri.$touch()"/>
    </b-field>
    <span>{{ isFirstTabInValid }}</span>
  </div>
</template>

<script>
import { TheMask } from 'vue-the-mask'

import { mapState, mapActions } from 'vuex'
import {
  required,
  minLength,
  maxLength,
  numeric,
  email,
  url
} from 'vuelidate/lib/validators'

export default {
  components: { TheMask },
  props: [
    'search',
    'identityNumber',
    'edit',
    'item',
    'notEditable',
    'hideBuddyPage'
  ],

  computed: {
    ...mapState(['shared']),
    isFirstTabInValid() {
      return this.$store.commit(
        'widgetForm/isFirstTabInValid',
        this.$v.$invalid
      )
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
          maxLength: maxLength(10)
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
  beforeMount() {
    this.getChannels()
  },
  methods: {
    ...mapActions({
      getChannels: 'shared/getChannels'
    })
  }
}
</script>
