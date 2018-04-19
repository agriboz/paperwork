<template>
  <div>

    <div class="columns">

      <div class="column">
        <b-switch v-if="search" v-model="addSearchCriteria" style="position: absolute; top: -25px; left: 180px;" @input="setSearchCriteria">
          Arama kriterlerine dahil et
        </b-switch>
        <b-field :type="$v.item.enrollment.recruitmentEmployee.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.recruitmentEmployee.$error ? 'Zorunlu alan': ''"
                 label="İşe Alım Uzmanı">
          <b-select v-model="item.enrollment.recruitmentEmployee"
                    :disabled="!search && !!widgetForm.editItem.flowId || (search && !addSearchCriteria)"
                    expanded
                    placeholder="Seçiniz...">
            <option v-for="r in shared.reqruitmentEmployees" :key="r.id" :value="r">
              {{ r.name }}
            </option>
          </b-select>
        </b-field>
        <b-field v-if="!search" :type="$v.item.enrollment.startWorkDate.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.startWorkDate.$error ? 'Zorunlu alan': ''"
                 label="İşe Başlangıç Tarihi">
          <b-datepicker
            v-model="item.enrollment.startWorkDate"
            placeholder="Seçiniz..."
            icon="calendar-today"/>
        </b-field>
        <div class="field">
          <b-switch v-model="item.enrollment.isSurveySent" :disabled="!search && !!widgetForm.editItem.flowId || (search && !addSearchCriteria)" @input="checkModelStatus(); getSurveyorEmployees(item.enrollment.organization.id, '')">
            Anket Gönderildi
          </b-switch>
        </div>
        <b-message v-if="(!search && item.enrollment.isSurveySent && !item.enrollment.organization.id)" type="is-info">
          Anket Gönderilen Yönetici seçmek için bir sonraki adımdan <strong>Organizasyon</strong> seçmelisiniz.
        </b-message>
        <b-field v-if="!search && item.enrollment.isSurveySent && shared.surveyorEmployees.length"
                 :type="$v.item.enrollment.surveyorEmployee.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.surveyorEmployee.$error ? 'Zorunlu alan': ''"
                 label="Anket Gönderilen Yönetici">
          <b-select v-model="item.enrollment.surveyorEmployee"
                    :disabled="!search && !!widgetForm.editItem.flowId"
                    placeholder="Seçiniz..."
                    expanded>
            <option v-for="r in shared.surveyorEmployees" :key="r.id" :value="r" :disabled="!search && !!widgetForm.editItem.flowId">
              {{ r.name }}
            </option>
          </b-select>
        </b-field>
        <div class="field">
          <b-switch v-model="item.enrollment.isTookEngilshExam" :disabled="!search && !!widgetForm.editItem.flowId || (search && !addSearchCriteria)">
            İngilizce Sınavı Yapıldı
          </b-switch>
        </div>
        <div class="field">
          <b-switch v-model="item.enrollment.isExistsPersonalPrivateHealthInsurance" :disabled="!search && !!widgetForm.editItem.flowId || (search && !addSearchCriteria)">
            Özel sağlık sigortası var mı?
          </b-switch>
        </div>
        <div class="field">
          <b-switch v-model="item.enrollment.isHealthInsuranceIncludeFamily" :disabled="!search && !!widgetForm.editItem.flowId || (search && !addSearchCriteria)">
            Aileyi kapsıyor mu?
          </b-switch>
        </div>
        <div v-if="!search" class="field">
          <b-switch v-model="item.enrollment.isSendWelcomeKit" :disabled="!search && !!widgetForm.editItem.flowId" @input="checkModelStatus" >
            Hoşgeldin kiti gönderilecek mi?
          </b-switch>
        </div>
        <b-field v-if="!search && item.enrollment.isSendWelcomeKit"
                 :type="$v.item.enrollment.welcomeKitType.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.welcomeKitType.$error ? 'Zorunlu alan': ''"
                 label="Kit Tipi">
          <b-select v-model="item.enrollment.welcomeKitType"
                    :disabled="!search && !!widgetForm.editItem.flowId"
                    placeholder="Seçiniz..."
                    expanded>
            <option v-for="w in shared.welcomeKitTypes" :key="w.id" :value="w" :disabled="!search && !!widgetForm.editItem.flowId">
              {{ w.name }}
            </option>
          </b-select>
        </b-field>
        <b-field v-if="!search" label="Duyuru Detayı">
          <b-input v-model="item.enrollment.announcementDetail"
                   :disabled="!search && !!widgetForm.editItem.flowId"
                   type="textarea"
                   minlength="10"
                   maxlength="300"
                   placeholder="Duyuru Detayı"/>
        </b-field>
      </div>
      <div class="column">
        <div class="field">
          <b-switch v-model="item.enrollment.isDoctorAppointmentSet" :disabled="!search && !!widgetForm.editItem.flowId || (search && !addSearchCriteria)">
            Hekim randevusu verildi mi?
          </b-switch>
        </div>
        <div class="field">
          <b-switch v-model="item.enrollment.isDisabled" :disabled="!search && !!widgetForm.editItem.flowId || (search && !addSearchCriteria)">
            Engelli personel mi?
          </b-switch>
        </div>
        <div class="field">
          <b-switch v-model="item.enrollment.isRetired" :disabled="!search && !!widgetForm.editItem.flowId || (search && !addSearchCriteria)">
            Emekli
          </b-switch>
        </div>
        <div class="field">
          <b-switch v-model="item.enrollment.isFormerWorker" :disabled="!search && !!widgetForm.editItem.flowId || (search && !addSearchCriteria)">
            Eski Çalışan
          </b-switch>
        </div>
        <div class="field">
          <b-switch v-model="item.enrollment.isOutsourceTransfer" :disabled="!search && !!widgetForm.editItem.flowId || (search && !addSearchCriteria)" @input="checkOutSource">
            Taşeron Firma Geçişi
          </b-switch>
        </div>
        <b-field v-if="item.enrollment.isOutsourceTransfer"
                 :type="$v.item.enrollment.outsourceTransferCompany.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.outsourceTransferCompany.$error ? 'Zorunlu alan': ''"
                 label="Taşeron Firma Adı">
          <b-input v-model="item.enrollment.outsourceTransferCompany" :disabled="!search && !!widgetForm.editItem.flowId" />
        </b-field>
        <!-- <b-field v-if="item.enrollment.isOutsourceTransfer"
                 :type="$v.item.enrollment.startWorkDateBegin.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.startWorkDateBegin.$error ? 'Zorunlu alan': ''"
                 label="İşe Giriş Başlangıç Tarihi ">
          <b-datepicker v-model="item.enrollment.startWorkDateBegin"
                        placeholder="Seçiniz..."
                        icon="calendar-today"/>
        </b-field>
        <b-field v-if="item.enrollment.isOutsourceTransfer"
                 :type="$v.item.enrollment.startWorkDateEnd.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.startWorkDateEnd.$error ? 'Zorunlu alan': ''"
                 label="İşe Giriş Bitiş Tarihi ">
          <b-datepicker v-model="item.enrollment.startWorkDateEnd"
                        placeholder="Seçiniz..."
                        icon="calendar-today"/>
        </b-field> -->
        <b-field v-if="item.enrollment.isOutsourceTransfer"
                 :type="$v.item.enrollment.seniorityStartDate.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.seniorityStartDate.$error ? 'Zorunlu alan': ''"
                 label="Kıdem Başlangıç Tarihi">
          <b-datepicker v-model="item.enrollment.seniorityStartDate"
                        :disabled="!search && !!widgetForm.editItem.flowId"
                        placeholder="Seçiniz..."
                        icon="calendar-today"/>
        </b-field>
        <b-field v-if="search && item.enrollment.isOutsourceTransfer"
                 label="Kıdem Başlangıç Bitiş Tarihi">
          <b-datepicker v-model="item.enrollment.seniorityStartDateBegin"
                        :disabled="!search && !!widgetForm.editItem.flowId"
                        placeholder="Seçiniz..."
                        icon="calendar-today"/>
        </b-field>
        <b-field v-if="search && item.enrollment.isOutsourceTransfer"
                 label="Kıdem Başlangıç Bitiş Tarihi">
          <b-datepicker v-model="item.enrollment.seniorityStartDateEnd"
                        :disabled="!search && !!widgetForm.editItem.flowId"
                        placeholder="Seçiniz..."
                        icon="calendar-today"/>
        </b-field>
        <b-field v-if="item.enrollment.isOutsourceTransfer && !search"
                 :type="$v.item.enrollment.leaveDate.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.leaveDate.$error ? 'Zorunlu alan': ''"
                 label="Çıkış Tarihi">
          <b-datepicker v-model="item.enrollment.leaveDate"
                        :disabled="!search && !!widgetForm.editItem.flowId"
                        placeholder="Seçiniz..."
                        icon="calendar-today"/>
        </b-field>
        <b-field v-if="search && item.enrollment.isOutsourceTransfer"
                 label="Çıkış Başlangıç Tarihi">
          <b-datepicker v-model="item.enrollment.leaveDateEndBegin"
                        :disabled="!search && !!widgetForm.editItem.flowId"
                        placeholder="Seçiniz..."
                        icon="calendar-today"/>
        </b-field>
        <b-field v-if="search && item.enrollment.isOutsourceTransfer"
                 label="Çıkış Bitiş Tarihi">
          <b-datepicker v-model="item.enrollment.leaveDateEnd"
                        :disabled="!search && !!widgetForm.editItem.flowId"
                        placeholder="Seçiniz..."
                        icon="calendar-today"/>
        </b-field>
        <b-field v-if="item.enrollment.isOutsourceTransfer"
                 :type="$v.item.enrollment.transferDate.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.transferDate.$error ? 'Zorunlu alan': ''"
                 label="Haklarıyla Devir Tarihi">
          <b-datepicker v-model="item.enrollment.transferDate"
                        :disabled="!search && !!widgetForm.editItem.flowId"
                        placeholder="Seçiniz..."
                        icon="calendar-today"/>
        </b-field>
        <b-field v-if="search && item.enrollment.isOutsourceTransfer"
                 label="Haklarıyla Devir Başlangıç Tarihi">
          <b-datepicker v-model="item.enrollment.transferDateBegin"
                        :disabled="!search && !!widgetForm.editItem.flowId"
                        placeholder="Seçiniz..."
                        icon="calendar-today"/>
        </b-field>
        <b-field v-if="search && item.enrollment.isOutsourceTransfer"
                 label="Haklarıyla Devir Bitiş Tarihi">
          <b-datepicker v-model="item.enrollment.transferDateEnd"
                        :disabled="!search && !!widgetForm.editItem.flowId"
                        placeholder="Seçiniz..."
                        icon="calendar-today"/>
        </b-field>
        <b-field grouped>
          <b-field v-if="item.enrollment.isOutsourceTransfer"
                   :type="$v.item.enrollment.leaveDayCostBegin.$error ? 'is-danger' : ''"
                   :message="$v.item.enrollment.leaveDayCostBegin.$error ? 'Zorunlu alan': ''"
                   label="İzin Yükü"
                   expanded>

            <b-field>
              <b-input v-if="!search" v-model="item.enrollment.leaveDayCost"
                       :disabled="!search && !!widgetForm.editItem.flowId"
                       placeholder="İzin Yükü"
                       type="number"
                       min="1"
                       max="99"
                       style="width:30%" />
              <b-input v-if="search && item.enrollment.isOutsourceTransfer" v-model="item.enrollment.leaveDayCostBegin"
                       placeholder="İzin Yükü"
                       type="number"
                       min="1"
                       max="99" style="width:30%"/>
              <b-input v-if="search && item.enrollment.isOutsourceTransfer" v-model="item.enrollment.leaveDayCostEnd"
                       placeholder="İzin Yükü"
                       type="number"
                       min="1"
                       max="99" style="width:30%"/>

            </b-field>
          </b-field>
        </b-field>
        <b-field v-if="!search" label="Diğer Notlar">
          <b-input v-model="item.enrollment.otherNotes"
                   :disabled="!search && !!widgetForm.editItem.flowId"
                   type="textarea"
                   minlength="10"
                   maxlength="300"
                   placeholder="Diğer Notlar"/>
        </b-field>

        <span>{{ isSecondTabInValid }}</span>
      </div>

    </div>
    <div v-if="!search" class="field is-grouped">
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
import { mapState, mapActions } from 'vuex'
import { required, requiredIf } from 'vuelidate/lib/validators'
import { formValidation } from '../../../common'

export default {
  props: ['search', 'item', 'edit'],
  data: () => ({
    addSearchCriteria: false
  }),
  validations: {
    item: {
      enrollment: {
        recruitmentEmployee: {
          required
        },
        startWorkDate: {
          required
        },
        surveyorEmployee: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isSurveySent
          })
        },
        welcomeKitType: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isSendWelcomeKit
          })
        },
        seniorityStartDate: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDate: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        transferDate: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        outsourceTransferCompany: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDayCostBegin: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDayCostEnd: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        }
      }
    }
  },
  computed: {
    ...mapState(['shared', 'widgetForm']),

    isSecondTabInValid() {
      return this.$store.commit(
        'widgetForm/isSecondTabInValid',
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
    },

    isCompanyChanged() {
      return this.$store.state.widgetForm.isCompanyChanged
        ? (this.getReqruitmentEmployees(),
          this.$store.commit('widgetForm/isCompanyChanged', false))
        : null
    }
  },
  beforeMount() {
    this.getWelcomeKitTypes()
    this.getReqruitmentEmployees()
    if (this.edit) {
      this.getSurveyorEmployees(this.item.enrollment.organization.id, '')
    }
  },
  methods: {
    setSearchCriteria() {
      const data = [
        'isSurveySent',
        'isTookEngilshExam',
        'IsExistsPersonalPrivateHealthInsurance',
        'isHealthInsuranceIncludeFamily',
        'isSendWelcomeKit',
        'isDisabled',
        'isRetired',
        'isFormerWorker',
        'isOutsourceTransfer',
        'isDoctorAppointmentSet'
      ]
      const fields = status => {
        for (let d of data) {
          this.widgetForm.item.enrollment[d] = status
        }
      }

      const removeFields = () => {
        for (let d of data) {
          delete this.widgetForm.item.enrollment[d]
        }
      }

      return this.addSearchCriteria ? fields(false) : removeFields()
    },
    getSurveyorEmployees(organizationId, name) {
      const payload = { organizationId, name }
      if (organizationId) {
        this.$store.dispatch('shared/getSurveyorEmployees', payload)
      }
    },
    updateEmployment(payload) {
      this.$store.dispatch('widgetForm/updateEmployment', payload)
    },
    ...mapActions({
      getReqruitmentEmployees: 'shared/getReqruitmentEmployees',
      getWelcomeKitTypes: 'shared/getWelcomeKitTypes'
    }),

    saveAsDraft() {
      return this.edit
        ? this.$store.dispatch('widgetForm/updateAsDraft')
        : this.$store.dispatch('widgetForm/saveAsDraft')
    },

    startEmployment(payload) {
      formValidation(this.widgetForm)
      this.$v.item.enrollment.$touch()
      if (!this.$v.$invalid) {
        this.$store.dispatch('widgetForm/startEmployment', payload)
      }
    },

    checkModelStatus() {
      if (!this.item.enrollment.isSendWelcomeKit) {
        delete this.item.enrollment.welcomeKitType
      }

      if (this.item.enrollment.isSendWelcomeKit) {
        this.item.enrollment.welcomeKitType = this.shared.welcomeKitTypes[0]
      }
    },
    checkOutSource() {
      if (!this.item.enrollment.isOutsourceTransfer) {
        console.log(this.item.enrollment.isOutsourceTransfer)
        delete this.item.enrollment.startWorkDate
        delete this.item.enrollment.seniorityStartDate
        delete this.item.enrollment.leaveDayCost
        delete this.item.enrollment.outsourceTransferCompany
      }
    }
  }
}
</script>

<style>
.b-tabs .tab-content {
  overflow: visible;
}
</style>
