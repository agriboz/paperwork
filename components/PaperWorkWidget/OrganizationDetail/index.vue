<template>
  <div>
    <div class="columns">
      <div class="column">
        <b-field :type="$v.item.enrollment.organization.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.organization.$error ? 'Zorunlu alan': ''"
                 label="Organizasyon">
          <b-select v-model="item.enrollment.organization"
                    :disabled="notEditable || !!widgetForm.editItem.flowId"
                    placeholder="Seçiniz..."
                    expanded
                    @input="setCompanies">
            <option v-for="o in shared.organizations" :key="o.id" :value="o">
              {{ o.name }}
            </option>
          </b-select>
        </b-field>

        <b-field :type="$v.item.enrollment.company.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.company.$error ? 'Zorunlu alan': ''"
                 label="Şirket">
          <b-select v-model="item.enrollment.company"
                    :disabled="!item.enrollment.organization.id || hideBuddyPage || !!widgetForm.editItem.flowId"
                    expanded
                    placeholder="Seçiniz..."
                    @input="setWorkLocations()">
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
                   :disabled="notEditable || !!widgetForm.editItem.flowId"/>
        </b-field>
        <b-field v-if="!search"
                 :type="$v.item.enrollment.position.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.position.$error ? 'Zorunlu alan': ''"
                 label="Pozisyon">
          <b-input v-model="item.enrollment.position"
                   :disabled="notEditable || !!widgetForm.editItem.flowId"/>
        </b-field>
        <b-field v-if="!hideBuddyPage"
                 :type="$v.item.enrollment.workLocation.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.workLocation.$error ? 'Zorunlu alan': ''"
                 label="Çalışma Lokasyonu" />
        <div v-if="!hideBuddyPage" class="field is-grouped">
          <p class="control" style="width:80%">
            <b-select v-model="item.enrollment.workLocation"
                      :disabled="!item.enrollment.company.id"
                      placeholder="Seçiniz..."
                      expanded>
              <option v-for="w in shared.workLocations" :key="w.id" :value="w">
                {{ w.name }}
              </option>
            </b-select>
          </p>
          <p v-if="!search" class="control">
            <b-switch @input="sgkLocation = !sgkLocation"/>
          </p>

          <p v-if="!search" class="control">
            <b-tooltip label="Personelin SGK lokasyonu farklı ise checkbox'ı seçmeniz gerekmektedir">
              <b-icon
                icon="information"/>
            </b-tooltip>
          </p>
        </div>

        <b-field v-if="!hideBuddyPage && !sgkLocation"
                 :type="$v.item.enrollment.sgkLocation.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.sgkLocation.$error ? 'Zorunlu alan': ''"
                 label="SGK Lokasyonu">
          <b-select v-model="item.enrollment.sgkLocation"
                    :disabled="!item.enrollment.company.id"
                    placeholder="Seçiniz..."
                    expanded>
            <option v-for="s in shared.SGKLocations" :key="s.id" :value="s">
              {{ s.name }}
            </option>
          </b-select>
        </b-field>
        <b-field v-if="!hideBuddyPage"
                 label="Kategori">
          <b-select v-model="item.enrollment.organizationDocumentCategory"
                    :disabled="!item.enrollment.organization.id || !!widgetForm.editItem.flowId"
                    placeholder="Seçiniz..."
                    expanded>
            <option v-for="c in shared.categories" :key="c.id" :value="c">
              {{ c.name }}
            </option>
          </b-select>
        </b-field>

        <b-field :type="$v.item.enrollment.hrBusinessPartnerEmployee.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.hrBusinessPartnerEmployee.$error ? 'Zorunlu alan': ''"
                 label="İKİO">
          <b-select v-model="item.enrollment.hrBusinessPartnerEmployee"
                    :disabled="!item.enrollment.company.id || hideBuddyPage || !!widgetForm.editItem.flowId"
                    expanded
                    placeholder="Seçiniz...">
            <option v-for="h in shared.hrBusinessPartnerEmployees" :key="h.id" :value="h">
              {{ h.name }}
            </option>
          </b-select>
        </b-field>

        <b-field v-if="hideBuddyPage" label="Yönetici">
          <b-input v-model="item.enrollment.manager.name" disabled/>
        </b-field>

        <b-field v-if="!edit && !hideBuddyPage"
                 label="Yönetici" >
          <b-autocomplete
            :disabled="!item.enrollment.organization.id || hideBuddyPage"
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
        <b-field v-if="edit"
                 :type="$v.item.enrollment.manager.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.manager.$error ? 'Zorunlu alan': ''" label="Yönetici">
          <b-autocomplete
            :disabled="!item.enrollment.organization || !!widgetForm.editItem.flowId"
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
        <div class="field is-grouped">
          <p class="control">
            <b-tooltip label="Buddy seçebilmek için şirket seçmelisiniz">
              <b-switch :disabled="(edit && item.enrollment.company.id === null) || notEditable || !item.enrollment.company.id" v-model="item.enrollment.isBuddyAssigned" @input="getBuddyEmployees(item.enrollment.company.id); checkModelStatus()">
                Buddy Olacak
              </b-switch>
            </b-tooltip>
          </p>
          <p v-if="!item.enrollment.isBuddyAssigned" class="control">
            <b-tooltip label="Müdür altı veya Müdür üstü seçeneklerinden biri seçilmek zorundadır">
              <b-icon
                icon="information"/>
            </b-tooltip>
          </p>
        </div>
        <b-field label="Müdür Üstü ve Müdür Altı"/>
        <div v-for="b in shared.buddyTypes" :key="b.id" class="block">
          <b-radio v-model="item.enrollment.buddyType" :type="$v.item.enrollment.buddyType.$error ? 'is-danger' : ''"
                   :message="$v.item.enrollment.buddyType.$error ? 'Zorunlu alan': ''" :disabled="item.enrollment.isBuddyAssigned || notEditable"
                   :native-value="b">
            {{ b.name }}
          </b-radio>
        </div>
        <div v-if="item.enrollment.isBuddyAssigned && item.enrollment.company"
             class="form-wrapper" title="Buddy Bilgileri" style="margin-top:40px">
          <b-field :type="$v.item.enrollment.buddyEmployee.$error ? 'is-danger' : ''"
                   :message="$v.item.enrollment.buddyEmployee.$error ? 'Zorunlu alan': ''"
                   label="Buddy">
            <b-select v-model="item.enrollment.buddyEmployee"
                      :disabled="!item.enrollment.isBuddyAssigned"
                      placeholder="Seçiniz..."
                      expanded
                      @input="getBuddy(item.enrollment.buddyEmployee.id)">
              <option v-for="b in shared.buddyEmployees" :key="b.id" :value="b">
                {{ b.name }}
              </option>
            </b-select>
          </b-field>
          <div v-if="tasks.buddyInformation && item.enrollment.buddyEmployee">
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
      <p v-if="widgetForm.editItem.flowId && widgetForm.editItem.ebaStatus.id <= 3" class="control">
        <button type="submit"
                class="button is-primary"
                @click="updateEmployment(item)">Güncelle</button>
      </p>
    </div>
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
import { formValidation, checkEmptyDropDown } from '../../../common'
const editing = (item, fn) => (item ? fn(item) : [])
export default {
  props: ['search', 'item', 'edit', 'notEditable', 'hideBuddyPage'],
  data: () => ({
    name: '',
    sgkLocation: true
  }),
  computed: {
    ...mapState(['shared', 'tasks', 'widgetForm']),
    isThirdTabInValid() {
      return this.$store.commit(
        'widgetForm/isThirdTabInValid',
        this.$v.$invalid
      )
    },
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
    }
  },

  validations: {
    item: {
      enrollment: {
        organization: {
          checkEmptyDropDown
        },
        company: {
          checkEmptyDropDown
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

        hrBusinessPartnerEmployee: {
          checkEmptyDropDown
        },
        manager: {
          checkEmptyDropDown
        },
        buddyType: {
          requiredIf: requiredIf(vueInstance => {
            return !vueInstance.isBuddyAssigned
          })
        },
        buddyEmployee: {
          required,
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isBuddyAssigned
          })
        }
      }
    }
  },
  beforeMount() {
    this.getOrganizations()
    this.getBuddyTypes()
    // fix this

    if (this.hideBuddyPage) {
      const organizationId = this.item.enrollment.organization.id
      editing(organizationId, this.getCompanies)
      editing(organizationId, this.getHrBusinessPartnerEmployees)
    }

    if (this.edit) {
      const organizationId = this.item.enrollment.organization.id
      const companyId = this.item.enrollment.company.id

      editing(organizationId, this.getCompanies)
      editing(organizationId, this.getCategories)
      editing(organizationId, this.getHrBusinessPartnerEmployees)
      editing(companyId, this.getWorkLocations)
      editing(companyId, this.getBuddyEmployees)
    }
  },
  methods: {
    updateEmployment(payload) {
      this.$store.dispatch('widgetForm/updateEmployment', payload)
    },
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

    checkModelStatus() {
      if (this.item.enrollment.isBuddyAssigned) {
        delete this.item.enrollment.buddyType
      }

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

      if (this.widgetForm.item.enrollment.isSurveySent) {
        this.$store.dispatch('shared/getSurveyorEmployees')
      }
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
