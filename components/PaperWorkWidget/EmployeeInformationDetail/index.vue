<template>
  <div class="columns">
    <div class="column">
      <b-field :type="$v.item.enrollment.recruitmentEmployee.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.recruitmentEmployee.$error ? 'Zorunlu alan': ''"
               label="İşe Alım Uzmanı">
        <b-select v-model="item.enrollment.recruitmentEmployee" expanded
                  placeholder="Seçiniz..."
                  @input="$v.item.enrollment.recruitmentEmployee.$touch()">
          <option v-for="r in shared.reqruitmentEmployees" :key="r.id" :value="r">
            {{ r.name }}
          </option>
        </b-select>
      </b-field>

      <b-field :type="$v.item.enrollment.startWorkDate.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.startWorkDate.$error ? 'Zorunlu alan': ''"
               label="İşe Başlangıç Tarihi">
        <b-datepicker
          v-model="item.enrollment.startWorkDate"
          placeholder="Seçiniz..."
          icon="calendar-today"
          @input="$v.item.enrollment.startWorkDate.$touch()"/>
      </b-field>

      <div class="field">
        <b-switch v-model="item.enrollment.isSurveySent" @input="checkModelStatus(); getSurveyorEmployees()">
          Anket Gönderildi
        </b-switch>
      </div>
      <b-message v-if="(!search && item.enrollment.isSurveySent)" type="is-info">
        Anket Gönderilen Yönetici seçmek için bir sonraki adımdan <strong>Organizasyon</strong> seçmelisiniz.
      </b-message>
      <b-field v-if="!search && item.enrollment.isSurveySent"
               :type="$v.item.enrollment.surveyorEmployee.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.surveyorEmployee.$error ? 'Zorunlu alan': ''"
               label="Anket Gönderilen Yönetici">
        <b-select v-model="item.enrollment.surveyorEmployee"
                  placeholder="Seçiniz..."
                  expanded
                  @input="$v.item.enrollment.surveyorEmployee.$touch()">
          <option v-for="r in shared.surveyorEmployees" :key="r.id" :value="r">
            {{ r.name }}
          </option>
        </b-select>
      </b-field>
      <div v-if="!search" class="field">
        <b-switch v-model="item.enrollment.isTookEngilshExam">
          İngilizce Sınavı Yapıldı
        </b-switch>
      </div>
      <div class="field">
        <b-switch v-model="item.enrollment.isExistsPersonalPrivateHealthInsurance">
          Özel sağlık sigortası var mı?
        </b-switch>
      </div>
      <div class="field">
        <b-switch v-model="item.enrollment.isHealthInsuranceIncludeFamily">
          Aileyi kapsıyor mu?
        </b-switch>
      </div>
      <div v-if="!search" class="field">
        <b-switch v-model="item.enrollment.isSendWelcomeKit" @input="checkModelStatus">
          Hoşgeldin kiti gönderilecek mi?
        </b-switch>
      </div>
      <b-field v-if="!search && item.enrollment.isSendWelcomeKit"
               :type="$v.item.enrollment.welcomeKitType.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.welcomeKitType.$error ? 'Zorunlu alan': ''"
               label="Kit Tipi">
        <b-select v-model="item.enrollment.welcomeKitType"
                  placeholder="Seçiniz..."
                  expanded
                  @input="$v.item.enrollment.welcomeKitType.$touch()">
          <option v-for="w in shared.welcomeKitTypes" :key="w.id" :value="w">
            {{ w.name }}
          </option>
        </b-select>
      </b-field>
      <b-field v-if="!search" label="Duyuru Detayı">
        <b-input v-model="item.enrollment.announcementDetail"
                 type="textarea"
                 minlength="10"
                 maxlength="300"
                 placeholder="Duyuru Detayı"/>
      </b-field>
    </div>
    <div class="column">
      <div class="field">
        <b-switch v-model="item.enrollment.isDoctorAppointmentSet">
          Hekim randevusu verildi mi?
        </b-switch>
      </div>
      <div class="field">
        <b-switch v-model="item.enrollment.isDisabled">
          Engelli personel mi?
        </b-switch>
      </div>
      <div class="field">
        <b-switch v-model="item.enrollment.isRetired">
          Emekli
        </b-switch>
      </div>
      <div class="field">
        <b-switch v-model="item.enrollment.isFormerWorker">
          Eski Çalışan
        </b-switch>
      </div>
      <div class="field">
        <b-switch v-model="item.enrollment.isOutsourceTransfer" @input="checkModelStatus">
          Taşeron Firma Geçişi
        </b-switch>
      </div>
      <b-field v-if="item.enrollment.isOutsourceTransfer"
               :type="$v.item.enrollment.outSourceTransferCompany.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.outSourceTransferCompany.$error ? 'Zorunlu alan': ''"
               label="Taşeron Firma Adı">
        <b-input v-model="item.enrollment.outSourceTransferCompany"
                 @input="$v.item.enrollment.outSourceTransferCompany.$touch()" />
      </b-field>
      <b-field v-if="item.enrollment.isOutsourceTransfer"
               :type="$v.item.enrollment.startWorkDateBegin.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.startWorkDateBegin.$error ? 'Zorunlu alan': ''"
               label="İşe Giriş Başlangıç Tarihi ">
        <b-datepicker v-model="item.enrollment.startWorkDateBegin"
                      placeholder="Seçiniz..."
                      icon="calendar-today"
                      @input="$v.item.enrollment.startWorkDateBegin.$touch()"/>
      </b-field>
      <b-field v-if="item.enrollment.isOutsourceTransfer"
               :type="$v.item.enrollment.startWorkDateEnd.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.startWorkDateEnd.$error ? 'Zorunlu alan': ''"
               label="İşe Giriş Bitiş Tarihi ">
        <b-datepicker v-model="item.enrollment.startWorkDateEnd"
                      placeholder="Seçiniz..."
                      icon="calendar-today"
                      @input="$v.item.enrollment.startWorkDateEnd.$touch()"/>
      </b-field>
      <b-field v-if="item.enrollment.isOutsourceTransfer"
               :type="$v.item.enrollment.seniorityStartDateBegin.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.seniorityStartDateBegin.$error ? 'Zorunlu alan': ''"
               label="Kıdem Başlangıç Tarihi">
        <b-datepicker v-model="item.enrollment.seniorityStartDateBegin"
                      placeholder="Seçiniz..."
                      icon="calendar-today"
                      @input="$v.item.enrollment.seniorityStartDateBegin.$touch()"/>
      </b-field>
      <b-field v-if="item.enrollment.isOutsourceTransfer"
               :type="$v.item.enrollment.seniorityStartDateEnd.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.seniorityStartDateEnd.$error ? 'Zorunlu alan': ''"
               label="Kıdem Başlangıç Bitiş Tarihi">
        <b-datepicker v-model="item.enrollment.seniorityStartDateEnd"
                      placeholder="Seçiniz..."
                      icon="calendar-today"
                      @input="$v.item.enrollment.seniorityStartDateEnd.$touch()"/>
      </b-field>
      <b-field v-if="item.enrollment.isOutsourceTransfer"
               :type="$v.item.enrollment.leaveDateBegin.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.leaveDateBegin.$error ? 'Zorunlu alan': ''"
               label="Çıkış Tarihi">
        <b-datepicker v-model="item.enrollment.leaveDateBegin"
                      placeholder="Seçiniz..."
                      icon="calendar-today"
                      @input="$v.item.enrollment.leaveDateBegin.$touch()"/>
      </b-field>
      <b-field v-if="item.enrollment.isOutsourceTransfer"
               :type="$v.item.enrollment.leaveDateEnd.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.leaveDateEnd.$error ? 'Zorunlu alan': ''"
               label="Çıkış Tarihi">
        <b-datepicker v-model="item.enrollment.leaveDateEnd"
                      placeholder="Seçiniz..."
                      icon="calendar-today"
                      @input="$v.item.enrollment.leaveDateEnd.$touch()"/>
      </b-field>
      <b-field v-if="item.enrollment.isOutsourceTransfer"
               :type="$v.item.enrollment.transferDateBegin.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.transferDateBegin.$error ? 'Zorunlu alan': ''"
               label="Haklarıyla Devir Başlangıç Tarihi">
        <b-datepicker v-model="item.enrollment.transferDateBegin"
                      placeholder="Seçiniz..."
                      icon="calendar-today"
                      @input="$v.item.enrollment.transferDateBegin.$touch()"/>
      </b-field>
      <b-field v-if="item.enrollment.isOutsourceTransfer"
               :type="$v.item.enrollment.transferDateEnd.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.transferDateEnd.$error ? 'Zorunlu alan': ''"
               label="Haklarıyla Devir Bitiş Tarihi">
        <b-datepicker v-model="item.enrollment.transferDateEnd"
                      placeholder="Seçiniz..."
                      icon="calendar-today"
                      @input="$v.item.enrollment.transferDateEnd.$touch()" />
      </b-field>
      <b-field grouped>
        <b-field v-if="item.enrollment.isOutsourceTransfer"
                 :type="$v.item.enrollment.leaveDayCostBegin.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.leaveDayCostBegin.$error ? 'Zorunlu alan': ''"
                 label="İzin Yükü"
                 expanded>

          <b-field>
            <b-input v-model="item.enrollment.leaveDayCostBegin"
                     placeholder="İzin Yükü Başlangıç Tarihi"
                     type="number"
                     min="1"
                     max="99"
                     @input="$v.item.enrollment.leaveDayCostBegin.$touch()" />
            <b-input v-model="item.enrollment.leaveDayCostEnd"
                     placeholder="İzin Yükü Bitiş Tarihi"
                     type="number"
                     min="1"
                     max="99"
                     @input="$v.item.enrollment.leaveDayCostEnd.$touch()"/>

          </b-field>
        </b-field>
      </b-field>
      <b-field v-if="!search" label="Diğer Notlar">
        <b-input v-model="item.enrollment.otherNotes"
                 type="textarea"
                 minlength="10"
                 maxlength="300"
                 placeholder="Diğer Notlar"/>
      </b-field>
      <span>{{ isSecondTabInValid }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, requiredIf } from 'vuelidate/lib/validators'

export default {
  props: ['search', 'item', 'edit'],

  validations: {
    item: {
      enrollment: {
        recruitmentEmployee: {
          required
        },
        startWorkDate: {
          required
        },
        channel: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isSurveySent
          })
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
        seniorityStartDateBegin: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        seniorityStartDateEnd: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDateBegin: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDateEnd: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        transferDateBegin: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        transferDateEnd: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDayCostBegin: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDayCostBeginEnd: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        startWorkDateBegin: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        startWorkDateEnd: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        },
        outSourceTransferCompany: {
          requiredIf: requiredIf(vueInstance => {
            return vueInstance.isOutsourceTransfer
          })
        }
      }
    }
  },
  computed: {
    ...mapState(['shared']),

    isSecondTabInValid() {
      return this.$store.commit(
        'widgetForm/isSecondTabInValid',
        this.$v.$invalid
      )
    },

    isCompanyChanged() {
      return this.$store.state.widgetForm.isCompanyChanged
        ? (this.getReqruitmentEmployees(),
          this.$store.commit('widgetForm/isCompanyChanged', false))
        : null
    }
  },
  mounted() {
    this.getWelcomeKitTypes()
    this.getReqruitmentEmployees()
  },
  methods: {
    ...mapActions({
      getReqruitmentEmployees: 'shared/getReqruitmentEmployees',
      getWelcomeKitTypes: 'shared/getWelcomeKitTypes',
      getSurveyorEmployees: 'shared/getSurveyorEmployees'
    }),

    checkModelStatus() {
      if (!this.item.enrollment.isSurveySent) {
        delete this.item.enrollment.channel
      }

      if (!this.item.enrollment.isSendWelcomeKit) {
        delete this.item.enrollment.welcomeKitType
      }

      if (this.item.enrollment.isSendWelcomeKit) {
        this.item.enrollment.welcomeKitType = this.shared.welcomeKitTypes[0]
      }

      if (!this.item.enrollment.isOutsourceTransfer) {
        delete this.item.enrollment.startWorkDateBegin
        delete this.item.enrollment.startWorkDateEnd
        delete this.item.enrollment.seniorityStartDateBegin
        delete this.item.enrollment.seniorityStartDateEnd
        delete this.item.enrollment.leaveDateBegin
        delete this.item.enrollment.leaveDateEnd
        delete this.item.enrollment.leaveDayCostBegin
        delete this.item.enrollment.leaveDayCostEnd
        delete this.item.enrollment.outSourceTransferCompany
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
