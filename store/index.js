import Vuex from 'vuex'

import state from './state'

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
    state
  })
}

// createStore().dispatch('browserInit')
localStorage.setItem('state', JSON.stringify(createStore().state))

export default createStore
