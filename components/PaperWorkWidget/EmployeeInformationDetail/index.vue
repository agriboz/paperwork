<template>
  <div class="columns">
    <div class="column">
      <b-field label="İşe Alım Uzmanı"
               :type="$v.item.enrollment.recruitmentEmployee.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.recruitmentEmployee.$error ? 'Zorunlu alan': ''">
        <b-select placeholder="Seçiniz..." @input="setItem(); $v.item.enrollment.recruitmentEmployee.$touch()" v-model="item.enrollment.recruitmentEmployee" expanded>
          <option :key="r.id" :value="r" v-for="r in shared.reqruitmentEmployees">
            {{r.name}}
          </option>
        </b-select>
      </b-field>

      <b-field label="İşe Başlangıç Tarihi"
               :type="$v.item.enrollment.startWorkDate.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.startWorkDate.$error ? 'Zorunlu alan': ''">
        <b-datepicker
          @input="setItem(); $v.item.enrollment.startWorkDate.$touch()"
          v-model="item.enrollment.startWorkDate"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>

      <div class="field">
        <b-switch v-model="item.enrollment.isSurveySent"
                  @input="setItem">
          Anket Gönderildi
        </b-switch>
      </div>
      <b-field label="Anket Gönderilen Yönetici"
               :type="$v.item.enrollment.channel.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.channel.$error ? 'Zorunlu alan': ''"
               v-if="!search && item.enrollment.isSurveySent">
        <b-select placeholder="Seçiniz..."
                  @input="setItem(); $v.item.enrollment.channel.$touch()"
                  v-model="item.enrollment.channel" expanded>
          <option>
            Sms
          </option>
        </b-select>
      </b-field>
      <div class="field" v-if="!search">
        <b-switch v-model="item.enrollment.isTookEngilshExam" @input="setItem">
          İngilizce Sınavı Yapıldı
        </b-switch>
      </div>
      <div class="field">
        <b-switch v-model="item.enrollment.isExistsPersonalPrivateHealthInsurance" @input="setItem">
          Özel sağlık sigortası var mı?
        </b-switch>
      </div>
      <div class="field">
        <b-switch v-model="item.enrollment.isHealthInsuranceIncludeFamily" @input="setItem">
          Aileyi kapsıyor mu?
        </b-switch>
      </div>
      <div class="field" v-if="!search">
        <b-switch v-model="item.enrollment.isSendWelcomeKit" @input="setItem">
          Hoşgeldin kiti gönderilecek mi?
        </b-switch>
      </div>
      <b-field label="Kit Tipi"
               :type="$v.item.enrollment.welcomeKitType.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.welcomeKitType.$error ? 'Zorunlu alan': ''"
               v-if="!search && item.enrollment.isSendWelcomeKit">
        <b-select placeholder="Seçiniz..."
                  v-model="item.enrollment.welcomeKitType"
                  @input="setItem(); $v.item.enrollment.welcomeKitType.$touch()" expanded>
          <option :key="w.id" :value="w" v-for="w in shared.welcomeKitTypes">
            {{w.name}}
          </option>
        </b-select>
      </b-field>
      <b-field label="Duyuru Detayı" v-if="!search">
        <b-input type="textarea"
                 @blur="setItem"
                 v-model="item.enrollment.announcementDetail"
                 minlength="10"
                 maxlength="300"
                 placeholder="Duyuru Detayı">
        </b-input>
      </b-field>
    </div>
    <div class="column">
      <div class="field">
        <b-switch v-model="item.enrollment.isDisabled" @input="setItem">
          Engelli personel mi?
        </b-switch>
      </div>
      <div class="field">
        <b-switch v-model="item.enrollment.isRetired" @input="setItem">
          Emekli
        </b-switch>
      </div>
      <div class="field">
        <b-switch v-model="item.enrollment.isFormerWorker" @input="setItem">
          Eski Çalışan
        </b-switch>
      </div>
      <div class="field">
        <b-switch v-model="item.enrollment.isOutsourceTransfer" @input="setItem">
          Taşeron Firma Geçişi
        </b-switch>
      </div>
      <b-field label="Kıdem Başlangıç Tarihi"
               :type="$v.item.enrollment.seniorityStartDate.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.seniorityStartDate.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-datepicker
          @input="setItem(); $v.item.enrollment.seniorityStartDate.$touch()"
          v-model="item.enrollment.seniorityStartDate"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Çıkış Tarihi"
               :type="$v.item.enrollment.leaveDate.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.leaveDate.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-datepicker
          @input="setItem(); $v.item.enrollment.leaveDate.$touch()"
          v-model="item.enrollment.leaveDate"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Haklarıyla Devir Tarihi"
               :type="$v.item.enrollment.transferDate.$error ? 'is-danger' : ''"
               :message="$v.item.enrollment.transferDate.$error ? 'Zorunlu alan': ''"
               v-if="item.enrollment.isOutsourceTransfer">
        <b-datepicker
          @input="setItem(); $v.item.enrollment.transferDate.$touch()"
          v-model="item.enrollment.transferDate"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field grouped>
        <b-field label="İzin Yükü"
                 :type="$v.item.enrollment.leaveDayCost.$error ? 'is-danger' : ''"
                 :message="$v.item.enrollment.leaveDayCost.$error ? 'Zorunlu alan': ''"
                 expanded
                 v-if="item.enrollment.isOutsourceTransfer">

          <b-field>
            <b-input placeholder="İzin Yükü"
                     @input="setItem(); $v.item.enrollment.leaveDayCost.$touch()"
                     v-model="item.enrollment.leaveDayCost"
                     type="number"
                     min="1"
                     max="99">
            </b-input>

          </b-field>
        </b-field>
      </b-field>
      <b-field label="Diğer Notlar" v-if="!search">
        <b-input type="textarea"
                 @input="setItem"
                 v-model="item.enrollment.otherNotes"
                 minlength="10"
                 maxlength="300"
                 placeholder="Diğer Notlar">
        </b-input>
      </b-field>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
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
          required
        },
        welcomeKitType: {
          requiredIf: requiredIf((vueInstance) => {
            // console.log(vueInstance)
            return vueInstance.isSendWelcomeKit
          })
        },
        seniorityStartDate: {
          requiredIf: requiredIf((vueInstance) => {
            console.log(vueInstance)
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDate: {
          requiredIf: requiredIf((vueInstance) => {
            console.log(vueInstance)
            return vueInstance.isOutsourceTransfer
          })
        },
        transferDate: {
          requiredIf: requiredIf((vueInstance) => {
            console.log(vueInstance)
            return vueInstance.isOutsourceTransfer
          })
        },
        leaveDayCost: {
          requiredIf: requiredIf((vueInstance) => {
            console.log(vueInstance)
            return vueInstance.isOutsourceTransfer
          })
        }
      }
    }
  },
  computed: {
    isCompanyChanged () {
      return this.$store.state.widgetForm.isCompanyChanged
        ? (this.getReqruitmentEmployees(), this.$store.commit('widgetForm/isCompanyChanged', false)) : null
    },
    ...mapState(['shared'])
  },
  methods: {
    ...mapActions({
      getReqruitmentEmployees: 'shared/getReqruitmentEmployees',
      getWelcomeKitTypes: 'shared/getWelcomeKitTypes'
    }),
    setItem () {
      this.$store.commit('widgetForm/canStartEmployment', this.$v.$invalid)
      this.edit
       ? this.$store.commit('widgetForm/editItem', this.item)
        : this.$store.commit('widgetForm/item', this.item)
    }
  },

  mounted () {
    this.getWelcomeKitTypes()
    this.getReqruitmentEmployees()
    this.$store.commit('widgetForm/canStartEmployment', this.$v.$invalid)
  }

}
</script>

<style>
.b-tabs .tab-content {
  overflow: visible
}
</style>
