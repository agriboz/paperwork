<template>
  <div class="columns">
    <div class="column">

      <b-field label="İşe Alım Uzmanı">
        <b-select placeholder="Seçiniz..." @input="setItem" v-model="item.enrollment.recruitmentEmployee" expanded>
          <option :key="r.id" :value="r" v-for="r in shared.reqruitmentEmployees">
            {{r.name}}
          </option>
        </b-select>
      </b-field>

      <b-field label="İşe Başlangıç Tarihi">
        <b-datepicker
          @input="setItem"
          v-model="item.enrollment.startWorkDate"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <div class="field">
        <b-switch v-model="item.enrollment.isSurveySent" @input="setItem">
          Anket Gönderildi
        </b-switch>
      </div>
      <b-field label="Anket Gönderilen Yönetici" v-if="!search">
        <b-select placeholder="Seçiniz..." @blur="setItem" v-model="item.channel" expanded>
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
      <b-field label="Kit Tipi" v-if="!search">
        <b-select placeholder="Seçiniz..." v-model="item.enrollment.welcomeKitType" @input="setItem" expanded>
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
      <b-field label="Kıdem Başlangıç Tarihi">
        <b-datepicker
          @blur="setItem"
          v-model="item.enrollment.seniorityStartDate"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Çıkış Tarihi">
        <b-datepicker
          @blur="setItem"
          v-model="item.enrollment.leaveDate"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field label="Haklarıyla Devir Tarihi">
        <b-datepicker
          @blur="setItem"
          v-model="item.enrollment.transferDate"
          placeholder="Seçiniz..."
          icon="calendar-today">
        </b-datepicker>
      </b-field>
      <b-field grouped>
        <b-field label="İzin Yükü" expanded>

          <b-field>
            <b-input placeholder="İzin Yükü"
                     @blur="setItem"
                     v-model="item.enrollment.leaveDayCostStart"
                     type="number"
                     min="1"
                     max="20">
            </b-input>
            <b-input placeholder="İzin Yükü"
                     @blur="setItem"
                     v-model="item.enrollment.LeaveDayCostEnd"
                     type="number"
                     min="1"
                     max="20">
            </b-input>
          </b-field>
        </b-field>
      </b-field>
      <b-field label="Diğer Notlar" v-if="!search">
        <b-input type="textarea"
                 @blur="setItem"
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
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  props: ['search', 'item', 'edit'],

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
      this.edit
       ? this.$store.commit('widgetForm/editItem', this.item)
        : this.$store.commit('widgetForm/item', this.item)
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
