<template>
  <div class="columns">
    <div class="column">
      <b-field label="İşe Alım Uzmanı"
               :type="$v.item.enrollment.recruitmentEmployee.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.recruitmentEmployee.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..."
                  @input="$v.item.enrollment.recruitmentEmployee.$touch()"
                  v-model="item.enrollment.recruitmentEmployee" expanded>
          <option :key="r.id" :value="r" v-for="r in shared.reqruitmentEmployees">
            {{r.name}}
          </option>
        </b-select>
      </b-field>

      <b-field label="İşe Başlangıç Tarihi"
               :type="$v.item.enrollment.startWorkDate.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.startWorkDate.$error ? 'Zorunlu alan': ''">
        <b-datepicker
          @input="$v.item.enrollment.startWorkDate.$touch()"
          v-model="item.enrollment.startWorkDate"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>

      <div class="field">
        <b-switch v-model="item.enrollment.isSurveySent" @input="checkModelStatus">
          Anket Gönderildi
        </b-switch>
      </div>
      <b-field label="Anket Gönderilen Yönetici"
               :type="$v.item.enrollment.channel.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.channel.$error ? 'Zorunlu alan': ''"
               v-if="!search && item.enrollment.isSurveySent">
        <b-select placeholder="Seçiniz..."
                  @input="$v.item.enrollment.channel.$touch()"
                  v-model="item.enrollment.channel" expanded>
          <option>
            Sms
          </option>
        </b-select>
      </b-field>
      <div class="field" v-if="!search">
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
      <div class="field" v-if="!search">
        <b-switch v-model="item.enrollment.isSendWelcomeKit" @input="checkModelStatus">
          Hoşgeldin kiti gönderilecek mi?
        </b-switch>
      </div>
      <b-field label="Kit Tipi"
               :type="$v.item.enrollment.welcomeKitType.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.welcomeKitType.$error ? 'Zorunlu alan': ''"
               v-if="!search && item.enrollment.isSendWelcomeKit">
        <b-select placeholder="Seçiniz..."
                  v-model="item.enrollment.welcomeKitType"
                  @input="$v.item.enrollment.welcomeKitType.$touch()" expanded>
          <option :key="w.id" :value="w" v-for="w in shared.welcomeKitTypes">
            {{w.name}}
          </option>
        </b-select>
      </b-field>
      <b-field label="Duyuru Detayı" v-if="!search">
        <b-input type="textarea"
                 v-model="item.enrollment.announcementDetail"
                 minlength="10"
                 maxlength="300"
                 placeholder="Duyuru Detayı">
        </b-input>
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
      <b-field label="Taşeron Firma Adı"
               :type="$v.item.enrollment.outSourceTransferCompany.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.outSourceTransferCompany.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-input v-model="item.enrollment.outSourceTransferCompany"
                 @input="$v.item.enrollment.outSourceTransferCompany.$touch()" ></b-input>
      </b-field>
      <b-field label="İşe Giriş Başlangıç Tarihi "
               :type="$v.item.enrollment.startWorkDateBegin.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.startWorkDateBegin.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-datepicker
          @input="$v.item.enrollment.startWorkDateBegin.$touch()"
          v-model="item.enrollment.startWorkDateBegin"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="İşe Giriş Bitiş Tarihi "
               :type="$v.item.enrollment.startWorkDateEnd.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.startWorkDateEnd.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-datepicker
          @input="$v.item.enrollment.startWorkDateEnd.$touch()"
          v-model="item.enrollment.startWorkDateEnd"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Kıdem Başlangıç Tarihi"
               :type="$v.item.enrollment.seniorityStartDateBegin.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.seniorityStartDateBegin.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-datepicker
          @input="$v.item.enrollment.seniorityStartDateBegin.$touch()"
          v-model="item.enrollment.seniorityStartDateBegin"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Kıdem Başlangıç Bitiş Tarihi"
               :type="$v.item.enrollment.seniorityStartDateEnd.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.seniorityStartDateEnd.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-datepicker
          @input="$v.item.enrollment.seniorityStartDateEnd.$touch()"
          v-model="item.enrollment.seniorityStartDateEnd"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Çıkış Tarihi"
               :type="$v.item.enrollment.leaveDateBegin.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.leaveDateBegin.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-datepicker
          @input="$v.item.enrollment.leaveDateBegin.$touch()"
          v-model="item.enrollment.leaveDateBegin"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Çıkış Tarihi"
               :type="$v.item.enrollment.leaveDateEnd.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.leaveDateEnd.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-datepicker
          @input="$v.item.enrollment.leaveDateEnd.$touch()"
          v-model="item.enrollment.leaveDateEnd"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Haklarıyla Devir Başlangıç Tarihi"
               :type="$v.item.enrollment.transferDateBegin.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.transferDateBegin.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-datepicker
          @input="$v.item.enrollment.transferDateBegin.$touch()"
          v-model="item.enrollment.transferDateBegin"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Haklarıyla Devir Bitiş Tarihi"
               :type="$v.item.enrollment.transferDateEnd.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.transferDateEnd.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-datepicker
          @input="$v.item.enrollment.transferDateEnd.$touch()"
          v-model="item.enrollment.transferDateEnd"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field grouped>
        <b-field label="İzin Yükü"
                 :type="$v.item.enrollment.leaveDayCostBegin.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.leaveDayCostBegin.$error ? 'Zorunlu alan': ''"
                 expanded
                 v-if="item.enrollment.isOutsourceTransfer">

          <b-field>
            <b-input placeholder="İzin Yükü Başlangıç Tarihi"
                     @input="$v.item.enrollment.leaveDayCostBegin.$touch()"
                     v-model="item.enrollment.leaveDayCostBegin"
                     type="number"
                     min="1"
                     max="99">
            </b-input>
            <b-input placeholder="İzin Yükü Bitiş Tarihi"
                     @input="$v.item.enrollment.leaveDayCostEnd.$touch()"
                     v-model="item.enrollment.leaveDayCostEnd"
                     type="number"
                     min="1"
                     max="99">
            </b-input>

          </b-field>
        </b-field>
      </b-field>
      <b-field label="Diğer Notlar" v-if="!search">
        <b-input type="textarea"

                 v-model="item.enrollment.otherNotes"
                 minlength="10"
                 maxlength="300"
                 placeholder="Diğer Notlar">
        </b-input>
      </b-field>
      <span>{{isSecondTabInValid}}</span>
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
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isSurveySent
          })
        },
        welcomeKitType: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isSendWelcomeKit
          })
        },
        seniorityStartDateBegin: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isOutsourceTransfer
          })
        },
        seniorityStartDateEnd: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDateBegin: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDateEnd: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isOutsourceTransfer
          })
        },
        transferDateBegin: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isOutsourceTransfer
          })
        },
        transferDateEnd: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDayCostBegin: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDayCostBeginEnd: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isOutsourceTransfer
          })
        },
        startWorkDateBegin: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isOutsourceTransfer
          })
        },
        startWorkDateEnd: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isOutsourceTransfer
          })
        },
        outSourceTransferCompany: {
          requiredIf: requiredIf((vueInstance) => {
            return vueInstance.isOutsourceTransfer
          })
        }
      }
    }
  },
  computed: {
    ...mapState(['shared']),

    isSecondTabInValid () {
      return this.$store.commit('widgetForm/isSecondTabInValid', this.$v.$invalid)
    },

    isCompanyChanged () {
      return this.$store.state.widgetForm.isCompanyChanged
        ? (this.getReqruitmentEmployees(), this.$store.commit('widgetForm/isCompanyChanged', false)) : null
    },


  },
  methods: {
    ...mapActions({
      getReqruitmentEmployees: 'shared/getReqruitmentEmployees',
      getWelcomeKitTypes: 'shared/getWelcomeKitTypes'
    }),

    checkModelStatus () {
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
  },

  mounted () {
    this.getWelcomeKitTypes()
    this.getReqruitmentEmployees()
  }

}
</script>

<style>
.b-tabs .tab-content {
  overflow: visible
}
</style>
