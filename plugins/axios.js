import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const {
  $toast
} = Vue.prototype

export default function ({
  app: {
    $axios,
    store
  }
}) {
  $axios.interceptors.response.use(
    response => {
      var dateRegExMs = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.{1}\d{1,7}-\d{2}:\d{2}$/;
      var dateRegEx = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})$/;
      var dateRegExShort = /^(\d{4})-(\d{2})-(\d{2})$/;

      function tryMatchDate(dateString) {
        if (dateString.length == 19) {
          return dateString.match(dateRegEx);
        }
        if (dateString.length == 10) {
          return dateString.match(dateRegExShort);
        }
        if (dateString.length > 26 && dateString.length < 34) {
          return dateString.match(dateRegExMs);
        }
        return false;
      };


      function convertDateStringsToDates(input) {
        // Ignore things that aren't objects.
        if (typeof input !== "object")
          return input;

        for (var key in input) {
          if (!input.hasOwnProperty(key))
            continue;

          var value = input[key];
          var match;

          // Check for string properties which look like dates.
          if (typeof value === "string" && (match = tryMatchDate(value))) {
            var date = new Date(match[1], match[2] - 1, match[3], match[4] || 0, match[5] || 0, match[6] || 0);
            input[key] = date;
          } else if (typeof value === "object") {
            // Recurse into object
            convertDateStringsToDates(value);
          }
        }
        return null;
      }

      if (response.status === 200 && response.config.method !== 'get') {
        $toast.open({
          type: 'is-success',
          message: 'İşlem Başarılı'
        })
      }

      store.state.ui.tableOpts.isLoading = false
      convertDateStringsToDates(response)

      return response
    },
    error => {

      if (error.response.status === 401) {
        $toast.open({
          type: 'is-danger',
          message: error.response.data.message
        })
      } else if (error.response.status === 404) {
        $toast.open({
          type: 'is-info',
          message: 'Sonuç Bulunamadı'
        })
      } else if (error.response.status === 500) {
        $toast.open({
          type: 'is-danger',
          message: error.response.data.error
        })
      }
      return Promise.reject(error)
    }
  )

  $axios.interceptors.request.use(
    config => {
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
}

