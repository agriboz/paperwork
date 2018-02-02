<template>
  <div class="columns">
    <div class="column">
      <b-field label="Organizasyon">
        <b-select v-model="item.enrollment.organization"  placeholder="Seçiniz..." @input="setCompanies" expanded>
            <option :key="o.id" :value="o" v-for="o in shared.organizations">
                {{o.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="Şirket">
        <b-select placeholder="Seçiniz..." @input="setWorkLocations" :disabled="!item.enrollment.organization" v-model="item.enrollment.company" expanded @blur="setItem">
            <option :key="c.id" :value="c" v-for="c in shared.companies">
                {{c.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="Departman" v-if="!search">
        <b-input v-model="item.enrollment.department" @blur="setItem"></b-input>
      </b-field>
      <b-field label="Pozisyon" v-if="!search">
        <b-input v-model="item.enrollment.position" @blur="setItem"></b-input>
      </b-field>
      <b-field label="Çalışma Lokasyonu">
        <b-select placeholder="Seçiniz..." :disabled="!item.enrollment.company"  v-model="item.enrollment.workLocation" expanded @input="setItem">
            <option :key="w.id" :value="w" v-for="w in shared.workLocations">
                {{w.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="SGK Lokasyonu">
        <b-select placeholder="Seçiniz..." :disabled="!item.enrollment.company" v-model="item.enrollment.sgkLocation" expanded @blur="setItem">
            <option :key="s.id" :value="s" v-for="s in shared.SGKLocations">
                {{s.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="Kategori">
        <b-select placeholder="Seçiniz..." :disabled="!item.enrollment.organization" v-model="item.enrollment.category" expanded @input="setItem()">
            <option :key="c.id" :value="c" v-for="c in shared.categories">
                {{c.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="İKİO">
        <b-select placeholder="Seçiniz..." :disabled="!item.enrollment.company" v-model="item.enrollment.hrBusinessPartnerEmployee" expanded @blur="setItem">
            <option :key="h.id" :value="h" v-for="h in shared.hrBusinessPartnerEmployees">
                {{h.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="Yönetici">
        <b-autocomplete
            :disabled="!item.enrollment.organization"
            :data="shared.managers"
            v-model="item.manager"
            @input="getManagers({id: item.enrollment.organization.id, name: item.enrollment.manager})"
            placeholder="Personel Ara"
            icon="magnify"
            field="name"
            @select="option => $store.commit('widgetForm/item', {manager: option})"
            >
            <template slot="empty">Arama kriterine uygun sonuç bulunamadı.</template>
        </b-autocomplete>
      </b-field>
    </div>
    <div class="column" v-if="!search">
      <div class="field">
        <b-switch v-model="item.enrollment.isBuddyAssigned" @input="setItem(); getBuddyEmployees()">
          Buddy Olacak
        </b-switch>
      </div>
      <b-field label="Üst Yönetim / Saha Çalışanı">
        <b-select placeholder="Seçiniz..." v-model="item.enrollment.buddyType" :disabled="item.enrollment.isBuddyAssigned" expanded @input="setItem">
            <option :key="b.id" :value="b" v-for="b in shared.buddyTypes">
                {{b.name}}
            </option>
        </b-select>
      </b-field>


      <div class="form-wrapper" title="Buddy Bilgileri" style="margin-top:40px">
        <b-field label="Buddy">
          <b-select placeholder="Seçiniz..." v-model="item.enrollment.buddyEmployee" :disabled="!item.enrollment.isBuddyAssigned" expanded @input="setItem">
              <option :key="b.id" :value="b" v-for="b in shared.buddyEmployees">
                  {{b.name}}
              </option>
          </b-select>
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  props: ['search', 'item'],
  computed: {
    ...mapState(['shared'])
  },

  validations: {
    item: {
      enrollment: {
        name: {
          required,
          minLength: minLength(4)
        }
      }
    }
  },

  methods: {
    ...mapActions({
      getOrganizations: 'shared/getOrganizations',
      getCompanies: 'shared/getCompanies',
      getWorkLocations: 'shared/getWorkLocations',
      getHrBusinessPartnerEmployees: 'shared/getHrBusinessPartnerEmployees',
      getCategories: 'shared/getCategories',
      getManagers: 'shared/getManagers',
      getDocumentDetails: 'documentDetail/getDocumentDetails',
      getBuddyTypes: 'shared/getBuddyTypes',
      getBuddyEmployees: 'shared/getBuddyEmployees'
    }),

    async setCompanies () {
      await this.setItem()
      await this.getCompanies()
      await this.getHrBusinessPartnerEmployees()
      await this.getCategories()
      this.$store.commit('widgetForm/isCompanyChanged', true)
    },

    async setWorkLocations () {
      await this.setItem()
      await this.getWorkLocations()
    },

    async setHrBusinessPartnerEmployees () {
      await this.setItem()
    },

    async setManagers () {
      await this.getManagers()
      await this.setItem()
    },

    setItem () {
      this.$store.commit('widgetForm/item', this.item)
    }
  },

  mounted () {
    this.getOrganizations()
    this.getBuddyTypes()

    if (this.edit && this.item.enrollment.company) {
      this.getBuddyEmployees()
    }
  }

}
</script>

