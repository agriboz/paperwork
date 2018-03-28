import Vuex from 'vuex'
import axios from 'axios'

import ui from './ui'
import shared from './shared'
import search from './search'
import widgetForm from './widgetForm'
import documentDetail from './documentDetail'
import documentHistory from './documentHistory'
import tasks from './tasks'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      ui,
      shared,
      widgetForm,
      search,
      documentDetail,
      documentHistory,
      tasks
    },
    state: {
      isAuthenticated: false,
      employee: {}
    },
    mutations: {
      setAuthtenticate(state, payload) {
        state.isAuthenticated = payload
      },
      setEmployee(state, payload) {
        state.employee = payload
      }
    },
    actions: {
      async appInit({ commit }) {
        try {
          const { status, data } = await axios.get(
            `${process.env.baseURL}/employee`,
            {
              withCredentials: true
            }
          )
          return status === 200
            ? (commit('setAuthtenticate', true), commit('setEmployee', data))
            : null
        } catch (err) {
          console.log(err.response.status)
          err.response.status === 500 ? this.$router.push('/error') : null
        }
      }
    }
  })
}

// createStore().dispatch('appInit')

localStorage.setItem('state', JSON.stringify(createStore().state))

export default createStore
