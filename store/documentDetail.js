const documentDetail = {
  namespaced: true,
  state: {
    data: []
  },
  mutations: {
    setDocumentDetails (state, payload) {
      state.data = payload
    }
  },
  getters: {

  },
  actions: {
    async getDocumentDetails ({ commit, rootState }, payload) {
      const organization = rootState.widgetForm.item.organization
      const category = rootState.widgetForm.item.category
      const { data } = await this.$axios.post(`organization/documents/all`, {organization, category})

      return data ? commit('setDocumentDetails', data) : null
    },
  }
}

export default documentDetail
