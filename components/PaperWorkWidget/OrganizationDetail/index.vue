<template>
  <div class="columns">
    <div class="column">
      <b-field label="Organizasyon"
               :type="$v.item.enrollment.organization.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.organization.$error ? 'Zorunlu alan': ''">
        <b-select v-model="item.enrollment.organization"  placeholder="Seçiniz..."
                  @input="setCompanies(); $v.item.enrollment.organization.$touch()"
                  expanded>
            <option :key="o.id" :value="o" v-for="o in shared.organizations">
                {{o.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="Şirket"
               :type="$v.item.enrollment.company.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.company.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  @input="setWorkLocations(); $v.item.enrollment.company.$touch()" :disabled="!item.enrollment.organization" v-model="item.enrollment.company"
                  expanded
                  @blur="setItem">
            <option :key="c.id" :value="c" v-for="c in shared.companies">
                {{c.name}}
            </option>
        </b-select>
      </b-field>
     <b-field label="Departman"
               :type="$v.item.enrollment.department.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.department.$error ? 'Zorunlu alan': ''"
               v-if="!search">
        <b-input v-model="item.enrollment.department"
                 @input="setItem(); $v.item.enrollment.department.$touch()"></b-input>
      </b-field>
      <b-field label="Pozisyon"
               :type="$v.item.enrollment.position.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.position.$error ? 'Zorunlu alan': ''"
               v-if="!search">
        <b-input v-model="item.enrollment.position"
                 @input="setItem(); $v.item.enrollment.position.$touch()"></b-input>
      </b-field>
      <b-field label="Çalışma Lokasyonu"
               :type="$v.item.enrollment.workLocation.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.workLocation.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  :disabled="!item.enrollment.company"
                  v-model="item.enrollment.workLocation"
                  expanded
                  @input="setItem(); $v.item.enrollment.workLocation.$touch()">
            <option :key="w.id" :value="w" v-for="w in shared.workLocations">
                {{w.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="SGK Lokasyonu"
               :type="$v.item.enrollment.sgkLocation.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.sgkLocation.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  :disabled="!item.enrollment.company"
                  v-model="item.enrollment.sgkLocation"
                  expanded
                  @input="setItem(); $v.item.enrollment.sgkLocation.$touch()">
            <option :key="s.id" :value="s" v-for="s in shared.SGKLocations">
                {{s.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="Kategori"
               :type="$v.item.enrollment.organizationDocumentCategory.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.organizationDocumentCategory.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  :disabled="!item.enrollment.organization"
                  v-model="item.enrollment.organizationDocumentCategory"
                  expanded
                  @input="setItem(); $v.item.enrollment.organizationDocumentCategory.$touch()">
            <option :key="c.id" :value="c" v-for="c in shared.categories">
                {{c.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="İKİO"
               :type="$v.item.enrollment.hrBusinessPartnerEmployee.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.hrBusinessPartnerEmployee.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  :disabled="!item.enrollment.company"
                  v-model="item.enrollment.hrBusinessPartnerEmployee"
                  expanded
                  @input="setItem(); $v.item.enrollment.hrBusinessPartnerEmployee.$touch()">
            <option :key="h.id" :value="h" v-for="h in shared.hrBusinessPartnerEmployees">
                {{h.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="Yönetici" v-if="edit"
               :type="$v.item.enrollment.manager.name.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.manager.name.$error ? 'Zorunlu alan': ''">
        <b-autocomplete
            :disabled="!item.enrollment.organization"
            :data="shared.managers"
            v-model="item.enrollment.manager.name"
            @input="getManagers({id: item.enrollment.organization.id, name: item.enrollment.manager.name}); $v.item.enrollment.manager.name.$touch()"
            placeholder="Personel Ara"
            icon="magnify"
            field="name"
            @select="option => $store.commit('widgetForm/item', {manager: option})"
            >
            <template slot="empty">Arama kriterine uygun sonuç bulunamadı.</template>
        </b-autocomplete>
      </b-field>
      <b-field label="Yönetici" v-if="!edit"
               :type="$v.item.enrollment.manager.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.manager.$error ? 'Zorunlu alan': ''">
        <b-autocomplete
            :disabled="!item.enrollment.organization"
            :data="shared.managers"
            v-model="name"
            @input="getManagers({id: item.enrollment.organization.id, name}); $v.item.enrollment.manager.$touch()"
            placeholder="Personel Ara"
            icon="magnify"
            field="name"
            @select="option => $store.commit('widgetForm/manager', option)"
            >
            <template slot="empty">Arama kriterine uygun sonuç bulunamadı.</template>
        </b-autocomplete>
      </b-field>
    </div>
    <div class="column" v-if="!search">
      <div class="field">
        <b-switch v-model="item.enrollment.isBuddyAssigned" @input="setItem(); getBuddyEmployees(item.enrollment.company.id)">
          Buddy Olacak
        </b-switch>
      </div>
      <b-field label="Üst Yönetim / Saha Çalışanı"
               :type="$v.item.enrollment.buddyType.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.buddyType.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  v-model="item.enrollment.buddyType"
                  :disabled="item.enrollment.isBuddyAssigned"
                  expanded
                  @input="setItem(); $v.item.enrollment.buddyType.$touch()">
            <option :key="b.id" :value="b" v-for="b in shared.buddyTypes">
                {{b.name}}
            </option>
        </b-select>
      </b-field>


      <div class="form-wrapper" title="Buddy Bilgileri" style="margin-top:40px">
        <b-field label="Buddy"
                 :type="$v.item.enrollment.buddyEmployee.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.buddyEmployee.$error ? 'Zorunlu alan': ''">
          <b-select placeholder="Seçiniz..."
                    v-model="item.enrollment.buddyEmployee"
                    :disabled="!item.enrollment.isBuddyAssigned"
                    expanded
                    @input="setItem(); $v.item.enrollment.buddyEmployee.$touch() ">
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
import { required, requiredIf, minLength } from 'vuelidate/lib/validators'

export default {
  props: ['search', 'item', 'edit'],
  data: () => ({
    name: ''
  }),
  computed: {
    ...mapState(['shared'])
  },

  validations: {
    item: {
      enrollment: {
        organization: {
          required
        },
        company: {
          required
        },
        department: {
          required
        },
        position: {
          required
        },
        workLocation: {
          required
        },
        sgkLocation: {
          required
        },
        organizationDocumentCategory: {
          required
        },
        hrBusinessPartnerEmployee: {
          required
        },
        manager: {
          name: {required}
        },
        buddyType: {
          requiredIf: requiredIf((vueInstance) => {
            return !vueInstance.isBuddyAssigned
          })
        },
        buddyEmployee: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isBuddyAssigned
          })
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
      const organizationId = this.item.enrollment.organization.id
      await this.setItem()
      await this.getCompanies(organizationId)
      await this.getHrBusinessPartnerEmployees(organizationId)
      await this.getCategories(organizationId)
      this.$store.commit('widgetForm/isCompanyChanged', true)
    },

    async setWorkLocations () {
      await this.setItem()
      await this.getWorkLocations(this.item.enrollment.company.id)
    },

    async setHrBusinessPartnerEmployees () {
      await this.setItem()
    },

    async setManagers () {
      await this.getManagers()
      // await this.setItem()
    },

    setItem () {
      this.$store.commit('widgetForm/canStartEmployment', this.$v.$invalid)
      this.$store.commit('widgetForm/item', this.item)
    }
  },

  async mounted () {
    await this.getOrganizations()
    await this.getBuddyTypes()
    this.$store.commit('widgetForm/canStartEmployment', this.$v.$invalid)


    if (this.edit) {
      const organizationId = this.item.enrollment.organization.id
      const companyId = this.item.enrollment.company.id

      await this.getCompanies(organizationId)
      await this.getCategories(organizationId)
      await this.getHrBusinessPartnerEmployees(organizationId)
      await this.getWorkLocations(companyId)
      await this.getBuddyEmployees(companyId)


    }

  }

}
</script>

