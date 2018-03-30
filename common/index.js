import Vue from 'vue'
import { withParams } from 'vuelidate'

const $toast = Vue.prototype.$toast

export const checkEmptyDropDown = withParams(
  {
    type: 'required'
  },
  value => (value.id === null ? false : true)
)

export const formValidation = ctx => {
  const firstTab = 'Personel Bilgileri'
  const secondTab = 'Personel Detay Bilgileri'
  const thirdTab = 'Organizasyon Bilgileri'
  if (ctx.isFirstTabInValid) {
    $toast.open({
      duration: 3500,
      type: 'is-warning',
      message: `<strong>🚀 ${firstTab}</strong> sayfasında doldurmanız gereken alanlar var`
    })
  }
  if (ctx.isSecondTabInValid) {
    $toast.open({
      duration: 3500,
      type: 'is-warning',
      message: `<strong>🚀 ${secondTab}</strong> sayfasında doldurmanız gereken alanlar var`
    })
  }
  if (ctx.isThirdTabInValid) {
    $toast.open({
      duration: 3500,
      type: 'is-warning',
      message: `<strong>🚀 ${thirdTab}</strong> sayfasında doldurmanız gereken alanlar var`
    })
  }
}
