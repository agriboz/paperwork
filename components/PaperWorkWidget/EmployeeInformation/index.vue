<template>
  <div>
    <b-field v-if="identityNumber && edit" label="Sicil Numarası">
      <b-input v-model="item.enrollment.registery" name="registery" disabled/>
    </b-field>
    <b-field :type="$v.item.enrollment.firstname.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.firstname.$error ? 'Zorunlu alan': ''"
             label="Ad" >
      <b-input v-model="item.enrollment.firstname"
               :disabled="notEditable"/>
    </b-field>
    <b-field :type="$v.item.enrollment.lastname.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.lastname.$error ? 'Zorunlu alan': ''"
             label="Soyad">
      <b-input v-model="item.enrollment.lastname"
               :disabled="notEditable"
               name="lastName"/>
    </b-field>

    <b-field v-if="!search && !hideBuddyPage"
             :type="$v.item.enrollment.email.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.email.$error ? 'Zorunlu alan': ''"
             label="E-Posta">
      <b-input v-model="item.enrollment.email"
               :disabled="notEditable"
               type="email"
               maxlength="50" />
    </b-field>
    <!-- v-if="!search && !hideBuddyPage" -->
    <b-field :type="$v.item.enrollment.gsmTel.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.gsmTel.$error ? 'Zorunlu alan': ''"
             label="Cep Telefonu" />
    <the-mask v-model="item.enrollment.gsmTel"
              :disabled="notEditable"
              :masked="false"
              placeholder="(500) 000 00 00"
              mask="(5##) ### ## ##" class="input" type="text" />

    <b-field v-if="!hideBuddyPage"
             :type="$v.item.enrollment.identityNumber.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.identityNumber.$error ? 'Zorunlu alan': ''"
             label="Kimlik Numarası">
      <b-input v-model="item.enrollment.identityNumber"
               :disabled="notEditable"
               name="identity"
               type="text"
               maxlength="11"
               minlength="11" />
    </b-field>
    <b-field v-if="!search && !hideBuddyPage"
             :type="$v.item.enrollment.contactType.$error ? 'is-danger' : ''"
             :message="$v.item.enrollment.contactType.$error ? 'Zorunlu alan': ''"
             label="İletişim Yolu">
      <b-select v-model="item.enrollment.contactType"
                :disabled="notEditable"
                placeholder="Seçiniz...">
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
               placeholder="http://"/>
    </b-field>

    <div v-if="!search && !hideBuddyPage" class="field is-grouped">
      <p v-if="!widgetForm.editItem.flowId" class="control">
        <button type="submit"
                class="button is-primary"
                @click="startEmployment(item)">Personel Girişini Başlat</button>
      </p>

      <p v-if="!widgetForm.editItem.flowId" class="control">
        <button :disabled="!isDraft"
                class="button is-info"
                @click="saveAsDraft">Taslak Olarak Kaydet</button>
      </p>
    </div>

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
import { formValidation, checkEmptyDropDown } from '../../../common'

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
    ...mapState(['shared', 'widgetForm']),
    isDraft() {
      if (this.edit) {
        const isDraftEdit =
          !!this.widgetForm.editItem.enrollment.firstname &&
          !!this.widgetForm.editItem.enrollment.lastname &&
          !!this.widgetForm.editItem.enrollment.identityNumber

        return isDraftEdit
      }
      const isDraftNew =
        !!this.widgetForm.item.enrollment.firstname &&
        !!this.widgetForm.item.enrollment.lastname &&
        !!this.widgetForm.item.enrollment.identityNumber

      return isDraftNew
    },
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
          checkEmptyDropDown
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
    startEmployment(payload) {
      formValidation(this.widgetForm)
      this.$v.item.enrollment.$touch()
      if (!this.$v.$invalid) {
        this.$store.dispatch('widgetForm/startEmployment', payload)
      }
    },
    saveAsDraft() {
      return this.edit
        ? this.$store.dispatch('widgetForm/updateAsDraft')
        : this.$store.dispatch('widgetForm/saveAsDraft')
    },
    ...mapActions({
      getChannels: 'shared/getChannels'
    })
  }
}
</script>
