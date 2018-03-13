<template>
  <div class="columns">
    <div class="column">

      <b-field :type="$v.item.enrollment.organization.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.organization.$error ? 'Zorunlu alan': ''"
               label="Organizasyon">
        <b-select v-model="item.enrollment.organization"
                  :disabled="notEditable"
                  placeholder="Seçiniz..."
                  expanded
                  @input="setCompanies(); $v.item.enrollment.organization.$touch()">
          <option v-for="o in shared.organizations" :key="o.id" :value="o">
            {{ o.name }}
          </option>
        </b-select>
      </b-field>

      <b-field :type="$v.item.enrollment.company.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.company.$error ? 'Zorunlu alan': ''"
               label="Şirket">
        <b-select v-model="item.enrollment.company"
                  :disabled="!item.enrollment.organization || hideBuddyPage"
                  expanded
                  placeholder="Seçiniz..."
                  @input="setWorkLocations(); $v.item.enrollment.company.$touch()">
          <option v-for="c in shared.companies" :key="c.id" :value="c">
            {{ c.name }}
          </option>
        </b-select>
      </b-field>
      <b-field v-if="!search"
               :type="$v.item.enrollment.department.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.department.$error ? 'Zorunlu alan': ''"
               label="Departman">
        <b-input v-model="item.enrollment.department"
                 :disabled="notEditable"
                 @input="$v.item.enrollment.department.$touch()"/>
      </b-field>
      <b-field v-if="!search"
               :type="$v.item.enrollment.position.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.position.$error ? 'Zorunlu alan': ''"
               label="Pozisyon">
        <b-input v-model="item.enrollment.position"
                 :disabled="notEditable"
                 @input="$v.item.enrollment.position.$touch()"/>
      </b-field>
      <b-field v-if="!hideBuddyPage"
               :type="$v.item.enrollment.workLocation.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.workLocation.$error ? 'Zorunlu alan': ''"
               label="Çalışma Lokasyonu">
        <b-select v-model="item.enrollment.workLocation"
                  :disabled="!item.enrollment.company"
                  placeholder="Seçiniz..."
                  expanded
                  @input="$v.item.enrollment.workLocation.$touch()">
          <option v-for="w in shared.workLocations" :key="w.id" :value="w">
            {{ w.name }}
          </option>
        </b-select>
      </b-field>
      <b-field v-if="!hideBuddyPage"
               :type="$v.item.enrollment.sgkLocation.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.sgkLocation.$error ? 'Zorunlu alan': ''"
               label="SGK Lokasyonu">
        <b-select v-model="item.enrollment.sgkLocation"
                  :disabled="!item.enrollment.company"
                  placeholder="Seçiniz..."
                  expanded
                  @input="$v.item.enrollment.sgkLocation.$touch()">
          <option v-for="s in shared.SGKLocations" :key="s.id" :value="s">
            {{ s.name }}
          </option>
        </b-select>
      </b-field>
      <b-field v-if="!hideBuddyPage"
               :type="$v.item.enrollment.organizationDocumentCategory.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.organizationDocumentCategory.$error ? 'Zorunlu alan': ''"
               label="Kategori">
        <b-select v-model="item.enrollment.organizationDocumentCategory"
                  :disabled="!item.enrollment.organization"
                  placeholder="Seçiniz..."
                  expanded
                  @input="$v.item.enrollment.organizationDocumentCategory.$touch()">
          <option v-for="c in shared.categories" :key="c.id" :value="c">
            {{ c.name }}
          </option>
        </b-select>
      </b-field>

      <b-field :type="$v.item.enrollment.hrBusinessPartnerEmployee.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.hrBusinessPartnerEmployee.$error ? 'Zorunlu alan': ''"
               label="İKİO">
        <b-select v-model="item.enrollment.hrBusinessPartnerEmployee"
                  :disabled="!item.enrollment.company || hideBuddyPage"
                  expanded
                  placeholder="Seçiniz..."
                  @input="$v.item.enrollment.hrBusinessPartnerEmployee.$touch()">
          <option v-for="h in shared.hrBusinessPartnerEmployees" :key="h.id" :value="h">
            {{ h.name }}
          </option>
        </b-select>
      </b-field>

      <b-field v-if="hideBuddyPage" label="Yönetici">
        <b-input v-model="item.enrollment.manager.name" disabled/>
      </b-field>

      <b-field v-if="!edit && !hideBuddyPage"
               :type="$v.item.enrollment.manager.name.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.manager.name.$error ? 'Zorunlu alan': ''"
               label="Yönetici" >
        <b-autocomplete
          :disabled="!item.enrollment.organization || hideBuddyPage"
          :data="shared.managers"
          v-model="item.enrollment.manager.name"
          placeholder="Yönetici Ara"
          icon="magnify"
          field="name"
          @input="getManagers({id: item.enrollment.organization.id, name: item.enrollment.manager.name}); $v.item.enrollment.manager.name.$touch()"
          @select="option => setManager(option)">
          <template slot="empty">Arama kriterine uygun sonuç bulunamadı.</template>
        </b-autocomplete>
      </b-field>

      <b-field v-if="edit" label="Yönetici">
        <b-autocomplete
          :disabled="!item.enrollment.organization"
          :data="shared.managers"
          v-model="item.enrollment.manager.name"
          placeholder="Yönetici Ara"
          icon="magnify"
          field="name"
          @input="getManagers({id: item.enrollment.organization.id, name: item.enrollment.manager.name})"
          @select="option => setManager(option)">
          <template slot="empty">Arama kriterine uygun sonuç bulunamadı.</template>
        </b-autocomplete>
      </b-field>
    </div>
    <div v-if="!search && !hideBuddyPage" class="column">
      <div class="field">
        <b-switch :disabled="!item.enrollment.company || notEditable" v-model="item.enrollment.isBuddyAssigned" @input="getBuddyEmployees(item.enrollment.company.id); checkModelStatus()">
          Buddy Olacak
        </b-switch>
      </div>
      <b-field :type="$v.item.enrollment.buddyType.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.buddyType.$error ? 'Zorunlu alan': ''"
               label="Üst Yönetim / Saha Çalışanı">
        <b-select v-model="item.enrollment.buddyType"
                  :disabled="item.enrollment.isBuddyAssigned || notEditable"
                  placeholder="Seçiniz..."
                  expanded
                  @input="$v.item.enrollment.buddyType.$touch()">
          <option v-for="b in shared.buddyTypes" :key="b.id" :value="b">
            {{ b.name }}
          </option>
        </b-select>
      </b-field>
      <div v-if="item.enrollment.isBuddyAssigned" class="form-wrapper" title="Buddy Bilgileri" style="margin-top:40px">
        <b-field :type="$v.item.enrollment.buddyEmployee.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.buddyEmployee.$error ? 'Zorunlu alan': ''"
                 label="Buddy">
          <b-select v-model="item.enrollment.buddyEmployee"
                    :disabled="!item.enrollment.isBuddyAssigned"
                    placeholder="Seçiniz..."
                    expanded
                    @input="getBuddy(item.enrollment.buddyEmployee.id); $v.item.enrollment.buddyEmployee.$touch()">
            <option v-for="b in shared.buddyEmployees" :key="b.id" :value="b">
              {{ b.name }}
            </option>
          </b-select>
        </b-field>
        <div v-if="tasks.buddyInformation">
          <b-field label="Sicil Numarası">
            <b-input :value="tasks.buddyInformation.registry" :disabled="true"/>
          </b-field>
          <b-field label="Şirket">
            <b-input :value="tasks.buddyInformation.company.name" :disabled="true"/>
          </b-field>
          <b-field label="Departman">
            <b-input :value="tasks.buddyInformation.department" :disabled="true"/>
          </b-field>
          <b-field label="Lokasyon">
            <b-input :value="tasks.buddyInformation.location.name" :disabled="true"/>
          </b-field>
          <b-field label="Ünvan">
            <b-input :value="tasks.buddyInformation.name" :disabled="true"/>
          </b-field>
        </div>
      </div>
    </div>
    <span>{{ isThirdTabInValid }}</span>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapState, mapActions } from 'vuex'
import {
  required,
  requiredIf,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  props: ['search', 'item', 'edit', 'notEditable', 'hideBuddyPage'],
  data: () => ({
    name: ''
  }),
  computed: {
    ...mapState(['shared', 'tasks']),
    isThirdTabInValid() {
      return this.$store.commit(
        'widgetForm/isThirdTabInValid',
        this.$v.$invalid
      )
    }
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
          required,
          minLength: minLength(3),
          maxLength: maxLength(50)
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
          name: {
            required
          }
        },
        buddyType: {
          requiredIf: requiredIf(vueInstance => {
            return !vueInstance.isBuddyAssigned
          })
        },
        buddyEmployee: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isBuddyAssigned
          })
        }
      }
    }
  },
  async mounted() {
    await this.getOrganizations()
    await this.getBuddyTypes()
    // fix this
    if (this.hideBuddyPage) {
      const organizationId = this.item.enrollment.organization.id
      await this.getCompanies(organizationId)
      await this.getHrBusinessPartnerEmployees(organizationId)
    }

    if (this.edit) {
      const organizationId = this.item.enrollment.organization.id
      const companyId = this.item.enrollment.company.id

      await this.getCompanies(organizationId)
      await this.getCategories(organizationId)
      await this.getHrBusinessPartnerEmployees(organizationId)
      await this.getWorkLocations(companyId)
      await this.getBuddyEmployees(companyId)
    }
  },
  methods: {
    ...mapActions({
      getOrganizations: 'shared/getOrganizations',
      getCompanies: 'shared/getCompanies',
      getWorkLocations: 'shared/getWorkLocations',
      getHrBusinessPartnerEmployees: 'shared/getHrBusinessPartnerEmployees',
      getCategories: 'shared/getCategories',
      getManager: 'shared/getManagers',
      getDocumentDetails: 'documentDetail/getDocumentDetails',
      getBuddyTypes: 'shared/getBuddyTypes',
      getBuddyEmployees: 'shared/getBuddyEmployees',
      getBuddy: 'tasks/getBuddy'
    }),

    checkModelStatus() {
      if (!this.item.enrollment.isBuddyAssigned) {
        delete this.item.enrollment.buddyEmployee
      }
    },

    async setCompanies() {
      const organizationId = this.item.enrollment.organization.id
      await this.getCompanies(organizationId)
      await this.getHrBusinessPartnerEmployees(organizationId)
      await this.getCategories(organizationId)
      this.$store.commit('widgetForm/isCompanyChanged', true)
    },

    async setWorkLocations() {
      await this.getWorkLocations(this.item.enrollment.company.id)
      if (this.item.enrollment.isBuddyAssigned) {
        await this.getBuddyEmployees(this.item.enrollment.company.id)
      }
    },

    setManager: debounce(function(data) {
      data ? this.$store.commit('widgetForm/manager', data) : null
    }, 500),

    getManagers: debounce(function(data) {
      return data.name.length >= 3 ? this.getManager(data) : null
    }, 1000)
  }
}
</script>
