const documentDetail = {
  namespaced: true,
  state: {
    documentsList: [],
    mandatoryDocuments: true
  },
  mutations: {
    setMandatoryDocuments (state, payload) {
      state.mandatoryDocuments = payload
    },
    setDocumentsList (state, payload) {
      state.documentsList = payload
    }

  },
  getters: {

  },
  actions: {
    async changeDocumentStatus ({ commit }, payload) {
      await this.$axios.put(`document/employee/detail/${payload.id}`, { documentStatus: payload.documentStatus })
    },

    async getMandatoryDocuments ({ commit }, id) {

      const response = await this.$axios.get(`document/employee/detail/${id}/mandatoryDocumentsReceived`)
      console.log(response.data)
      return response.status === 200 ? commit('setMandatoryDocuments', response.data) : null


    },

    async getDocumentsList ({ commit }, payload) {
      const { data } = await this.$axios.post(`document/employee/detail/search`, payload)
      return data ? commit('setDocumentsList', data) : null
    }

  }
}

export default documentDetail
