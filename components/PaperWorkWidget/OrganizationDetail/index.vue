<template>
  <div class="columns">
    <div class="column">

      <b-field label="Organizasyon"
               :type="$v.item.enrollment.organization.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.organization.$error ? 'Zorunlu alan': ''">
        <b-select v-model="item.enrollment.organization"
                  :disabled="notEditable"
                   placeholder="Seçiniz..."
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
                  @input="setWorkLocations(); $v.item.enrollment.company.$touch()"
                  :disabled="!item.enrollment.organization || hideBuddyPage"
                  v-model="item.enrollment.company"
                  expanded>
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
                :disabled="notEditable"
                 @input="$v.item.enrollment.department.$touch()"></b-input>
      </b-field>
      <b-field label="Pozisyon"
               :type="$v.item.enrollment.position.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.position.$error ? 'Zorunlu alan': ''"
               v-if="!search">
        <b-input v-model="item.enrollment.position"
                 :disabled="notEditable"
                 @input="$v.item.enrollment.position.$touch()"></b-input>
      </b-field>
      <b-field label="Çalışma Lokasyonu"
                v-if="!hideBuddyPage"
               :type="$v.item.enrollment.workLocation.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.workLocation.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  :disabled="!item.enrollment.company"
                  v-model="item.enrollment.workLocation"
                  expanded
                  @input="$v.item.enrollment.workLocation.$touch()">
            <option :key="w.id" :value="w" v-for="w in shared.workLocations">
                {{w.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="SGK Lokasyonu"
                v-if="!hideBuddyPage"
               :type="$v.item.enrollment.sgkLocation.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.sgkLocation.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  :disabled="!item.enrollment.company"
                  v-model="item.enrollment.sgkLocation"
                  expanded
                  @input="$v.item.enrollment.sgkLocation.$touch()">
            <option :key="s.id" :value="s" v-for="s in shared.SGKLocations">
                {{s.name}}
            </option>
        </b-select>
      </b-field>
      <b-field label="Kategori"
               v-if="!hideBuddyPage"
               :type="$v.item.enrollment.organizationDocumentCategory.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.organizationDocumentCategory.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  :disabled="!item.enrollment.organization"
                  v-model="item.enrollment.organizationDocumentCategory"
                  expanded
                  @input="$v.item.enrollment.organizationDocumentCategory.$touch()">
            <option :key="c.id" :value="c" v-for="c in shared.categories">
                {{c.name}}
            </option>
        </b-select>
      </b-field>

      <b-field label="İKİO"
               :type="$v.item.enrollment.hrBusinessPartnerEmployee.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.hrBusinessPartnerEmployee.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  :disabled="!item.enrollment.company || hideBuddyPage"
                  v-model="item.enrollment.hrBusinessPartnerEmployee"
                  expanded
                  @input="$v.item.enrollment.hrBusinessPartnerEmployee.$touch()">
            <option :key="h.id" :value="h" v-for="h in shared.hrBusinessPartnerEmployees">
                {{h.name}}
            </option>
        </b-select>
      </b-field>

      <b-field label="Yönetici" v-if="hideBuddyPage">
          <b-input v-model="item.enrollment.manager.name" disabled></b-input>
      </b-field>

      <b-field label="Yönetici" v-if="!edit && !hideBuddyPage"
               :type="$v.item.enrollment.manager.name.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.manager.name.$error ? 'Zorunlu alan': ''">
        <b-autocomplete
            :disabled="!item.enrollment.organization || hideBuddyPage"
            :data="shared.managers"
            v-model="item.enrollment.manager.name"
            @input="getManagers({id: item.enrollment.organization.id, name: item.enrollment.manager.name}); $v.item.enrollment.manager.name.$touch()"
            placeholder="Yönetici Ara"
            icon="magnify"
            field="name"
            @select="option => setManager(option)"
            >
            <template slot="empty">Arama kriterine uygun sonuç bulunamadı.</template>
        </b-autocomplete>
      </b-field>

      <b-field label="Yönetici" v-if="edit">
        <b-autocomplete
            :disabled="!item.enrollment.organization"
            :data="shared.managers"
            v-model="item.enrollment.manager.name"
            @input="getManagers({id: item.enrollment.organization.id, name: item.enrollment.manager.name})"
            placeholder="Yönetici Ara"
            icon="magnify"
            field="name"
            @select="option => setManager(option)"
            >
            <template slot="empty">Arama kriterine uygun sonuç bulunamadı.</template>
        </b-autocomplete>
      </b-field>
    </div>
    <div class="column" v-if="!search && !hideBuddyPage">
      <div class="field">
        <b-switch :disabled="!item.enrollment.company || notEditable"  v-model="item.enrollment.isBuddyAssigned" @input="getBuddyEmployees(item.enrollment.company.id); checkModelStatus()">
          Buddy Olacak
        </b-switch>
      </div>
      <b-field label="Üst Yönetim / Saha Çalışanı"
               :type="$v.item.enrollment.buddyType.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.buddyType.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  v-model="item.enrollment.buddyType"
                  :disabled="item.enrollment.isBuddyAssigned || notEditable"
                  expanded
                  @input="$v.item.enrollment.buddyType.$touch()">
            <option :key="b.id" :value="b" v-for="b in shared.buddyTypes">
                {{b.name}}
            </option>
        </b-select>
      </b-field>
      <div class="form-wrapper" title="Buddy Bilgileri" style="margin-top:40px" v-if="item.enrollment.isBuddyAssigned">
        <b-field label="Buddy"
                  :type="$v.item.enrollment.buddyEmployee.$error ? 'is-danger' : ''"
                  :message="$v.item.enrollment.buddyEmployee.$error ? 'Zorunlu alan': ''">
          <b-select placeholder="Seçiniz..."
                    v-model="item.enrollment.buddyEmployee"
                    :disabled="!item.enrollment.isBuddyAssigned"
                    expanded
                    @input="getBuddy(item.enrollment.buddyEmployee.id); $v.item.enrollment.buddyEmployee.$touch()">
              <option :key="b.id" :value="b" v-for="b in shared.buddyEmployees">
                  {{b.name}}
              </option>
          </b-select>
        </b-field>

        <b-field label="Sicil Numarası" v-if="tasks.buddyInformation">
          <b-input :value="tasks.buddyInformation.registry" :disabled="true"></b-input>
        </b-field>
        <b-field label="Şirket" v-if="tasks.buddyInformation">
            <b-input :value="tasks.buddyInformation.company.name" :disabled="true"></b-input>
        </b-field>
        <b-field label="Departman" v-if="tasks.buddyInformation">
            <b-input :value="tasks.buddyInformation.department" :disabled="true"></b-input>
        </b-field>
        <b-field label="Lokasyon" v-if="tasks.buddyInformation">
            <b-input :value="tasks.buddyInformation.location.name" :disabled="true"></b-input>
        </b-field>
        <b-field label="Ünvan" v-if="tasks.buddyInformation">
            <b-input :value="tasks.buddyInformation.name" :disabled="true"></b-input>
        </b-field>
      </div>
    </div>
    <span>{{isThirdTabInValid}}</span>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'
import { mapState, mapActions } from 'vuex'
import { required, requiredIf, minLength, maxLength} from 'vuelidate/lib/validators'

export default {
  props: ['search', 'item', 'edit', 'notEditable', 'hideBuddyPage'],
  data: () => ({
    name: ''
  }),
  computed: {
    ...mapState(['shared', 'tasks']),
    isThirdTabInValid () {
      return this.$store.commit('widgetForm/isThirdTabInValid', this.$v.$invalid)
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
      getManager: 'shared/getManagers',
      getDocumentDetails: 'documentDetail/getDocumentDetails',
      getBuddyTypes: 'shared/getBuddyTypes',
      getBuddyEmployees: 'shared/getBuddyEmployees',
      getBuddy: 'tasks/getBuddy'
    }),

    checkModelStatus () {
      if (!this.item.enrollment.isBuddyAssigned) {
        delete this.item.enrollment.buddyEmployee
      }
    },

    async setCompanies () {
      const organizationId = this.item.enrollment.organization.id
      await this.getCompanies(organizationId)
      await this.getHrBusinessPartnerEmployees(organizationId)
      await this.getCategories(organizationId)
      this.$store.commit('widgetForm/isCompanyChanged', true)
    },

    async setWorkLocations () {
      await this.getWorkLocations(this.item.enrollment.company.id)
      if (this.item.enrollment.isBuddyAssigned) {
        await this.getBuddyEmployees(this.item.enrollment.company.id)
      }
    },

    setManager: debounce(function (data) {
      data ?
        this.$store.commit('widgetForm/manager', data) : null
    }, 500),

    getManagers: debounce(function(data) {
      return data.name.length >= 3
        ? this.getManager(data) : null
    }, 1000)
  },

  async mounted () {
    await this.getOrganizations()
    await this.getBuddyTypes()
    // fix this
    if (this.hideBuddyPage) {
      const organizationId = this.item.enrollment.organization.id
      const companyId = this.item.enrollment.company.id
      await this.getCompanies(organizationId)
      await this.getHrBusinessPartnerEmployees(organizationId)
      // await this.getBuddyEmployees(companyId)
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
  }
}
</script>

