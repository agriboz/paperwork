const documentDetail = {
  namespaced: true,
  state: {
    documentsList: [],
    maximoHistory: [],
    mandatoryDocuments: true
  },
  mutations: {
    setMandatoryDocuments(state, payload) {
      state.mandatoryDocuments = payload
    },
    setDocumentsList(state, payload) {
      state.documentsList = payload
      // todo: fix this state 1 = new document
      state.documentsList[0].documentState = 1
    },
    setMaximo(state, payload) {
      console.log(payload)
      state.maximoHistory = payload
    }
  },
  getters: {},
  actions: {
    async changeDocumentStatus(payload) {
      await this.$axios.put(`document/employee/detail/${payload.id}`, {
        documentStatus: payload.documentStatus
      })
    },

    async getMandatoryDocuments({ commit }, id) {
      const response = await this.$axios.get(
        `document/employee/detail/${id}/mandatoryDocumentsReceived`
      )
      return response.status === 200
        ? commit('setMandatoryDocuments', response.data)
        : []
    },

    async getDocumentsList({ commit }, payload) {
      const { data } = await this.$axios.post(
        `document/employee/detail/search`,
        payload
      )
      return data ? commit('setDocumentsList', data) : []
    },

    async getMaximo({ commit }, id) {
      const { data } = await this.$axios.get(
        `document/employee/maximo/${id}/history`
      )
      return data ? commit('setMaximo', data) : []
    }
  }
}

export default documentDetail
