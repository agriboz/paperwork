import Vue from 'vue'
import moment from 'moment'

const { $toast } = Vue.prototype
var dateRegExMs = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.{1}\d{1,7}-\d{2}:\d{2}$/
var dateRegEx = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/
var dateRegExShort = /^(\d{4})-(\d{2})-(\d{2})$/

function tryMatchDate(dateString) {
  if (dateString.length == 19) {
    return dateString.match(dateRegEx)
  }
  if (dateString.length == 10) {
    return dateString.match(dateRegExShort)
  }
  if (dateString.length > 26 && dateString.length < 34) {
    return dateString.match(dateRegExMs)
  }
  return false
}

function convertDateStringsToDates(input) {
  // Ignore things that aren't objects.
  if (typeof input !== 'object') return input

  for (var key in input) {
    if (!input.hasOwnProperty(key)) continue

    var value = input[key]
    var match

    // Check for string properties which look like dates.
    if (typeof value === 'string' && (match = tryMatchDate(value))) {
      var date = new Date(
        match[1],
        match[2] - 1,
        match[3],
        match[4] || 0,
        match[5] || 0,
        match[6] || 0
      )
      input[key] = date
    } else if (typeof value === 'object') {
      // Recurse into object
      convertDateStringsToDates(value)
    }
  }
  return null
}

export default function({ $axios, store }) {
  $axios.onResponse(
    response => {
      if (response.status === 200 && response.config.method !== 'get') {
        $toast.open({
          type: 'is-success',
          message: 'İşlem Başarılı'
        })
      }

      store.state.ui.tableOpts.isLoading = false
      store.state.ui.loading = false

      convertDateStringsToDates(response)
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )

  $axios.onError(error => {
    store.state.ui.loading = false
    const code = parseInt(error.response && error.response.status)
    if (code === 500) {
      $toast.open({
        type: 'is-danger',
        message: 'Sistemsel bir hatal yaşandı. Yazılım ekibi ile görüşünüz'
      })
    }
  })

  $axios.onRequest(
    config => {
      store.state.ui.loading = true
      if (
        (config.method === 'post' && config.data.enrollment) ||
        (config.method === 'put' && config.data.enrollment)
      ) {
        for (let key of Object.keys(config.data.enrollment)) {
          const value = config.data.enrollment[key]
          if (value instanceof Date) {
            config.data.enrollment[key] = new Date(
              moment(value)
                .add(1, 'd')
                .format('L')
            )
          }
        }
      }
      if (
        (config.method === 'post' && config.data) ||
        (config.method === 'put' && config.data)
      ) {
        for (let key of Object.keys(config.data)) {
          const value = config.data[key]
          if (value instanceof Date) {
            config.data[key] = new Date(
              moment(value)
              .add(1, 'd')
              .format('L')
            )
          }
        }
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
}
